# Make User Admin - Commands

## Option 1: Direct SQL in Neon Dashboard (Easiest)

1. Go to your Neon dashboard → SQL Editor
2. Run this SQL:

```sql
-- Update user by email
UPDATE "User" 
SET role = 'ADMIN', "updatedAt" = NOW()
WHERE email = 'your-email@example.com';

-- Verify it worked
SELECT id, name, email, role 
FROM "User" 
WHERE email = 'your-email@example.com';
```

## Option 2: Using Prisma Studio (Visual)

```bash
# Open Prisma Studio
npx prisma studio

# Then:
# 1. Navigate to "User" table
# 2. Find your user by email
# 3. Click on the user row
# 4. Change "role" field from "STUDENT" to "ADMIN"
# 5. Click "Save 1 change"
```

## Option 3: Using Prisma CLI (Command Line)

```bash
# First, create a temporary script
npx prisma db execute --stdin << EOF
UPDATE "User" 
SET role = 'ADMIN', "updatedAt" = NOW()
WHERE email = 'your-email@example.com';
EOF
```

## Option 4: Node.js Script

Create a file `make-admin.js` in your project root:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.error('❌ Please provide an email: node make-admin.js user@example.com');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    
    console.log('✅ User updated to ADMIN:');
    console.log(`   Name: ${user.name || 'N/A'}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();
```

Then run:
```bash
node make-admin.js your-email@example.com
```

## Quick SQL Commands Reference

```sql
-- List all users and their roles
SELECT id, name, email, role, "createdAt" 
FROM "User" 
ORDER BY "createdAt" DESC;

-- Find a specific user
SELECT * FROM "User" WHERE email = 'user@example.com';

-- Update user to ADMIN
UPDATE "User" 
SET role = 'ADMIN', "updatedAt" = NOW()
WHERE email = 'user@example.com';

-- Update user to STUDENT (if needed)
UPDATE "User" 
SET role = 'STUDENT', "updatedAt" = NOW()
WHERE email = 'user@example.com';

-- Count admins
SELECT COUNT(*) as admin_count 
FROM "User" 
WHERE role = 'ADMIN';
```

