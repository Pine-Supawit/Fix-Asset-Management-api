# API Guide - Assets Management API

## 🚀 Base URL
```
http://localhost:3000
```

## 📖 Interactive Documentation
Access the Swagger UI at: `http://localhost:3000/api`

## 🔐 Authentication

### JWT Token Authentication
Most endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Login
```http
POST /users/login
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com"
  }
}
```

### Refresh Token
```http
POST /users/refresh
Content-Type: application/json

{
  "refresh_token": "your_refresh_token"
}
```

## 👥 User Management

### Get All Users
```http
GET /users?page=1&limit=10&search=username
```

### Create User
```http
POST /users
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Reset Password
```http
PATCH /users/forget-password
Content-Type: application/json

{
  "username": "username",
  "newPassword": "newSecurePassword123"
}
```

## 🏢 Assets Management

### Get All Assets
```http
GET /assets?page=1&limit=10&assetCode=ASSET001&status=active
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `assetCode`: Filter by asset code
- `status`: Filter by status (active, inactive, disposed)
- `category`: Filter by asset category

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "assetCode": "ASSET001",
      "assetName": "Laptop Dell Inspiron",
      "category": "IT Equipment",
      "status": "active",
      "purchaseDate": "2023-01-15",
      "purchasePrice": 35000,
      "currentValue": 25000,
      "location": "IT Department"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 10
}
```

### Get Asset Checklists
```http
GET /assets-checklist?assetId=1&status=pending
```

## 📋 Purchase Orders

### Get Purchase Orders
```http
GET /purchase-order?page=1&limit=10&status=pending&startDate=2024-01-01&endDate=2024-12-31
```

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `status`: Order status (pending, approved, completed, cancelled)
- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter to date (YYYY-MM-DD)
- `supplierId`: Filter by supplier

### Get Product Names
```http
GET /purchase-order/products-name?search=laptop
```

### Get Order Categories
```http
GET /purchase-order/category
```

**Response:**
```json
{
  "categories": [
    "IT Equipment",
    "Office Supplies",
    "Furniture",
    "Maintenance",
    "Services"
  ]
}
```

### Delete Purchase Order
```http
DELETE /purchase-order?orderId=123
```

## 📋 Purchase Requests

### Get Purchase Requests
```http
GET /purchase-request?page=1&status=pending&departmentId=5
```

### Get Purchase Request Details
```http
GET /purchase-request-detail?requestId=123
```

## 🏭 Supplier Management

### Get Office Suppliers
```http
GET /off-supplier?page=1&limit=10&search=supplier_name&city=Bangkok
```

**Response Example:**
```json
{
  "data": [
    {
      "id": 1,
      "supplierCode": "SUP001",
      "supplierName": "ABC Company Ltd.",
      "contactPerson": "John Smith",
      "email": "contact@abc.com",
      "phone": "02-123-4567",
      "address": "123 Business Street, Bangkok",
      "status": "active"
    }
  ],
  "total": 45,
  "page": 1
}
```

### Get Supplier Names
```http
GET /off-supplier/supplier-name?search=abc
```

### Get Overseas Suppliers
```http
GET /supplier-oversea/list?supplierName=international
```

## 🌏 Overseas Operations

### Get Overseas Purchase Orders
```http
GET /purchase-order-oversea/list?page=1&startDate=2024-01-01&endDate=2024-12-31
```

### Get Orders by Type
```http
GET /purchase-order-oversea/type?type=IMPORT&page=1&startDate=2024-01-01&endDate=2024-12-31
```

**Available Types:**
- `IMPORT`
- `EXPORT`
- `TRANSIT`

## 📊 System Operations

### Get System Logs
```http
GET /log?page=1&limit=50&level=error&startDate=2024-01-01
```

### Create Log Entry
```http
POST /log
Content-Type: application/json

{
  "level": "info",
  "message": "User performed action",
  "module": "user",
  "userId": 123,
  "metadata": {
    "action": "login",
    "ip": "192.168.1.100"
  }
}
```

## 📈 Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid request data |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Resource not found |
| 422  | Unprocessable Entity - Validation error |
| 500  | Internal Server Error - Server error |

## 🔍 Common Query Parameters

### Pagination
- `page`: Page number (starts from 1)
- `limit`: Number of items per page (default: 10, max: 100)

### Date Filtering
- `startDate`: Start date in YYYY-MM-DD format
- `endDate`: End date in YYYY-MM-DD format

### Text Search
- `search`: Search term for text fields
- `q`: General query parameter

### Sorting
- `sortBy`: Field to sort by
- `sortOrder`: `asc` or `desc`

## ⚠️ Error Response Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [
    {
      "field": "email",
      "message": "Email must be a valid email address"
    }
  ]
}
```

## 📝 Request/Response Examples

### Successful Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [...]
  }
}
```

## 🔒 Security Notes

1. Always use HTTPS in production
2. Store JWT tokens securely (not in localStorage for web apps)
3. Implement proper CORS policies
4. Rate limiting is recommended for production
5. Validate all input data
6. Use environment variables for sensitive configuration

## 📞 Support

For API support or questions:
- Check the Swagger documentation at `/api`
- Review the error messages for debugging information
- Contact the development team for assistance

---

*Last updated: January 2024* 