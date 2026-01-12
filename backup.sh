#!/bin/bash

# Leavely 数据库备份脚本
# 用法: ./backup.sh

set -e

BACKUP_DIR="${BACKUP_DIR:-/opt/backups/leavely}"
DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="${DB_PATH:-./data/leavely.db}"

# 检查数据库文件是否存在
if [ ! -f "$DB_PATH" ]; then
    echo "Error: Database file not found at $DB_PATH"
    exit 1
fi

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 检查是否安装了 sqlite3
if command -v sqlite3 &> /dev/null; then
    # 使用 SQLite 备份命令（保证数据一致性）
    sqlite3 "$DB_PATH" ".backup '$BACKUP_DIR/leavely_$DATE.db'"
else
    # 直接复制文件
    cp "$DB_PATH" "$BACKUP_DIR/leavely_$DATE.db"
fi

# 压缩备份
gzip "$BACKUP_DIR/leavely_$DATE.db"

# 删除 7 天前的备份
find "$BACKUP_DIR" -name "leavely_*.db.gz" -mtime +7 -delete 2>/dev/null || true

echo "✅ Backup completed: $BACKUP_DIR/leavely_$DATE.db.gz"

# 显示备份文件大小
ls -lh "$BACKUP_DIR/leavely_$DATE.db.gz"

