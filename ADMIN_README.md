# Mogi Studio Admin Panel

This is the administration panel for Mogi Studio, a design agency website. The admin panel allows managing projects, clients, testimonials, services, and contact form submissions.

## Features

- **Dashboard**: Overview of key metrics and recent activity
- **Projects Management**: Add, edit, delete, and feature portfolio projects
- **Client Management**: Manage client logos and information
- **Testimonials Management**: Add and manage client testimonials
- **Services Management**: Configure service offerings
- **Contact Form Submissions**: Manage and respond to contact form submissions

## Technology Stack

- **Frontend**: Next.js, React
- **UI Components**: Shadcn/UI
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MySQL database

### Installation

1. Make sure you've cloned the main Mogi Studio repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Configure Database

1. Create a MySQL database for the project
2. Update the `.env` file with your database connection string:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/mogi_studio"
   ```

### Set Up the Database

1. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

2. Push the schema to your database:
   ```bash
   npm run prisma:migrate
   ```

3. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

### Run the Application

```bash
npm run dev
```

The admin panel will be available at: http://localhost:3000/admin

### Default Admin Credentials

- Email: admin@mogistudio.com
- Password: admin123

*Make sure to change these credentials after first login*

## Project Structure

- `/app/admin`: Admin panel pages and components
- `/app/api`: API routes for admin panel operations
- `/prisma`: Database schema and migrations
- `/lib/prisma`: Prisma client configuration
- `/scripts`: Database seeding and utility scripts

## Admin Panel Pages

- **Dashboard** (`/admin`): Overview and quick access to all sections
- **Projects** (`/admin/projects`): Manage portfolio projects
- **Clients** (`/admin/clients`): Manage client information
- **Testimonials** (`/admin/testimonials`): Manage client testimonials
- **Services** (`/admin/services`): Configure service offerings
- **Contacts** (`/admin/contacts`): Manage contact form submissions

## Customization

- Modify the Prisma schema in `prisma/schema.prisma` to adjust the data model
- Update the admin panel UI in the corresponding page files
- Add new API endpoints in the `/app/api` directory

## Notes

- This admin panel is designed to work with the Mogi Studio website
- Make sure to implement proper authentication before deploying to production
- Consider implementing additional security measures like rate limiting for the login page