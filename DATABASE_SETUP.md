# 🗄️ Database Setup Guide

## PostgreSQL Integration for CHAIS PAS

This guide will help you set up PostgreSQL for your decision-making app.

## 📋 Prerequisites

1. **PostgreSQL installed** on your system
2. **Node.js and npm** (already installed)
3. **Git** for version control

## 🚀 Quick Setup

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS (with Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE chaispas_db;
CREATE USER chaispas_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE chaispas_db TO chaispas_user;
\q
```

### 3. Environment Variables

Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="postgresql://chaispas_user:your_secure_password@localhost:5432/chaispas_db"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### 4. Generate Prisma Client

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) View your database
npx prisma studio
```

## 🏗️ Database Schema

The app uses three main tables:

### Users Table
- `id` - Unique user identifier
- `email` - User email (unique)
- `username` - Username (unique)
- `password` - Hashed password
- `createdAt` - Account creation date
- `updatedAt` - Last update date

### Decisions Table
- `id` - Unique decision identifier
- `userId` - Reference to user
- `selectedChoiceId` - Reference to selected choice
- `decisionTime` - Time taken for decision (ms)
- `createdAt` - Decision timestamp

### Choices Table
- `id` - Unique choice identifier
- `text` - Choice text
- `number` - Random number assigned
- `userId` - Reference to user
- `decisionId` - Reference to decision

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Decisions
- `POST /api/decisions/save` - Save decision to database
- `GET /api/analytics/user` - Get user analytics

## 🚀 Deployment Options

### Option 1: Vercel + Supabase (Recommended)
1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Get connection string** from Supabase dashboard
3. **Update DATABASE_URL** in Vercel environment variables
4. **Deploy to Vercel**

### Option 2: Railway
1. **Create Railway account** at [railway.app](https://railway.app)
2. **Add PostgreSQL service**
3. **Connect your GitHub repo**
4. **Set environment variables**

### Option 3: Self-hosted PostgreSQL
1. **Set up PostgreSQL server**
2. **Configure firewall and security**
3. **Update connection string**
4. **Deploy with your preferred hosting**

## 🔒 Security Considerations

### Environment Variables
- ✅ **Never commit** `.env` files to Git
- ✅ **Use strong passwords** for database
- ✅ **Rotate JWT secrets** regularly
- ✅ **Use HTTPS** in production

### Database Security
- ✅ **Limit database access** to app only
- ✅ **Use connection pooling** for performance
- ✅ **Regular backups** of your data
- ✅ **Monitor database** performance

## 🐛 Troubleshooting

### Common Issues

**Connection refused:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start if needed
sudo systemctl start postgresql
```

**Authentication failed:**
```bash
# Check pg_hba.conf for authentication method
sudo nano /etc/postgresql/*/main/pg_hba.conf
```

**Prisma errors:**
```bash
# Reset database
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```

## 📊 Database Management

### View Data
```bash
# Open Prisma Studio
npx prisma studio

# Or connect directly
psql -U chaispas_user -d chaispas_db
```

### Backup Database
```bash
pg_dump -U chaispas_user chaispas_db > backup.sql
```

### Restore Database
```bash
psql -U chaispas_user -d chaispas_db < backup.sql
```

## 🎯 Next Steps

1. **Test the setup** by running the app
2. **Create your first user** through registration
3. **Make some decisions** to test the database
4. **Check analytics** to see data being saved
5. **Deploy to production** when ready

## 📞 Support

If you encounter issues:
1. **Check the logs** for error messages
2. **Verify environment variables** are set correctly
3. **Test database connection** manually
4. **Check Prisma documentation** for more help

---

**Happy decision making! 🎲**