<<<<<<< HEAD
## Project setup

```bash
$ npm install
```

## create .env file
```
JWT_SECRET=access-secret
JWT_REFRESH_SECRET=refresh-secret
DATABASE_HOST=203.146.94.243
DATABASE_NAME_1=Ent_db
DATABASE_NAME_2=Endeavour
DATABASE_NAME_3=off_pp
DATABASE_USER=samyan
DATABASE_PASSWORD=Drowssap1
DATABASE_PORT=1433
```

## Compile and run the project

```bash
# development mode (use this one if you are testing)
$ npm run start:dev

# production mode
$ npm run start:prod 
```
<!-- 
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->
=======
# Assets Management API

> NestJS-based API for managing assets, purchase orders, suppliers, and related business operations.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)

## 🔍 Overview

This is a comprehensive Assets Management API built with NestJS and TypeScript. The system manages various business operations including:

- **Asset Management**: Track and manage company assets
- **Purchase Orders**: Handle purchase order workflows (domestic and overseas)
- **Purchase Requests**: Manage purchase request processes
- **Supplier Management**: Maintain supplier information
- **Invoice Processing**: Handle invoice operations
- **User Authentication**: JWT-based authentication system
- **Asset Checking**: Asset verification and checklist management
- **Activity Logging**: System activity tracking

## 📁 Project Structure

```
assets-management-api/
├── src/
│   ├── assets/                     # Asset management module
│   ├── asset_check/               # Asset checking and verification
│   ├── common/                    # Shared utilities and interfaces
│   │   ├── interfaces/           # TypeScript interfaces
│   │   └── utils/                # Common utilities (guards, etc.)
│   ├── invoice/                   # Invoice management module
│   ├── log/                       # Activity logging module
│   ├── products/                  # Product management module
│   ├── purchase_order/            # Purchase order management
│   ├── purchase_request/          # Purchase request management
│   ├── purchase-order-detail/     # Purchase order details
│   ├── purchase-request-detail/   # Purchase request details
│   ├── purchase-order-oversea/    # Overseas purchase orders
│   ├── purchase-order-detail-oversea/ # Overseas purchase order details
│   ├── supplier/                  # Supplier management
│   ├── supplier-oversea/          # Overseas supplier management
│   ├── user/                      # User management and authentication
│   ├── utils/                     # Utility functions and validation
│   ├── interfaces/                # Global TypeScript interfaces
│   ├── app.module.ts             # Main application module
│   ├── app.controller.ts         # Root controller
│   └── main.ts                   # Application entry point
├── test/                          # End-to-end tests
├── adhoc/                         # Development scripts
├── .env                          # Environment variables (create this)
├── docker-compose.yml            # Docker composition
├── ecosystem.json                # PM2 configuration
├── package.json                  # Node.js dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🛠 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **SQL Server**: Database server
- **TypeScript**: v5.0.0 or higher

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assets-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp env.example .env
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# JWT Configuration
JWT_SECRET=your-access-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key

# Database Configuration
DATABASE_HOST=your-database-host
DATABASE_NAME_1=Ent_db
DATABASE_NAME_2=Endeavour
DATABASE_NAME_3=off_pp
DATABASE_USER=your-database-username
DATABASE_PASSWORD=your-database-password
DATABASE_PORT=1433

# Application Configuration
PORT=3000
NODE_ENV=development
```

### Database Connections

The application connects to multiple SQL Server databases:
- **Ent_db**: Supplier data
- **Endeavour**: Purchase orders (overseas)
- **off_pp**: Main operations (users, assets, purchase requests, etc.)

## 🎯 Usage

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Using Docker
```bash
docker-compose up -d
```

### Using PM2
```bash
pm2 start ecosystem.json
```

## 📚 API Documentation

Once the application is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api
```

### Available Endpoints

#### 🔐 Authentication
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `POST /users/refresh` - Refresh access token

#### 👥 User Management
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PATCH /users/forget-password` - Reset password
- `DELETE /users` - Delete user

#### 🏢 Assets Management
- `GET /assets` - Get all assets
- `GET /assets-checklist` - Get asset checklists

#### 📋 Purchase Orders
- `GET /purchase-order` - Get purchase orders
- `GET /purchase-order/products-name` - Get product names
- `GET /purchase-order/category` - Get order categories
- `DELETE /purchase-order` - Delete purchase order

#### 📋 Purchase Requests
- `GET /purchase-request` - Get purchase requests
- `GET /purchase-request-detail` - Get request details

#### 🏭 Supplier Management
- `GET /off-supplier` - Get office suppliers
- `GET /off-supplier/supplier-name` - Get supplier names
- `GET /supplier-oversea/list` - Get overseas suppliers

#### 🌏 Overseas Operations
- `GET /purchase-order-oversea/list` - Get overseas purchase orders
- `GET /purchase-order-oversea/type` - Get orders by type

#### 📊 System Operations
- `GET /log` - Get system logs
- `POST /log` - Create log entry

## 🗄️ Database Schema

The application uses TypeORM with multiple database connections:

### Main Entities
- **User**: User authentication and profile
- **Asset**: Company assets tracking
- **AssetChecklist**: Asset verification records
- **PurchaseOrder**: Purchase order management
- **PurchaseRequest**: Purchase request workflow
- **Supplier**: Supplier information
- **Invoice**: Invoice processing
- **Log**: System activity logging

## 📜 Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start with debugging

# Production
npm run build             # Build the application
npm run start:prod        # Start in production mode

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## 🚀 Deployment

### Using PM2
```bash
npm run build
pm2 start ecosystem.json
```

### Using Docker
```bash
docker-compose up -d --build
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 🔧 Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQL Server
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Process Manager**: PM2
- **Code Quality**: ESLint + Prettier

## 📚 Documentation

### Complete Documentation Set

- **[API Guide](docs/API_GUIDE.md)** - Comprehensive API documentation with examples
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Development Guide](docs/DEVELOPMENT.md)** - Developer setup and workflow
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Detailed project organization
- **[Changelog](docs/CHANGELOG.md)** - Version history and changes

### Quick Links

- **Swagger UI**: `http://localhost:3000/api` (when running)
- **Health Check**: `http://localhost:3000/` 
- **API Base URL**: `http://localhost:3000`

## 📞 Support

For support and questions:
- 📖 Check the [documentation](docs/) first
- 🐛 Report bugs via GitHub issues
- 💬 Contact the development team
- 📧 Email: [support@company.com]

---

*Built with ❤️ using NestJS*
>>>>>>> 9508433732339c0beb36f2acfb69f5cc9d9e409d
