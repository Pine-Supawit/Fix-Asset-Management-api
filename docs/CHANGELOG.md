# Changelog

All notable changes to the Assets Management API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive project documentation
- API documentation with examples
- Deployment guide with multiple deployment options
- Project structure improvements

## [1.0.0] - 2025-01-XX

### Added
- Initial release of Assets Management API
- User authentication system with JWT
- Asset management functionality
- Purchase order management (domestic and overseas)
- Purchase request workflow
- Supplier management system
- Invoice processing capabilities
- Asset checking and verification system
- Activity logging system
- RESTful API endpoints
- Swagger/OpenAPI documentation
- Multi-database support (SQL Server)
- Docker containerization support
- PM2 process management configuration

### Features
- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password reset functionality
  - Refresh token support

- **Asset Management**
  - Asset tracking and monitoring
  - Asset checklist management
  - Asset status management

- **Purchase Management**
  - Purchase order creation and management
  - Purchase request workflow
  - Domestic and overseas purchase operations
  - Supplier management

- **System Features**
  - Activity logging
  - Multi-database connections
  - Data validation
  - Error handling
  - API documentation

### Technical Stack
- NestJS framework
- TypeScript
- TypeORM
- SQL Server
- JWT authentication
- Swagger documentation
- Docker support
- PM2 process management

### Database Schema
- User management tables
- Asset tracking tables
- Purchase order tables
- Supplier information tables
- System logging tables

### API Endpoints
- User management endpoints
- Asset management endpoints
- Purchase order endpoints
- Supplier management endpoints
- System operation endpoints

---

## Version History

### Version Numbering
- **Major versions** (1.0.0): Breaking changes or major feature additions
- **Minor versions** (1.1.0): New features without breaking changes
- **Patch versions** (1.0.1): Bug fixes and small improvements

### Upcoming Features
- [ ] Advanced reporting capabilities
- [ ] Email notification system
- [ ] File upload functionality
- [ ] Advanced search and filtering
- [ ] Dashboard analytics
- [ ] Mobile API optimizations
- [ ] Caching implementation
- [ ] Rate limiting
- [ ] API versioning
- [ ] Webhook support 