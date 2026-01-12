import Database from 'better-sqlite3';
import path from 'path';

// 数据库文件存储在项目根目录的 data 文件夹中
const dbPath = path.join(process.cwd(), 'data', 'leavely.db');

// 确保数据库目录存在
import fs from 'fs';
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 创建数据库连接
const db = new Database(dbPath);

// 启用 WAL 模式提升性能
db.pragma('journal_mode = WAL');

// 创建休假表
db.exec(`
  CREATE TABLE IF NOT EXISTS leaves (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    reason TEXT,
    created_at TEXT NOT NULL
  )
`);

// 创建索引以优化查询
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_leaves_name ON leaves(name);
  CREATE INDEX IF NOT EXISTS idx_leaves_dates ON leaves(start_date, end_date);
`);

export default db;

// 类型定义
export interface LeaveRecord {
  id: string;
  name: string;
  contact: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  created_at: string;
}

// 数据库操作函数
export const leaveDb = {
  // 获取所有休假记录
  getAll: (): LeaveRecord[] => {
    const stmt = db.prepare('SELECT * FROM leaves ORDER BY created_at DESC');
    return stmt.all() as LeaveRecord[];
  },

  // 根据ID获取休假记录
  getById: (id: string): LeaveRecord | undefined => {
    const stmt = db.prepare('SELECT * FROM leaves WHERE id = ?');
    return stmt.get(id) as LeaveRecord | undefined;
  },

  // 创建休假记录
  create: (leave: Omit<LeaveRecord, 'id' | 'created_at'>): LeaveRecord => {
    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO leaves (id, name, contact, start_date, end_date, reason, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, leave.name, leave.contact, leave.start_date, leave.end_date, leave.reason || null, created_at);
    
    return {
      id,
      ...leave,
      reason: leave.reason || null,
      created_at,
    };
  },

  // 更新休假记录
  update: (id: string, leave: Partial<Omit<LeaveRecord, 'id' | 'created_at'>>): boolean => {
    const existing = leaveDb.getById(id);
    if (!existing) return false;

    const updated = { ...existing, ...leave };
    const stmt = db.prepare(`
      UPDATE leaves 
      SET name = ?, contact = ?, start_date = ?, end_date = ?, reason = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      updated.name,
      updated.contact,
      updated.start_date,
      updated.end_date,
      updated.reason,
      id
    );
    
    return result.changes > 0;
  },

  // 删除休假记录
  delete: (id: string): boolean => {
    const stmt = db.prepare('DELETE FROM leaves WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },

  // 根据日期范围查询休假记录
  getByDateRange: (startDate: string, endDate: string): LeaveRecord[] => {
    const stmt = db.prepare(`
      SELECT * FROM leaves 
      WHERE start_date <= ? AND end_date >= ?
      ORDER BY start_date
    `);
    return stmt.all(endDate, startDate) as LeaveRecord[];
  },

  // 根据成员名称查询
  getByMember: (name: string): LeaveRecord[] => {
    const stmt = db.prepare('SELECT * FROM leaves WHERE LOWER(name) = LOWER(?) ORDER BY created_at DESC');
    return stmt.all(name) as LeaveRecord[];
  },
};

