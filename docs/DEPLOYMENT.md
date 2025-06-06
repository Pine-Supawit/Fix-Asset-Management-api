# Deployment Guide - Assets Management API

## 🚀 Deployment Options

This guide covers various deployment methods for the Assets Management API.

## 📋 Prerequisites

- Node.js v18+ installed
- SQL Server database accessible
- PM2 installed globally (for PM2 deployment)
- Docker installed (for Docker deployment)

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env` file with the following variables:

```env
# Application
NODE_ENV=production
PORT=3000

# JWT Configuration
JWT_SECRET=your-super-secure-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here

# Database Configuration
DATABASE_HOST=your-database-host
DATABASE_NAME_1=Ent_db
DATABASE_NAME_2=Endeavour
DATABASE_NAME_3=off_pp
DATABASE_USER=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_PORT=1433

# Optional
API_PREFIX=api
SWAGGER_ENABLED=true
```

### Security Considerations

1. **JWT Secrets**: Use strong, random strings for JWT secrets
2. **Database Credentials**: Store securely and use strong passwords
3. **Environment Variables**: Never commit `.env` files to version control
4. **SSL/TLS**: Always use HTTPS in production

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and run the application:**
   ```bash
   docker-compose up -d --build
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Docker Compose Configuration

The `docker-compose.yml` file includes:
- Application container
- Health checks
- Restart policies
- Port mapping

### Manual Docker Build

1. **Build the image:**
   ```bash
   docker build -t assets-management-api .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name assets-api \
     -p 3000:3000 \
     --env-file .env \
     assets-management-api
   ```

## 📦 PM2 Deployment

PM2 is a production process manager for Node.js applications.

### Setup PM2

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.json
   ```

### PM2 Configuration

The `ecosystem.json` file contains:
- Application settings
- Environment variables
- Clustering configuration
- Log settings

### PM2 Commands

```bash
# Start application
pm2 start ecosystem.json

# Stop application
pm2 stop assets-management-api

# Restart application
pm2 restart assets-management-api

# View logs
pm2 logs assets-management-api

# Monitor
pm2 monit

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

## 🖥️ Traditional Server Deployment

### Ubuntu/Debian Server

1. **Update system:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd assets-management-api
   npm install
   npm run build
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

5. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.json
   pm2 save
   pm2 startup
   ```

### Nginx Reverse Proxy

Create `/etc/nginx/sites-available/assets-api`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/assets-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt with Certbot

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
   ```

## ☁️ Cloud Deployment

### AWS EC2

1. **Launch EC2 instance** (Ubuntu 20.04 LTS recommended)
2. **Configure security groups** (Allow HTTP/HTTPS traffic)
3. **Connect via SSH** and follow traditional server deployment
4. **Setup Application Load Balancer** for high availability
5. **Configure Route 53** for domain management

### Google Cloud Platform

1. **Create Compute Engine instance**
2. **Configure firewall rules**
3. **Deploy using traditional server method**
4. **Setup Cloud Load Balancer**
5. **Configure Cloud DNS**

### Digital Ocean

1. **Create Droplet** (Ubuntu 20.04)
2. **Follow traditional deployment steps**
3. **Setup Load Balancer** (optional)
4. **Configure domain in DNS settings**

## 🗄️ Database Setup

### SQL Server Configuration

1. **Ensure SQL Server is accessible**
2. **Create required databases:**
   - `Ent_db`
   - `Endeavour` 
   - `off_pp`

3. **Grant permissions to application user**
4. **Configure network access**
5. **Setup backup strategy**

### Connection Testing

Test database connectivity:
```bash
# From application server
sqlcmd -S server-name -U username -P password -Q "SELECT @@VERSION"
```

## 📊 Monitoring & Logging

### Application Monitoring

1. **PM2 Monitoring:**
   ```bash
   pm2 monit
   ```

2. **Log Management:**
   ```bash
   pm2 install pm2-logrotate
   ```

### Health Checks

The application includes health check endpoints:
- `GET /health` - Basic health check
- `GET /` - Application status

### Log Files

- Application logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
- System logs: `/var/log/syslog`

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Database connection failed:**
   - Check network connectivity
   - Verify credentials
   - Ensure SQL Server allows remote connections

3. **PM2 application won't start:**
   ```bash
   pm2 logs assets-management-api
   pm2 describe assets-management-api
   ```

4. **Memory issues:**
   ```bash
   # Increase memory limit in ecosystem.json
   "node_args": ["--max-old-space-size=4096"]
   ```

### Performance Optimization

1. **Enable clustering in PM2:**
   ```json
   {
     "instances": "max",
     "exec_mode": "cluster"
   }
   ```

2. **Configure Nginx caching:**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.2
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /path/to/app
            git pull origin main
            npm ci
            npm run build
            pm2 restart assets-management-api
```

## 📋 Deployment Checklist

### Pre-deployment

- [ ] Environment variables configured
- [ ] Database connections tested
- [ ] Security configurations reviewed
- [ ] SSL certificates configured
- [ ] Backup strategy in place

### Post-deployment

- [ ] Application health check passes
- [ ] API endpoints responding correctly
- [ ] Database connectivity verified
- [ ] Logs are being generated
- [ ] Monitoring setup complete

### Maintenance

- [ ] Regular security updates
- [ ] Database maintenance scheduled
- [ ] Log rotation configured
- [ ] Backup verification routine
- [ ] Performance monitoring active

## 📞 Support

For deployment support:
- Check application logs first
- Review this deployment guide
- Contact the development team
- Submit issues to the repository

---

*Last updated: January 2024* 