# Bug Tracker Backend API

A RESTful API for managing projects and issues in a bug tracking system.

## Features

- ✅ Create, read, update, and delete issues
- ✅ Associate issues with projects
- ✅ Issue status management (TO_DO, IN_PROGRESS, IN_REVIEW, DONE)
- ✅ Data validation and error handling
- ✅ PostgreSQL database with Prisma ORM

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database connection string.

3. **Database setup:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   ```

4. **Start the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Issues

#### Get all issues
```
GET /api/issues
```

#### Get issue by ID
```
GET /api/issues/:id
```

#### Create new issue
```
POST /api/issues/:projectId
Content-Type: application/json

{
  "title": "Issue title",
  "description": "Optional description",
  "status": "TO_DO" // Optional, defaults to TO_DO
}
```

#### Update issue
```
PUT /api/issues/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

#### Delete issue
```
DELETE /api/issues/:id
```

### Projects

Project endpoints are handled by the projects routes (see `routes/projects.routes.js`).

## Data Models

### Issue
- `id`: Unique identifier (CUID)
- `title`: Issue title (required)
- `description`: Optional description
- `status`: Issue status (TO_DO, IN_PROGRESS, IN_REVIEW, DONE)
- `projectId`: Associated project ID
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Project
- `id`: Unique identifier (CUID)
- `name`: Project name
- `createdAt`: Creation timestamp
- `issues`: Related issues

## Status Values

- `TO_DO`: Issue is planned but not started
- `IN_PROGRESS`: Issue is currently being worked on
- `IN_REVIEW`: Issue is completed and under review
- `DONE`: Issue is completed and approved

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Success
- `201`: Created
- `204`: No Content (for deletions)
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Development

The backend uses:
- **Express.js** for the web framework
- **Prisma** for database ORM
- **PostgreSQL** for the database
- **CORS** for cross-origin requests
- **dotenv** for environment configuration
