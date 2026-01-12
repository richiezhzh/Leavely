# Leavely 部署指南

本文档介绍如何将 Leavely 应用部署到公司内部服务器。

## 目录

- [环境要求](#环境要求)
- [方式一：直接部署（推荐）](#方式一直接部署推荐)
- [方式二：Docker 部署](#方式二docker-部署)
- [Nginx 反向代理配置](#nginx-反向代理配置)
- [数据持久化](#数据持久化)
- [常见问题](#常见问题)

---

## 环境要求

| 软件 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | >= 18.17.0 | 推荐使用 LTS 版本 (20.x) |
| npm | >= 8.0.0 | 随 Node.js 安装 |
| PM2 | 最新版 | 进程管理器（可选） |
| Nginx | 最新版 | 反向代理（可选） |
| Docker | >= 20.0 | Docker 部署方式需要 |

---

## 方式一：直接部署（推荐）

### 1. 准备服务器

```bash
# 检查 Node.js 版本
node -v  # 需要 >= 18.17.0

# 如果版本不够，使用 nvm 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### 2. 上传代码

```bash
# 方式1：使用 Git 克隆
git clone <your-repo-url> /opt/leavely
cd /opt/leavely

# 方式2：使用 scp 上传
scp -r ./LeaveCalendar user@server:/opt/leavely
```

### 3. 安装依赖

```bash
cd /opt/leavely
npm install --production=false
```

### 4. 构建生产版本

```bash
npm run build
```

### 5. 启动应用

#### 方式 A：使用 PM2（推荐生产环境）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "leavely" -- start

# 设置开机自启
pm2 startup
pm2 save

# 常用命令
pm2 status          # 查看状态
pm2 logs leavely    # 查看日志
pm2 restart leavely # 重启应用
pm2 stop leavely    # 停止应用
```

#### 方式 B：使用 systemd 服务

创建服务文件 `/etc/systemd/system/leavely.service`：

```ini
[Unit]
Description=Leavely - Team Leave Management
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/leavely
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable leavely
sudo systemctl start leavely
sudo systemctl status leavely
```

### 6. 验证部署

```bash
curl http://localhost:3000
```

---

## 方式二：Docker 部署

### 1. 创建 Dockerfile

在项目根目录创建 `Dockerfile`：

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 创建数据目录
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
```

### 2. 更新 next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### 3. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  leavely:
    build: .
    container_name: leavely
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - leavely-data:/app/data
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  leavely-data:
```

### 4. 构建和运行

```bash
# 构建镜像
docker-compose build

# 启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

---

## Nginx 反向代理配置

### 1. 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### 2. 配置虚拟主机

创建配置文件 `/etc/nginx/sites-available/leavely`：

```nginx
upstream leavely_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name leavely.yourcompany.com;  # 替换为你的域名

    # 日志
    access_log /var/log/nginx/leavely.access.log;
    error_log /var/log/nginx/leavely.error.log;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://leavely_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # 静态资源缓存
    location /_next/static {
        proxy_pass http://leavely_upstream;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 健康检查
    location /api/health {
        proxy_pass http://leavely_upstream;
        access_log off;
    }
}
```

### 3. 启用配置

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/leavely /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 4. HTTPS 配置（可选但推荐）

使用 Let's Encrypt 或公司内部 CA 证书：

```nginx
server {
    listen 443 ssl http2;
    server_name leavely.yourcompany.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # ... 其他配置同上
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name leavely.yourcompany.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 数据持久化

### SQLite 数据库位置

数据库文件存储在 `data/leavely.db`：

```
/opt/leavely/
├── data/
│   └── leavely.db      # SQLite 数据库文件
│   └── leavely.db-wal  # WAL 日志文件
│   └── leavely.db-shm  # 共享内存文件
```

### 备份策略

创建备份脚本 `/opt/leavely/backup.sh`：

```bash
#!/bin/bash

BACKUP_DIR="/opt/backups/leavely"
DATE=$(date +%Y%m%d_%H%M%S)
DB_PATH="/opt/leavely/data/leavely.db"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 使用 SQLite 备份命令（保证数据一致性）
sqlite3 $DB_PATH ".backup '$BACKUP_DIR/leavely_$DATE.db'"

# 压缩备份
gzip $BACKUP_DIR/leavely_$DATE.db

# 删除 7 天前的备份
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: leavely_$DATE.db.gz"
```

设置定时备份：

```bash
chmod +x /opt/leavely/backup.sh

# 添加 crontab（每天凌晨 2 点备份）
crontab -e
# 添加：0 2 * * * /opt/leavely/backup.sh >> /var/log/leavely-backup.log 2>&1
```

### 数据恢复

```bash
# 停止应用
pm2 stop leavely

# 恢复数据库
gunzip -c /opt/backups/leavely/leavely_20250112.db.gz > /opt/leavely/data/leavely.db

# 重启应用
pm2 start leavely
```

---

## 环境变量配置

创建 `.env.local` 文件（可选）：

```bash
# 服务端口
PORT=3000

# Node 环境
NODE_ENV=production
```

---

## 监控和日志

### PM2 监控

```bash
# 实时监控
pm2 monit

# 查看日志
pm2 logs leavely --lines 100

# 查看详细信息
pm2 show leavely
```

### 日志轮转

创建 PM2 日志轮转配置：

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 常见问题

### Q1: 端口被占用

```bash
# 查看端口占用
lsof -i :3000

# 修改端口
PORT=3001 npm start
```

### Q2: 权限问题

```bash
# 修复目录权限
sudo chown -R $USER:$USER /opt/leavely
chmod -R 755 /opt/leavely
chmod -R 777 /opt/leavely/data  # 数据目录需要写权限
```

### Q3: Node.js 版本问题

```bash
# 使用 nvm 切换版本
nvm install 20
nvm use 20
nvm alias default 20
```

### Q4: 内存不足

```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Q5: 数据库锁定

```bash
# 删除 WAL 文件（确保应用已停止）
rm /opt/leavely/data/leavely.db-wal
rm /opt/leavely/data/leavely.db-shm
```

---

## 更新部署

### 更新步骤

```bash
cd /opt/leavely

# 1. 备份数据
./backup.sh

# 2. 拉取最新代码
git pull origin main

# 3. 安装依赖
npm install

# 4. 重新构建
npm run build

# 5. 重启应用
pm2 restart leavely
```

### 回滚

```bash
# 回滚到上一个版本
git checkout HEAD^

# 重新构建和重启
npm run build
pm2 restart leavely
```

---

## 安全建议

1. **防火墙配置**：只开放必要端口（80/443）
2. **定期更新**：保持 Node.js 和依赖包更新
3. **访问控制**：考虑添加 IP 白名单或内网 VPN 访问
4. **数据备份**：定期备份数据库文件
5. **日志审计**：保留访问日志用于审计

---

## 技术支持

如有问题，请联系：
- 📧 邮箱：admin@yourcompany.com
- 💬 内部 IM：@devops-team

