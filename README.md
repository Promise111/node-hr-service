# Node.js HR Service

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Promise111/node-hr-service)

**Repository**: [https://github.com/Promise111/node-hr-service](https://github.com/Promise111/node-hr-service) (main branch)

A modern NestJS microservice for HR/Payroll employee management. This service is part of a gradual transition from Laravel to Node.js, designed to replace or complement the existing Laravel-based HR/Payroll API.

## Overview

This NestJS service provides a RESTful API endpoint to fetch employee data by email address. It connects to the same MySQL database as the Laravel application, ensuring seamless integration during the migration period.

## Features

- ✅ **NestJS Framework**: Built with NestJS following best practices (modules, controllers, services)
- ✅ **TypeORM Integration**: MySQL database connection using TypeORM
- ✅ **Async/Await Patterns**: Proper asynchronous handling throughout
- ✅ **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- ✅ **Simulated External Service**: Random delay (200-500ms) to simulate external API calls
- ✅ **Production Ready**: Clean code structure, proper error responses, and TypeScript

## Requirements

- **Node.js**: >= 18.x
- **npm**: >= 9.x (or yarn/pnpm)
- **MySQL**: >= 5.7 (or MariaDB >= 10.3)
- **Database**: Access to the same MySQL database as the Laravel application

## Installation

1. **Navigate to the service directory**
   ```bash
   cd node-hr-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file with your database credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=legacy_hr_api
   
   PORT=3000
   NODE_ENV=development
   ```

4. **Verify database connection**
   - Ensure MySQL is running
   - Verify the database `legacy_hr_api` exists (or update `DB_DATABASE` in `.env`)
   - Ensure the `employees` table exists (created by Laravel migrations)

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The application will start on `http://localhost:3000` (or the port specified in `.env`).

### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### GET /api/employees/:email

Fetch employee data by email address.

**Parameters:**
- `email` (path parameter, required): Employee email address

**Response Format:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "Finance",
  "salary": 450000
}
```

**Status Codes:**
- `200 OK`: Employee found successfully
- `404 Not Found`: Employee with the specified email not found
- `500 Internal Server Error`: Server error occurred

**Example Requests:**

```bash
# Using curl
curl http://localhost:3000/api/employees/john@example.com

# Using httpie
http GET http://localhost:3000/api/employees/john@example.com

# Using fetch (JavaScript)
fetch('http://localhost:3000/api/employees/john@example.com')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Example Responses:**

**Success (200 OK):**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "Finance",
  "salary": 450000
}
```

**Not Found (404):**
```json
{
  "statusCode": 404,
  "message": "Employee with email nonexistent@example.com not found",
  "error": "Not Found"
}
```

**Server Error (500):**
```json
{
  "statusCode": 500,
  "message": "An error occurred while fetching employee data",
  "error": "Internal Server Error"
}
```

## Project Structure

```
node-hr-service/
├── src/
│   ├── employees/
│   │   ├── dto/
│   │   │   └── employee-response.dto.ts    # Response DTO
│   │   ├── entities/
│   │   │   └── employee.entity.ts          # TypeORM entity
│   │   ├── employees.controller.ts         # HTTP controller
│   │   ├── employees.service.ts            # Business logic
│   │   └── employees.module.ts             # NestJS module
│   ├── common/
│   │   └── utils/
│   │       └── delay.util.ts               # Delay simulation utility
│   ├── config/
│   │   └── data-source.ts                  # TypeORM data source config
│   ├── app.module.ts                       # Root module
│   └── main.ts                             # Application entry point
├── .env.example                            # Environment variables template
├── package.json                            # Dependencies and scripts
├── tsconfig.json                           # TypeScript configuration
├── nest-cli.json                           # NestJS CLI configuration
└── README.md                               # This file
```

## Key Implementation Details

### Async Logic
- All database operations use `async/await` patterns
- Simulated external service call with random delay (200-500ms) using `delay()` utility
- No callback-based code

### Error Handling
- **404 Not Found**: When employee email doesn't exist in database
- **500 Internal Server Error**: For database connection errors or unexpected exceptions
- Proper error messages included in responses
- Uses NestJS built-in exception filters

### Database Integration
- Uses TypeORM for database operations
- Connects to the same MySQL database as Laravel application
- Employee entity maps to the `employees` table
- Column names are mapped from snake_case (database) to camelCase (TypeScript)

### Code Organization
- **Module**: `EmployeesModule` - Encapsulates employees feature
- **Controller**: `EmployeesController` - Handles HTTP requests and responses
- **Service**: `EmployeesService` - Contains business logic and data access
- **Entity**: `Employee` - TypeORM entity representing the database table
- **DTO**: `EmployeeResponseDto` - Defines response structure

## Assumptions Made

1. **Database Schema**: The service assumes the `employees` table exists with the following structure:
   - `id` (primary key, auto-increment)
   - `first_name` (varchar)
   - `last_name` (varchar)
   - `email` (varchar, unique)
   - `salary` (decimal 10,2)
   - `department` (varchar)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

2. **Database Connection**: Assumes the same MySQL database is accessible with credentials provided in `.env`

3. **Response Format**: The `full_name` field is constructed by concatenating `first_name` and `last_name` from the database

4. **Development Mode**: TypeORM `synchronize` is enabled in development for convenience. In production, use migrations instead.

5. **Error Handling**: Server errors are logged to console. In production, integrate with a proper logging service (e.g., Winston, Pino).

## Testing

### Manual Testing
```bash
# Start the application
npm run start:dev

# Test with a valid email (assuming employee exists in database)
curl http://localhost:3000/api/employees/john@example.com

# Test with invalid email
curl http://localhost:3000/api/employees/nonexistent@example.com
```

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## Development

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Production Considerations

1. **Database Migrations**: Disable `synchronize` and use TypeORM migrations in production
2. **Logging**: Replace `console.error` with a proper logging service (Winston, Pino)
3. **Environment Variables**: Use secure secret management (AWS Secrets Manager, HashiCorp Vault)
4. **Error Monitoring**: Integrate error tracking (Sentry, Rollbar)
5. **API Documentation**: Consider adding Swagger/OpenAPI documentation
6. **Rate Limiting**: Add rate limiting for production use
7. **Authentication**: Add authentication/authorization if needed
8. **Health Checks**: Consider adding health check endpoints

## Migration Strategy: Laravel to Node.js

### How to transition without downtime

#### API Boundaries
- **Strangler Fig Pattern**: Migrate endpoints incrementally, one API route at a time
- **API Gateway/Router**: Use a reverse proxy (nginx, Kong, AWS API Gateway) to route requests to Laravel or Node.js based on endpoint
- **Feature Flags**: Implement feature flags to gradually shift traffic from Laravel to Node.js (0% → 10% → 50% → 100%)
- **Parallel Running**: Run both systems simultaneously, sharing the same database during transition
- **Versioned Endpoints**: Use `/api/v1` (Laravel) and `/api/v2` (Node.js) to allow gradual client migration

#### Data Ownership
- **Shared Database**: Both systems read/write to the same MySQL database during migration
- **Single Source of Truth**: Database remains the authoritative data store; no data synchronization needed
- **Transaction Safety**: Use database transactions and proper locking to prevent race conditions
- **Schema Compatibility**: Ensure Node.js entities match Laravel models exactly (column names, types, constraints)
- **Migration Windows**: Coordinate schema changes during low-traffic periods; both systems must support the same schema version

#### Risk Management
- **Canary Deployments**: Start with 1-5% of traffic to Node.js, monitor metrics, gradually increase
- **Rollback Plan**: Keep Laravel endpoints active and easily switchable via router configuration
- **Monitoring**: Implement comprehensive logging, metrics (response times, error rates), and alerts for both systems
- **A/B Testing**: Compare response times, error rates, and business metrics between Laravel and Node.js
- **Database Backups**: Ensure frequent backups before and during migration period
- **Health Checks**: Implement health check endpoints for both systems; route traffic away from unhealthy instances
- **Gradual Rollout**: Migrate low-risk, read-only endpoints first (like `/employees/:email`), then move to write operations

#### Team Collaboration
- **Documentation**: Maintain clear documentation of which endpoints are migrated and migration status
- **Communication**: Regular sync meetings between Laravel and Node.js teams to coordinate changes
- **Code Reviews**: Cross-team code reviews to ensure API contract consistency
- **Shared Standards**: Agree on API response formats, error codes, and validation rules upfront
- **Testing**: Both teams test against the same database and validate API compatibility
- **Knowledge Transfer**: Pair programming sessions and documentation sharing between teams
- **Feature Freeze**: Temporarily freeze new features in Laravel for endpoints being migrated to avoid conflicts

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running: `mysql -u root -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `.env` file
- Check network connectivity to database host

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 3000

### TypeORM Synchronization Issues
- In development, `synchronize: true` will auto-create/update tables
- In production, use migrations: `npm run migration:generate` and `npm run migration:run`

## License

MIT

