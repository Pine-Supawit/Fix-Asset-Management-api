# Development Guide - Assets Management API

## 🚀 Getting Started

This guide covers everything you need to know for developing the Assets Management API.

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher  
- **SQL Server**: For database connections
- **Git**: For version control
- **Visual Studio Code**: Recommended IDE

## 🛠 Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assets-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file:
```env
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=dev-secret-key
JWT_REFRESH_SECRET=dev-refresh-secret

# Database Configuration
DATABASE_HOST=your-dev-database-host
DATABASE_NAME_1=Ent_db
DATABASE_NAME_2=Endeavour
DATABASE_NAME_3=off_pp
DATABASE_USER=your-dev-username
DATABASE_PASSWORD=your-dev-password
DATABASE_PORT=1433
```

### 4. Start Development Server
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 🏗️ Project Architecture

### Module Structure
```
src/
├── modules/                 # Business logic modules
│   ├── assets/             # Asset management
│   ├── users/              # User management
│   ├── purchase-orders/    # Purchase order logic
│   └── suppliers/          # Supplier management
├── common/                 # Shared utilities
│   ├── decorators/         # Custom decorators
│   ├── filters/            # Exception filters
│   ├── guards/             # Authentication guards
│   ├── interceptors/       # Request/response interceptors
│   └── pipes/              # Validation pipes
├── config/                 # Configuration files
├── database/              # Database entities and migrations
└── utils/                 # Utility functions
```

### Design Patterns Used
- **Module Pattern**: NestJS modules for feature organization
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer objects for validation
- **Guard Pattern**: Authentication and authorization
- **Interceptor Pattern**: Cross-cutting concerns

## 🗄️ Database Development

### Entity Relationships
- **User** → **Log** (One-to-Many)
- **Asset** → **AssetChecklist** (One-to-Many)
- **PurchaseOrder** → **PurchaseOrderDetail** (One-to-Many)
- **PurchaseRequest** → **PurchaseRequestDetail** (One-to-Many)
- **Supplier** → **PurchaseOrder** (One-to-Many)

### Adding New Entities
1. Create entity file in `src/[module]/entities/`
2. Add to module imports
3. Update app.module.ts
4. Create DTOs for validation
5. Implement service methods

Example:
```typescript
// entities/example.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('examples')
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
```

## 🧪 Testing Strategy

### Unit Tests
```bash
npm run test              # Run all unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run with coverage
```

### E2E Tests
```bash
npm run test:e2e          # Run end-to-end tests
```

### Test Structure
```
test/
├── unit/                 # Unit tests
├── integration/          # Integration tests
└── e2e/                  # End-to-end tests
```

### Writing Tests
```typescript
// Example unit test
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create user', () => {
    // Test implementation
  });
});
```

## 🔧 Code Quality

### ESLint Configuration
```bash
npm run lint              # Check linting issues
npm run lint:fix          # Fix auto-fixable issues
```

### Prettier Configuration
```bash
npm run format            # Format code
```

### Pre-commit Hooks
We use Husky for pre-commit hooks:
- Linting check
- Format check
- Test execution

## 📝 API Development

### Creating New Endpoints

1. **Create DTO classes**:
```typescript
// dto/create-example.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
```

2. **Implement service methods**:
```typescript
// example.service.ts
@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  async create(createDto: CreateExampleDto): Promise<Example> {
    const example = this.exampleRepository.create(createDto);
    return this.exampleRepository.save(example);
  }
}
```

3. **Create controller**:
```typescript
// example.controller.ts
@Controller('examples')
@ApiTags('Examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  @ApiOperation({ summary: 'Create example' })
  create(@Body() createDto: CreateExampleDto) {
    return this.exampleService.create(createDto);
  }
}
```

### API Documentation
- Use Swagger decorators
- Add operation summaries
- Document response types
- Include example payloads

## 🔐 Security Best Practices

### Authentication
- Use JWT tokens
- Implement refresh token rotation
- Add rate limiting
- Validate all inputs

### Data Validation
```typescript
// Use class-validator decorators
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

### Error Handling
```typescript
// Custom exception filters
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Handle exceptions
  }
}
```

## 🚀 Performance Optimization

### Database Optimization
- Use proper indexes
- Implement pagination
- Optimize queries
- Use connection pooling

### Caching Strategy
- Implement Redis caching
- Cache frequently accessed data
- Use cache invalidation

### Monitoring
- Log important events
- Monitor performance metrics
- Track error rates

## 🔄 Development Workflow

### Git Workflow
1. Create feature branch from `develop`
2. Make changes with descriptive commits
3. Write tests for new features
4. Update documentation
5. Create pull request
6. Code review process
7. Merge to `develop`

### Commit Message Format
```
type(scope): description

feat(auth): add JWT refresh token functionality
fix(users): resolve password validation issue
docs(api): update endpoint documentation
```

### Branch Naming
- `feature/feature-name`
- `bugfix/bug-description`
- `hotfix/critical-issue`
- `docs/documentation-update`

## 🧰 Development Tools

### Recommended VS Code Extensions
- **NestJS Files**: Generate NestJS files
- **TypeScript Hero**: TS development tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **GitLens**: Git visualization
- **REST Client**: API testing

### Useful npm Scripts
```bash
npm run start:dev         # Development server
npm run start:debug       # Debug mode
npm run build             # Build production
npm run test:watch        # Test watch mode
npm run lint:fix          # Fix linting issues
```

## 🐛 Debugging

### VS Code Debug Configuration
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug NestJS",
  "program": "${workspaceFolder}/src/main.ts",
  "outFiles": ["${workspaceFolder}/dist/**/*.js"],
  "runtimeArgs": ["-r", "ts-node/register"]
}
```

### Common Issues
1. **Database connection errors**: Check connection strings
2. **Port already in use**: Change PORT in .env
3. **TypeScript errors**: Run `npm run build` to check

## 📚 Learning Resources

### NestJS Documentation
- [Official Documentation](https://docs.nestjs.com/)
- [NestJS Fundamentals Course](https://courses.nestjs.com/)

### TypeScript Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Database & ORM
- [TypeORM Documentation](https://typeorm.io/)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)

## 🤝 Contributing Guidelines

1. **Code Style**: Follow existing patterns
2. **Testing**: Write tests for new features
3. **Documentation**: Update relevant docs
4. **Performance**: Consider performance impact
5. **Security**: Follow security best practices

## 📞 Support

For development support:
- Check existing documentation
- Review code examples
- Ask in team chat
- Create GitHub issues for bugs

---

*Happy coding! 🎉* 