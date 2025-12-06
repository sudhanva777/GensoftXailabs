# Setup Instructions - Fixed Dependencies

## ✅ All Issues Fixed

### Issue 1: NPM Dependency Conflicts - FIXED
- ✅ Nodemailer pinned to exactly `6.9.11` (compatible with next-auth 4.24.5)
- ✅ All versions are now compatible
- ✅ No need for `--legacy-peer-deps` or `--force`

### Issue 2: Prisma Configuration - FIXED
- ✅ Prisma schema uses standard `url = env("DATABASE_URL")` (this is the correct Prisma way)
- ✅ Created singleton PrismaClient in `lib/prisma.ts` to avoid multiple connections
- ✅ All PrismaClient instances now use the shared singleton

### Issue 3: General Project Fixes - FIXED
- ✅ Clean dependency tree
- ✅ Compatible versions
- ✅ Proper PrismaClient initialization

---

## 🚀 Installation Steps

### Step 1: Clean Install

```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Install with fixed versions
npm install
```

**Expected Result:** Installation should complete without errors or warnings about peer dependencies.

---

### Step 2: Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and ensure `DATABASE_URL` is set:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```

---

### Step 3: Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init
```

**Expected Result:** 
- Prisma Client generated successfully
- Database file created at `prisma/dev.db`
- Migration completed

---

### Step 4: Verify Installation

```bash
# Check if everything works
npm run build
```

**Expected Result:** Build completes without errors.

---

## 📝 Important Notes

### Prisma Configuration

**Standard Prisma Approach (What We're Using):**
- The `url = env("DATABASE_URL")` in `schema.prisma` is the **correct and standard** way
- Prisma reads the DATABASE_URL from your `.env` file automatically
- No separate config file is needed

**Why This Works:**
- Prisma's `env()` function reads from `process.env.DATABASE_URL`
- This is the official Prisma pattern
- Works with all Prisma versions (including 5.7.1)

### PrismaClient Singleton

We've created a shared PrismaClient instance in `lib/prisma.ts`:
- Prevents multiple database connections
- Properly handles development vs production
- All files now import from `@/lib/prisma` instead of creating new instances

### Files Updated

1. ✅ `package.json` - Fixed dependency versions
2. ✅ `lib/prisma.ts` - New singleton PrismaClient
3. ✅ `lib/auth.ts` - Uses shared PrismaClient
4. ✅ `lib/auth-helpers.ts` - Uses shared PrismaClient
5. ✅ `app/api/auth/register/route.ts` - Uses shared PrismaClient
6. ✅ `app/student/page.tsx` - Uses shared PrismaClient
7. ✅ `prisma/schema.prisma` - Standard configuration (kept url = env())

---

## 🔧 Troubleshooting

### If `npm install` still fails:

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### If Prisma generate fails:

```bash
# Ensure DATABASE_URL is in .env.local
echo DATABASE_URL="file:./prisma/dev.db" >> .env.local

# Regenerate
npx prisma generate
```

### If migration fails:

```bash
# Reset database (dev only)
npx prisma migrate reset

# Try migration again
npx prisma migrate dev --name init
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completes without errors
- [ ] `npx prisma generate` succeeds
- [ ] `npx prisma migrate dev --name init` succeeds
- [ ] `npm run build` completes successfully
- [ ] Database file exists at `prisma/dev.db`
- [ ] No TypeScript errors in IDE

---

## 🎯 Next Steps

1. Start development server:
   ```bash
   npm run dev
   ```

2. Create an admin user (via Prisma Studio or API):
   ```bash
   npx prisma studio
   ```

3. Test the application:
   - Visit http://localhost:3000
   - Try registration at /auth/register
   - Test login at /auth/login

---

**All issues resolved! The project is ready to use.** 🎉

