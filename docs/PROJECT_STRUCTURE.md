# Project Structure - Assets Management API

## 📁 Complete Directory Structure

```
assets-management-api/
├── 📁 docs/                           # Documentation files
│   ├── 📄 API_GUIDE.md               # API documentation with examples
│   ├── 📄 CHANGELOG.md               # Version history and changes
│   ├── 📄 DEPLOYMENT.md              # Deployment instructions
│   ├── 📄 DEVELOPMENT.md             # Development guide
│   └── 📄 PROJECT_STRUCTURE.md       # This file
│
├── 📁 src/                            # Source code
│   ├── 📁 assets/                     # Asset management module
│   │   ├── 📁 dto/                   # Data Transfer Objects
│   │   ├── 📁 entities/              # TypeORM entities
│   │   ├── 📄 assets.controller.ts   # REST controller
│   │   ├── 📄 assets.service.ts      # Business logic
│   │   └── 📄 assets.module.ts       # NestJS module
│   │
│   ├── 📁 asset_check/               # Asset checking module
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 asset_check.controller.ts
│   │   ├── 📄 asset_check.service.ts
│   │   └── 📄 asset_check.module.ts
│   │
│   ├── 📁 common/                     # Shared utilities
│   │   ├── 📁 interfaces/            # TypeScript interfaces
│   │   └── 📁 utils/                 # Common utilities
│   │       ├── 📁 guard/             # Authentication guards
│   │       └── 📄 *.ts               # Utility functions
│   │
│   ├── 📁 invoice/                    # Invoice management
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 invoice.controller.ts
│   │   ├── 📄 invoice.service.ts
│   │   └── 📄 invoice.module.ts
│   │
│   ├── 📁 log/                        # Activity logging
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 log.controller.ts
│   │   ├── 📄 log.service.ts
│   │   └── 📄 log.module.ts
│   │
│   ├── 📁 products/                   # Product management
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 products.controller.ts
│   │   ├── 📄 products.service.ts
│   │   └── 📄 products.module.ts
│   │
│   ├── 📁 purchase_order/             # Purchase order management
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase_order.controller.ts
│   │   ├── 📄 purchase_order.service.ts
│   │   └── 📄 purchase_order.module.ts
│   │
│   ├── 📁 purchase_request/           # Purchase request workflow
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase_request.controller.ts
│   │   ├── 📄 purchase_request.service.ts
│   │   └── 📄 purchase_request.module.ts
│   │
│   ├── 📁 purchase-order-detail/      # Purchase order details
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase-order-detail.controller.ts
│   │   ├── 📄 purchase-order-detail.service.ts
│   │   └── 📄 purchase-order-detail.module.ts
│   │
│   ├── 📁 purchase-request-detail/    # Purchase request details
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase-request-detail.controller.ts
│   │   ├── 📄 purchase-request-detail.service.ts
│   │   └── 📄 purchase-request-detail.module.ts
│   │
│   ├── 📁 purchase-order-oversea/     # Overseas purchase orders
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase-order-oversea.controller.ts
│   │   ├── 📄 purchase-order-oversea.service.ts
│   │   └── 📄 purchase-order-oversea.module.ts
│   │
│   ├── 📁 purchase-order-detail-oversea/ # Overseas PO details
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 purchase-order-detail-oversea.controller.ts
│   │   ├── 📄 purchase-order-detail-oversea.service.ts
│   │   └── 📄 purchase-order-detail-oversea.module.ts
│   │
│   ├── 📁 supplier/                   # Supplier management
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 supplier.controller.ts
│   │   ├── 📄 supplier.service.ts
│   │   └── 📄 supplier.module.ts
│   │
│   ├── 📁 supplier-oversea/           # Overseas suppliers
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 supplier-oversea.controller.ts
│   │   ├── 📄 supplier-oversea.service.ts
│   │   └── 📄 supplier-oversea.module.ts
│   │
│   ├── 📁 user/                       # User management & auth
│   │   ├── 📁 dto/
│   │   ├── 📁 entities/
│   │   ├── 📄 user.controller.ts
│   │   ├── 📄 user.service.ts
│   │   └── 📄 user.module.ts
│   │
│   ├── 📁 utils/                      # Utility functions
│   │   ├── 📄 validation.ts          # Input validation
│   │   └── 📄 validation.spec.ts     # Validation tests
│   │
│   ├── 📁 interfaces/                 # Global TypeScript interfaces
│   │
│   ├── 📄 app.controller.ts           # Root controller
│   ├── 📄 app.controller.spec.ts      # Root controller tests
│   ├── 📄 app.module.ts               # Main application module
│   ├── 📄 app.service.ts              # Root service
│   └── 📄 main.ts                     # Application entry point
│
├── 📁 test/                           # End-to-end tests
│   ├── 📄 app.e2e-spec.ts           # E2E test suite
│   └── 📄 jest-e2e.json             # Jest E2E configuration
│
├── 📁 adhoc/                          # Development scripts
│   └── 📄 assets-management-dev.sh   # Development helper script
│
├── 📄 .dockerignore                   # Docker ignore patterns
├── 📄 .gitignore                      # Git ignore patterns
├── 📄 .prettierrc                     # Prettier configuration
├── 📄 docker-compose.yml              # Docker Compose configuration
├── 📄 Dockerfile                      # Docker image definition
├── 📄 ecosystem.json                  # PM2 configuration
├── 📄 env.example                     # Environment variables template
├── 📄 eslint.config.mjs               # ESLint configuration
├── 📄 healthcheck.js                  # Docker health check script
├── 📄 nest-cli.json                   # NestJS CLI configuration
├── 📄 package.json                    # Node.js dependencies
├── 📄 package-lock.json               # Locked dependency versions
├── 📄 README.md                       # Main project documentation
├── 📄 tsconfig.json                   # TypeScript configuration
└── 📄 tsconfig.build.json             # TypeScript build configuration
```

## 📋 Module Breakdown

### Core Business Modules

| Module | Purpose | Key Features |
|--------|---------|--------------|
| **assets** | Asset management | Asset tracking, status management |
| **asset_check** | Asset verification | Checklist management, verification |
| **user** | User management | Authentication, user CRUD |
| **purchase_order** | Purchase orders | Order management, workflow |
| **purchase_request** | Purchase requests | Request workflow, approvals |
| **supplier** | Supplier management | Supplier information, relationships |
| **invoice** | Invoice processing | Invoice management, tracking |
| **log** | Activity logging | System activity, audit trail |

### Supporting Modules

| Module | Purpose | Key Features |
|--------|---------|--------------|
| **products** | Product catalog | Product information management |
| **purchase-order-detail** | PO line items | Detailed order information |
| **purchase-request-detail** | PR line items | Detailed request information |
| **purchase-order-oversea** | International orders | Overseas purchase management |
| **supplier-oversea** | International suppliers | Overseas supplier management |

## 🏗️ Architecture Patterns

### Module Structure Pattern
Each business module follows this consistent structure:
```
module-name/
├── dto/                    # Data Transfer Objects
│   ├── create-*.dto.ts    # Creation DTOs
│   ├── update-*.dto.ts    # Update DTOs
│   └── find-*.dto.ts      # Query DTOs
├── entities/              # Database entities
│   └── *.entity.ts       # TypeORM entities
├── *.controller.ts        # REST API controller
├── *.service.ts           # Business logic service
├── *.module.ts            # NestJS module definition
└── *.spec.ts              # Unit tests
```

### Shared Resources
- **common/**: Shared utilities, guards, interfaces
- **utils/**: Validation functions, helpers
- **interfaces/**: Global TypeScript type definitions

## 🗄️ Database Architecture

### Multi-Database Setup
The application connects to three SQL Server databases:

1. **off_pp** (Main Database)
   - Users, Assets, Purchase Requests
   - Asset Checklists, Logs
   - Purchase Order Details

2. **Endeavour** (Secondary Database)
   - Overseas Purchase Orders
   - International operations

3. **Ent_db** (Enterprise Database)
   - Supplier information
   - Enterprise data

### Entity Relationships
```
User ──┐
       ├── Log (1:N)
       └── PurchaseRequest (1:N)

Asset ──── AssetChecklist (1:N)

PurchaseOrder ──── PurchaseOrderDetail (1:N)
PurchaseRequest ──── PurchaseRequestDetail (1:N)

Supplier ──── PurchaseOrder (1:N)
```

## 🔧 Configuration Files

### Development Configuration
- **tsconfig.json**: TypeScript compiler options
- **eslint.config.mjs**: Code linting rules
- **.prettierrc**: Code formatting rules
- **nest-cli.json**: NestJS CLI configuration

### Deployment Configuration
- **Dockerfile**: Container image definition
- **docker-compose.yml**: Multi-container setup
- **ecosystem.json**: PM2 process management
- **.dockerignore**: Docker build exclusions

### Environment Configuration
- **env.example**: Environment variables template
- **.env**: Local environment variables (not in repo)

## 📦 Build Artifacts

### Generated Directories (not in repo)
```
dist/                      # Compiled JavaScript output
node_modules/              # NPM dependencies
coverage/                  # Test coverage reports
.nyc_output/              # Coverage temp files
```

## 🧪 Testing Structure

### Test Organization
```
test/
├── e2e/                  # End-to-end tests
├── unit/                 # Unit tests (alongside source)
└── integration/          # Integration tests
```

### Test Files Pattern
- `*.spec.ts`: Unit tests
- `*.e2e-spec.ts`: End-to-end tests
- `*.integration.spec.ts`: Integration tests

## 📝 File Naming Conventions

### Controllers
- `*.controller.ts`: REST API controllers
- `*.controller.spec.ts`: Controller unit tests

### Services
- `*.service.ts`: Business logic services
- `*.service.spec.ts`: Service unit tests

### DTOs
- `create-*.dto.ts`: Data for creating resources
- `update-*.dto.ts`: Data for updating resources
- `find-*.dto.ts`: Query parameters for finding resources

### Entities
- `*.entity.ts`: TypeORM database entities

### Modules
- `*.module.ts`: NestJS module definitions

This structure promotes:
- **Modularity**: Clear separation of concerns
- **Scalability**: Easy to add new features
- **Maintainability**: Consistent patterns
- **Testability**: Clear testing structure 