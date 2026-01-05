# Gensoft X AI Labs - Website

A premium, fully responsive, production-ready website for **Gensoft X AI Labs**, a Data Science training & internship institute. Built with modern web technologies and a cohesive design system.

---

## 🚀 Project Overview

This is a Next.js 14+ website featuring a premium design system, fully responsive layout, and optimized performance. The website serves as a comprehensive learning management system (LMS) for the Data Science training program, including student portals, admin panels, real-time chat, attendance tracking, and task management.

**Live Demo**: [Your Domain Here]  
**Status**: Production Ready ✅  
**Version**: 3.1.0 - Complete LMS with Chat History & Task Submissions

---

## 🛠️ Technology Stack

### **Core Framework & Language**
- **Next.js** `14.2.0` - React framework with App Router
- **React** `18.3.0` - UI library
- **React DOM** `18.3.0` - React rendering
- **TypeScript** `5.3.3` - Type-safe JavaScript

### **Authentication & Database**
- **NextAuth.js** `4.24.5` - Authentication library (Credentials + Google OAuth)
- **Prisma** `5.7.1` - ORM and database toolkit
- **@auth/prisma-adapter** `1.0.12` - NextAuth Prisma adapter
- **bcryptjs** `2.4.3` - Password hashing
- **SQLite** - Development database (can be migrated to PostgreSQL)
- **PostgreSQL** - Production database (recommended via Neon.tech)
- **pg** - PostgreSQL client for Node.js

### **AI & APIs**
- **@google/generative-ai** `0.2.1` - Google Gemini AI SDK
- **Google Gemini 1.5 Flash** - AI assistant model

### **Styling & Design**
- **Tailwind CSS** `3.4.1` - Utility-first CSS framework
- **PostCSS** `8.4.33` - CSS processing
- **Autoprefixer** `10.4.17` - CSS vendor prefixing
- **Custom Design System** - Brand colors, gradients, animations

### **Icons & Graphics**
- **Lucide React** `0.344.0` - Modern icon library
- **Heroicons** `2.1.0` - Additional icon set
- **SVG Backgrounds** - Custom animated SVG components

### **Fonts**
- **Inter** - Primary font (weights: 400, 500, 600, 700, 800)
- **Poppins** - Secondary font (weights: 400, 500, 600, 700)
- Loaded via Google Fonts (Next.js optimization)

### **Development Tools**
- **Node.js** `18+` - Runtime environment
- **npm** - Package manager
- **TypeScript** - Type checking
- **ESLint** - Code linting (Next.js default)

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "@heroicons/react": "^2.1.0",
  "lucide-react": "^0.344.0",
  "next-auth": "4.24.5",
  "@auth/prisma-adapter": "1.0.12",
  "@prisma/client": "5.7.1",
  "@google/generative-ai": "^0.2.1",
  "bcryptjs": "^2.4.3",
  "pg": "^8.11.3",
  "nodemailer": "6.9.11",
  "razorpay": "^2.9.2",
  "@vercel/analytics": "^1.1.1",
  "gray-matter": "^4.0.3",
  "remark": "^15.0.1",
  "remark-html": "^16.0.1"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.11.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@types/nodemailer": "^6.4.14",
  "@types/bcryptjs": "^2.4.6",
  "autoprefixer": "^10.4.17",
  "postcss": "^8.4.33",
  "tailwindcss": "^3.4.1",
  "typescript": "^5.3.3",
  "prisma": "5.7.1"
}
```

---

## 🎨 Design System

### **Brand Colors**

#### Primary Gradient
- `#4F46E5` (Indigo) → `#6366F1` (Purple) → `#3B82F6` (Blue)
- Used for: Buttons, CTAs, Headings, Icons

#### Secondary Gradient
- `#3B82F6` → `#6366F1`
- Used for: Cards, Icon backgrounds

#### Accent Color
- `#9333EA` (Purple)
- Used for: Glow effects, highlights

#### Background Colors
- `#F8FAFC` - Primary background
- `#EEF2FF` - Indigo mist background
- `#FAFAFF` - Purplish white background

### **Typography System**

#### Headings (H1, H2, H3)
- Font: Inter
- Weight: 800
- Letter-spacing: -0.03em
- Line-height: 1.1

#### Body Text
- Font: Inter / Poppins
- Weight: 400-500
- Letter-spacing: 0.01em
- Line-height: 1.6

#### Buttons
- Font-weight: 600
- Letter-spacing: -0.01em

### **Animations**
- `animate-float` - Floating animation (6s ease-in-out)
- `animate-fade-up` - Fade up on scroll (0.6s ease-out)
- `icon-glow-pulse` - Pulsing glow effect (3s ease-in-out)
- Hover: `scale-[1.02]` with smooth transitions

---

## 📁 Project Structure

```
apex-tech-innovation/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts & metadata
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & design system
│   ├── about/
│   │   └── page.tsx              # About Us page
│   ├── program/
│   │   └── page.tsx              # Data Science Program page
│   ├── internship/
│   │   └── page.tsx              # Internship page
│   ├── project/
│   │   └── page.tsx              # Major Project page
│   ├── contact/
│   │   └── page.tsx              # Contact/Apply page
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx          # Login page (Credentials + Google OAuth)
│   │   └── register/
│   │       └── page.tsx          # Registration page
│   ├── student/                  # Student portal (protected)
│   │   ├── layout.tsx            # Student layout with sidebar
│   │   ├── page.tsx              # Student dashboard
│   │   ├── tasks/
│   │   │   ├── page.tsx          # Student tasks list
│   │   │   └── SubmitTaskForm.tsx # Task submission form
│   │   ├── project/
│   │   │   ├── page.tsx          # Project submission page
│   │   │   └── ProjectSubmissionForm.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx          # Student profile page
│   │   │   └── ProfileForm.tsx
│   │   ├── chat/
│   │   │   ├── page.tsx          # Student chat with admin
│   │   │   └── ChatInterface.tsx
│   │   └── attendance/
│   │       ├── page.tsx          # Student attendance view
│   │       └── AttendanceTable.tsx
│   ├── admin/                    # Admin portal (protected)
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── students/
│   │   │   ├── page.tsx          # Student management list
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Student detail page
│   │   ├── tasks/
│   │   │   ├── page.tsx          # Task management
│   │   │   ├── NewTaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── AssignTaskModal.tsx
│   │   │   ├── review/
│   │   │   │   ├── page.tsx      # Task review list
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx  # Task review detail
│   │   │   │       └── TaskReviewForm.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx          # Project review list
│   │   │   ├── ProjectListItem.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx      # Project review page
│   │   │       └── ProjectReviewForm.tsx
│   │   ├── chat/
│   │   │   ├── page.tsx          # Admin chat list
│   │   │   └── [studentId]/
│   │   │       ├── page.tsx      # Admin chat with student
│   │   │       └── ChatInterface.tsx
│   │   └── attendance/
│   │       ├── page.tsx          # Attendance management
│   │       └── AttendanceMarkingForm.tsx
│   ├── assistant/                # AI Assistant
│   │   └── page.tsx              # Apex AI chat interface
│   └── api/                       # API routes
│       ├── auth/
│       │   ├── [...nextauth]/    # NextAuth API route
│       │   │   └── route.ts
│       │   └── register/         # Registration API
│       │       └── route.ts
│       ├── assistant/            # Gemini AI API
│       │   ├── route.ts          # AI assistant chat
│       │   └── history/
│       │       └── route.ts     # Get chat history
│       ├── chat/                 # Real-time chat API
│       │   ├── send/
│       │   │   └── route.ts      # Send message
│       │   └── messages/
│       │       └── route.ts     # Get messages
│       ├── attendance/           # Attendance API
│       │   ├── mark/
│       │   │   └── route.ts      # Mark attendance (admin)
│       │   └── get/
│       │       └── route.ts     # Get attendance
│       ├── student/              # Student API routes
│       │   ├── tasks/
│       │   │   └── submit/
│       │   │       └── route.ts # Submit task
│       │   ├── project/
│       │   │   └── route.ts     # Project submission
│       │   └── profile/
│       │       └── route.ts     # Profile update
│       ├── admin/                # Admin API routes
│       │   ├── tasks/
│       │   │   ├── route.ts     # Create task
│       │   │   ├── assign/
│       │   │   │   └── route.ts # Assign task
│       │   │   └── review/
│       │   │       └── route.ts # Review task submission
│       │   └── projects/
│       │       └── review/
│       │           └── route.ts # Review project
│       └── contact/              # Contact form API
│           └── route.ts
│
├── components/                    # React components
│   ├── Navbar.tsx                # Server component wrapper
│   ├── NavbarClient.tsx          # Client navbar (auth-aware)
│   ├── LogoutButton.tsx          # Logout button component
│   ├── Footer.tsx                # Footer with links
│   ├── Hero.tsx                  # Hero section with SVG backgrounds
│   ├── FeatureCards.tsx          # Why Choose Us cards
│   ├── ProgramHighlights.tsx     # Program highlights grid
│   ├── ToolsSection.tsx          # Tools you learn pills
│   ├── StudentJourney.tsx        # Student journey timeline
│   ├── Testimonials.tsx          # Student testimonials
│   ├── FinalCTA.tsx              # Final call-to-action
│   ├── CurriculumTimeline.tsx    # Weekly curriculum
│   ├── InternshipOverview.tsx    # Internship details
│   ├── ProjectOverview.tsx       # Project requirements
│   ├── ContactForm.tsx           # Contact form (client component)
│   ├── TeamMembers.tsx           # Leadership team
│   ├── Logo.tsx                  # Logo component (3 variants)
│   └── SVGBackgrounds.tsx        # SVG background components
│
├── lib/                           # Utility libraries
│   ├── prisma.ts                 # PrismaClient singleton
│   ├── auth.ts                   # NextAuth configuration
│   ├── auth-helpers.ts           # Auth helper functions
│   └── blog.ts                   # Blog utilities
│
├── prisma/                        # Database
│   ├── schema.prisma             # Prisma schema (User, Task, ProjectSubmission, Message, Attendance, etc.)
│   ├── migrations/               # Database migrations
│   └── dev.db                    # SQLite database (dev)
│
├── public/                        # Static assets
│   └── team/
│       ├── dilip.jpg             # CEO photo
│       └── sudhanva.jpg          # CLO photo
│
├── content/                       # Content files
│   └── blog/                     # Markdown blog posts
│
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn/pnpm)
- Code editor (VS Code recommended)

### **Installation**

1. **Clone the repository** (if applicable)
   ```bash
   git clone [repository-url]
   cd apex-tech-innovation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📄 Pages & Routes

| Route | Page | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | Home | Main landing page with hero, features, highlights, testimonials | No |
| `/about` | About Us | Company story, mission, vision, team members | No |
| `/program` | Program | Training program details, curriculum, tracks | No |
| `/internship` | Internship | Internship overview, tasks, certification rules | No |
| `/project` | Major Project | Project requirements, submission details | No |
| `/contact` | Contact | Contact form, application form, contact info | No |
| `/blog` | Blog | Blog listing page with search and filters | No |
| `/assistant` | Apex AI | AI assistant chat interface (Gemini-powered) | No |
| `/auth/login` | Login | Login page (Credentials + Google OAuth) | No |
| `/auth/register` | Register | Student registration page | No |
| `/student` | Student Dashboard | Student portal with tasks, projects, progress | **STUDENT** |
| `/student/tasks` | My Tasks | View assigned tasks, submit tasks with answers/files | **STUDENT** |
| `/student/project` | Major Project | Submit and view project submission | **STUDENT** |
| `/student/profile` | My Profile | View and update profile information | **STUDENT** |
| `/student/chat` | Chat with Admin | Real-time messaging with administrators | **STUDENT** |
| `/student/attendance` | My Attendance | View attendance records and percentage | **STUDENT** |
| `/admin` | Admin Dashboard | Admin portal with statistics and recent activity | **ADMIN** |
| `/admin/students` | Student Management | List all students with details | **ADMIN** |
| `/admin/students/[id]` | Student Profile | View student details, tasks, and projects | **ADMIN** |
| `/admin/tasks` | Task Management | Create tasks and assign to students | **ADMIN** |
| `/admin/tasks/review` | Task Review Panel | Review all task submissions from students | **ADMIN** |
| `/admin/tasks/review/[id]` | Task Review | Review individual task submission with accept/reject | **ADMIN** |
| `/admin/projects` | Project Review | Review and approve/reject student projects | **ADMIN** |
| `/admin/projects/[id]` | Project Review | Detailed project review with feedback | **ADMIN** |
| `/admin/chat` | Student Messages | List of students who have messaged | **ADMIN** |
| `/admin/chat/[studentId]` | Chat with Student | Real-time messaging with student | **ADMIN** |
| `/admin/attendance` | Attendance Management | Mark and view student attendance | **ADMIN** |

---

## 🧩 Components

### **Global Components**
- **Navbar** - Sticky navigation with glassmorphism, active route highlighting
- **Footer** - Dark theme footer with links and contact info
- **Logo** - 3 variants (text, symbol, badge)

### **Page Components**
- **Hero** - Hero section with SVG backgrounds, gradient text, CTAs
- **FeatureCards** - Why Choose Us cards with Lucide icons
- **ProgramHighlights** - Program modules grid
- **ToolsSection** - Gradient pill badges for tools
- **StudentJourney** - 7-step journey timeline
- **Testimonials** - Glassmorphism testimonial cards
- **FinalCTA** - Premium gradient CTA with animated waves
- **CurriculumTimeline** - Weekly curriculum breakdown
- **InternshipOverview** - Internship details with icons
- **ProjectOverview** - Project requirements and submission
- **ContactForm** - Contact/application form (client component)
- **TeamMembers** - Leadership team with real photos

### **Utility Components**
- **SVGBackgrounds** - Radial glow and animated waves
- **Logo** - Reusable logo component

---

## 🎯 Key Features

### **Design & UI**
- ✅ Premium design system with brand colors
- ✅ Glassmorphism effects
- ✅ Smooth animations and transitions
- ✅ Gradient backgrounds and borders
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern iconography (Lucide React)
- ✅ Custom SVG backgrounds

### **Performance**
- ✅ Next.js Image optimization
- ✅ Font optimization (Google Fonts)
- ✅ Code splitting and lazy loading
- ✅ Optimized bundle size

### **User Experience**
- ✅ Mobile-first responsive design
- ✅ Smooth scroll behavior
- ✅ Interactive hover effects
- ✅ Loading states and transitions
- ✅ Accessible navigation

### **Developer Experience**
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Reusable utility classes
- ✅ Consistent code style
- ✅ Easy customization

---

## 🎨 Customization Guide

### **Update Brand Colors**

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#4F46E5",
    // ...
  }
}
```

### **Update Contact Information**

Edit these files:
- `components/Footer.tsx`
- `components/ContactForm.tsx`

### **Add Team Photos**

Place images in `/public/team/`:
- `dilip.jpg` - CEO photo
- `sudhanva.jpg` - CLO photo

### **Modify Content**

- Pages: Edit files in `/app/[page]/page.tsx`
- Components: Edit files in `/components/`
- Global styles: Edit `app/globals.css`

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|------------|--------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640px - 1024px | 2 columns, adjusted spacing |
| Desktop | > 1024px | Full layout, multi-column |

---

## 🔧 Configuration Files

### **TypeScript** (`tsconfig.json`)
- Strict mode enabled
- Path aliases: `@/*` → `./*`
- Next.js plugin configured

### **Tailwind CSS** (`tailwind.config.ts`)
- Custom brand gradients
- Extended color palette
- Custom shadows and animations

### **PostCSS** (`postcss.config.js`)
- Tailwind CSS processing
- Autoprefixer for vendor prefixes

### **Next.js** (`next.config.js`)
- React strict mode
- Production optimizations

---

## 🚢 Deployment

### **Build for Production**

```bash
npm run build
```

### **Deploy Options**

1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Automatic deployments
   - Zero configuration

2. **Netlify**
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Self-hosted**
   ```bash
   npm run build
   npm start
   ```

### **Environment Variables**

Create `.env.local` (or `.env`) with the following variables:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET=replace_with_strong_random_string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (for login)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Google Gemini API (for AI assistant)
GOOGLE_API_KEY=your_google_gemini_api_key_here

# Email (for contact form)
CONTACT_EMAIL=your_email@gmail.com
CONTACT_EMAIL_PASSWORD=your_app_password

# Payment (optional)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## 📝 Content Management

### **Update Testimonials**

Edit `components/Testimonials.tsx`:
```typescript
const testimonials = [
  {
    name: "Student Name",
    role: "Role",
    content: "Testimonial text",
    rating: 5
  }
]
```

### **Update Program Tracks**

Edit `app/program/page.tsx`:
```typescript
const tracks = [
  {
    name: "Track Name",
    duration: "X weeks",
    // ...
  }
]
```

### **Update Team Members**

Edit `components/TeamMembers.tsx`:
```typescript
const teamMembers = [
  {
    name: "Name",
    role: "Role",
    image: "/team/photo.jpg",
    description: "Description"
  }
]
```

---

## 🐛 Troubleshooting

### **Common Issues**

1. **Module not found errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript errors**
   ```bash
   npm run build
   # Fix any type errors shown
   ```

3. **Tailwind styles not applying**
   - Check `tailwind.config.ts` content paths
   - Restart dev server

4. **Images not loading**
   - Verify images exist in `/public/team/`
   - Check image paths in components

---

## 📚 Additional Resources

### **Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

### **Design System**
- Brand colors defined in `tailwind.config.ts`
- Typography system in `app/globals.css`
- Animation utilities in `app/globals.css`

---

## 👥 Team

- **Dilip S Angadi** - CEO & Founder
- **Sudhanva Patil** - Chief Learning Officer (CLO) & Technical Head

---

## 📄 License

© 2024 Gensoft X AI Labs. All rights reserved.

---

## 🤝 Support

For support, email **info@apextechinnovation.com** or visit the contact page.

---

## 🔐 Authentication & Authorization

### **How Authentication Works**

1. **Registration Flow:**
   - Users register at `/auth/register` with name, email, password
   - Password is hashed with bcryptjs
   - User is created with role "STUDENT" by default
   - User can then login at `/auth/login`

2. **Login Options:**
   - **Credentials:** Email/password login
   - **Google OAuth:** One-click Google sign-in
   - Both methods create/update user in database
   - Session stored as JWT token

3. **Role-Based Access:**
   - `requireStudent()` - Protects student routes, redirects to `/admin` if admin
   - `requireAdmin()` - Protects admin routes, redirects to `/student` if student
   - Unauthenticated users redirected to `/auth/login`

### **Adding a New Admin**

1. Register/login as the user
2. Open Prisma Studio: `npx prisma studio`
3. Find the user in the User table
4. Change `role` from "STUDENT" to "ADMIN"
5. Save changes

### **Session Management**

- Sessions use JWT strategy (works with serverless)
- Role is included in JWT token
- Session persists across page refreshes
- Logout clears session and redirects to home

## 🔄 Version History

- **v3.1.0** - Chat History Persistence + Task Submission System
  - ✅ Full chat history persistence for AI assistant
  - ✅ Automatic history loading on page visit
  - ✅ Task submission and review system
  - ✅ Admin task review panel
  - ✅ Student task submission forms
  - ✅ Enhanced role-based AI assistant prompts

- **v3.0.0** - Complete Student & Admin Portal + Chat + Attendance
  - ✅ Full student portal (Tasks, Project, Profile, Chat, Attendance)
  - ✅ Complete admin panel (Students, Tasks, Projects, Chat, Attendance)
  - ✅ Real-time chat system (Student ↔ Admin messaging)
  - ✅ Attendance management system
  - ✅ Task creation and assignment system
  - ✅ Project review and approval workflow
  - ✅ File upload for project submissions
  - ✅ Analytics and statistics dashboards
  - ✅ Monthly attendance filtering
  - ✅ Auto-refresh chat (3-second polling)

- **v2.0.0** - Authentication & AI Assistant Update
  - ✅ Hybrid authentication (Credentials + Google OAuth)
  - ✅ Role-based access control (STUDENT/ADMIN)
  - ✅ Student dashboard with progress tracking
  - ✅ Admin dashboard with user management
  - ✅ Apex AI Assistant powered by Google Gemini
  - ✅ Protected routes with automatic redirects
  - ✅ Auth-aware navigation bar
  - ✅ Prisma schema with NextAuth models

- **v1.0.0** - Initial release with full design system integration
  - Premium UI/UX design
  - Complete component library
  - Responsive layout
  - Brand design system
  - Real team photos
  - SVG backgrounds
  - Lucide icons integration

---

---

## 🔧 Setup & Installation (Complete Guide)

### **Initial Setup**

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   - Create `.env.local` file in the root directory
   - Copy the environment variables template from the "Environment Variables" section above
   - Fill in all required values:
     - Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
     - Get Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
     - Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. **Database Setup (Prisma)**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
   This will create the database schema with:
   - User, Account, Session, VerificationToken (NextAuth)
   - Task, StudentTask (Task management)
   - TaskSubmission (Task submissions)
   - ProjectSubmission (Project submissions)
   - Message (Chat system)
   - ChatHistory (AI assistant chat history)
   - Attendance (Attendance tracking)
   - StudentProfile, Payment (Additional features)
   
   **For PostgreSQL setup:** See the PostgreSQL (Neon) Setup Guide section below.

4. **Create Admin User**
   ```bash
   npx prisma studio
   ```
   - Register a user via `/auth/register` or login with Google OAuth
   - Open Prisma Studio and find the user
   - Change `role` from "STUDENT" to "ADMIN"
   - Save the changes

5. **Run Development Server**
   ```bash
   npm run dev
   ```

### **Required Environment Variables**

**Authentication:**
- `NEXTAUTH_SECRET` - Secret key for NextAuth (generate: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your site URL (e.g., `http://localhost:3000` for dev, `https://yourdomain.com` for prod)
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret

**Database:**
- `DATABASE_URL` - SQLite for dev: `"file:./prisma/dev.db"` or PostgreSQL for production

**AI Assistant:**
- `GOOGLE_API_KEY` - Google Gemini API key

**Optional:**
- `CONTACT_EMAIL` - Gmail address for contact form
- `CONTACT_EMAIL_PASSWORD` - Gmail app password
- `RAZORPAY_KEY_ID` - Razorpay payment key
- `RAZORPAY_KEY_SECRET` - Razorpay payment secret

### **Google OAuth Setup**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure consent screen
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (dev)
7. Add production URI: `https://yourdomain.com/api/auth/callback/google` (prod)
8. Copy Client ID and Client Secret to `.env.local`

### **Google Gemini API Setup**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to `GOOGLE_API_KEY` in `.env.local`
4. The assistant uses `gemini-1.5-flash` model

### **Gmail App Password Setup** (Optional - for contact form)

1. Go to Google Account settings
2. Enable 2-Step Verification
3. Generate App Password for "Mail"
4. Use this password in `CONTACT_EMAIL_PASSWORD`

### **Prisma Commands**

```bash
# Generate Prisma Client (required after schema changes)
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# View database (GUI)
npx prisma studio

# Reset database (dev only - deletes all data)
npx prisma migrate reset

# Apply migrations (production)
npx prisma migrate deploy
```

### **Database Models**

The Prisma schema includes the following models:

- **User** - User accounts with roles (STUDENT/ADMIN), email, name, phone
- **Account, Session, VerificationToken** - NextAuth authentication models
- **StudentProfile** - Extended student information (program track, enrollment date, status)
- **Task** - Task definitions (title, description, week, due date)
- **StudentTask** - Task assignments to students (status: PENDING, IN_PROGRESS, COMPLETED, OVERDUE)
- **ProjectSubmission** - Student project submissions (title, description, file, GitHub, status, feedback)
- **Message** - Chat messages between users (sender, receiver, content, timestamp)
- **ChatHistory** - AI assistant chat history (user messages and assistant replies)
- **TaskSubmission** - Student task submissions (answer, file, status, feedback)
- **Attendance** - Attendance records (date, status: PRESENT/ABSENT)
- **Payment** - Payment transactions (Razorpay integration)

### **Usage Examples**

#### **Student Workflow**
1. Register at `/auth/register` or login with Google
2. Access dashboard at `/student` to see progress
3. View tasks at `/student/tasks`
4. Submit project at `/student/project`
5. Update profile at `/student/profile`
6. Chat with admin at `/student/chat`
7. View attendance at `/student/attendance`

#### **Admin Workflow**
1. Login as admin user
2. Access dashboard at `/admin` for overview
3. Manage students at `/admin/students`
4. Create and assign tasks at `/admin/tasks`
5. Review projects at `/admin/projects`
6. Respond to student messages at `/admin/chat`
7. Mark attendance at `/admin/attendance`

### **Prisma Configuration**

- **Database URL:** Set in `.env.local` as `DATABASE_URL="file:./prisma/dev.db"`
- **PrismaClient:** Use the singleton from `@/lib/prisma` (prevents multiple connections)
- **Schema Location:** `prisma/schema.prisma`
- **Migrations:** Stored in `prisma/migrations/`

**Important:** All PrismaClient instances should import from `@/lib/prisma` instead of creating new instances.

---

## 🐘 PostgreSQL (Neon) Setup Guide

This guide will help you migrate from SQLite to PostgreSQL using Neon.tech for production-ready database hosting.

### **STEP 1 — Create a PostgreSQL Database Using Neon**

1. Visit [https://neon.tech](https://neon.tech)
2. Create a free account
3. Click **"New Project"**
4. Fill in the details:
   - **Project Name:** `apextech`
   - **Database Name:** `apextech`
   - **Region:** Select the region closest to India (Recommended: Mumbai or Singapore)
5. Once Neon creates your project, it will show a PostgreSQL connection URL that looks like:
   ```
   postgresql://user:password@ep-1234.ap-south-1.aws.neon.tech/neondb?sslmode=require
   ```
6. **📌 Save this URL** — you will add it to your `.env` file.

### **STEP 2 — Update Your .env File**

1. Open your local environment file:
   ```
   D:\ApexTech\apex tech\.env
   ```
2. Locate this line:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   ```
3. Replace it with your Neon PostgreSQL connection URL:
   ```env
   DATABASE_URL="postgresql://user:password@ep-1234.ap-south-1.aws.neon.tech/neondb?sslmode=require"
   ```
4. If you have `.env.local`, update it there as well.

**✔ This makes Prisma use PostgreSQL instead of SQLite.**

> **⚠️ Security Note:** Keep your connection string secure and never commit it to version control. Always use environment variables in production.

> **⚠️ Security Note:** Keep your connection string secure and never commit it to version control. Always use environment variables in production.

### **STEP 3 — Install PostgreSQL Dependencies**

Open your terminal inside your project folder:

```bash
cd "D:\ApexTech\apex tech"
```

Install the required packages:

```bash
npm install @prisma/client
npm install pg
```

These packages allow Prisma to connect to PostgreSQL.

### **STEP 4 — Generate the Prisma Client for PostgreSQL**

Run:

```bash
npx prisma generate
```

This rebuilds Prisma's internal client to work with PostgreSQL.

**If no errors appear → continue.**

### **STEP 5 — Push Your Prisma Schema to PostgreSQL**

This step creates all tables inside your Neon database.

Run:

```bash
npx prisma migrate dev --name "init_postgres_setup"
```

This will:
- Create all tables (Users, Tasks, Submissions, Attendance, Chat, etc.)
- Replace the old SQLite local database
- Set up the full production-grade schema

**If migration succeeds → PostgreSQL setup is COMPLETE.**

### **STEP 6 — Test Your App with PostgreSQL**

Finally, run your project locally to confirm everything works:

```bash
npm run dev
```

Open your browser:
👉 [http://localhost:3000](http://localhost:3000)

**Check if the portal works correctly:**
- ✅ Login
- ✅ Signup
- ✅ Student dashboard
- ✅ Admin dashboard
- ✅ Task submission
- ✅ Project submission
- ✅ Chat
- ✅ AI assistant
- ✅ Attendance system

**If everything works normally → your PostgreSQL migration is successful, and you are ready to deploy.**

### **Important Notes**

- **Backup:** Before migrating, consider backing up your SQLite database if you have important data
- **Data Migration:** If you need to migrate existing data from SQLite to PostgreSQL, you'll need to export and import the data manually
- **Connection Pooling:** Neon provides automatic connection pooling, which is great for serverless deployments
- **Free Tier:** Neon's free tier is generous and perfect for development and small production deployments

---

### **Deployment to Vercel**

1. **Connect Repository**
   - Push code to GitHub
   - Import project in Vercel

2. **Environment Variables**
   - Add all variables from `.env.example` in Vercel dashboard
   - Set `NEXTAUTH_URL` to your production domain

3. **Database (Production)**
   - **Recommended:** Use PostgreSQL via Neon.tech (see PostgreSQL Setup Guide above)
   - Update `DATABASE_URL` in Vercel with your Neon connection string
   - Run migrations: `npx prisma migrate deploy`
   - Ensure `NEXTAUTH_URL` is set to production domain
   - Update Google OAuth redirect URI to production domain
   - **Note:** SQLite is not recommended for production deployments

4. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Deploy**
   - Vercel will auto-deploy on push
   - Or manually trigger from dashboard

### **Features Overview**

✅ **Lead Generation**
- Contact form with email sending
- WhatsApp & Call CTAs
- Contact quick actions component

✅ **Blog System**
- MDX/Markdown blog posts
- Search and tag filtering
- SEO optimized

✅ **Hybrid Authentication (NextAuth.js)**
- Email/password credentials login
- Google OAuth login
- User roles: STUDENT (default) and ADMIN
- JWT-based sessions
- Protected routes with role-based access control

✅ **Student Portal** (Protected - STUDENT role)
- **Dashboard** - Learning progress, task statistics, project status
- **Tasks Page** - View all assigned tasks with status, due dates, and completion tracking
- **Project Submission** - Upload project files (PDF/ZIP), add GitHub repo, track review status
- **Profile Management** - Update phone number and program track
- **Real-time Chat** - 1:1 messaging with administrators (auto-refresh every 3 seconds)
- **Attendance View** - View attendance records, filter by month, see attendance percentage

✅ **Admin Dashboard** (Protected - ADMIN role)
- **Enhanced Dashboard** - Real-time KPIs, project submission summary, recent activity feed
- **Student Management** - Full student list with profile details, view individual student pages
- **Task Management** - Create tasks, assign to students, filter by status/week/student
- **Project Review Panel** - Review all submissions, approve/reject with feedback
- **Real-time Chat** - View students who messaged, respond to student inquiries
- **Attendance Management** - Mark attendance for any date, view analytics (highest/lowest/average)

✅ **Apex AI Assistant** (Gemini-powered)
- Real-time chat interface
- Google Gemini 1.5 Flash integration
- Role-based responses (Student vs Admin modes)
- Context-aware responses about Data Science program
- **Persistent chat history** - All conversations saved in database
- Automatic history loading on page visit
- Beautiful chat UI with message bubbles
- Loading states and animations
- Strict boundaries - only answers LMS-related questions

✅ **Real-time Chat System** (Student ↔ Admin)
- 1:1 messaging between students and administrators
- Auto-refresh every 3 seconds for real-time updates
- Message bubbles with timestamps
- Students can only message admins, admins can message any student
- Chat history preserved in database

✅ **AI Assistant Chat History**
- Full message persistence for both students and admins
- Automatic history loading when opening assistant
- Seamless conversation continuation across sessions
- All user messages and AI replies saved to database
- Role-based chat history (separate for each user)

✅ **Attendance System**
- **Student View** - View own attendance with percentage, monthly filtering
- **Admin View** - Mark attendance for any student/date, view analytics
- Attendance percentage calculations
- Status badges (Present/Absent)
- Summary analytics (highest/lowest/average attendance)

✅ **Task Management System**
- Admin creates tasks with title, description, week, due date
- Assign tasks to individual students
- Track task completion status
- Filter tasks by status, week, or student
- View all assignments in one place

✅ **Task Submission & Review System**
- Students submit tasks with text answers and optional file uploads
- Admin review panel for all task submissions
- Accept/reject workflow with feedback
- Resubmission allowed for rejected tasks
- Automatic task completion on acceptance
- File upload support (PDF/ZIP/JPG/PNG, max 10MB)

✅ **Project Review System**
- Students submit projects with files and GitHub links
- Admin reviews submissions
- Approve/reject with feedback
- Track submission status (Under Review, Approved, Rejected)
- File upload support (PDF/ZIP, max 10MB)

✅ **Payment Integration**
- Razorpay integration (test mode)
- Enrollment flow
- Payment tracking

✅ **SEO & Analytics**
- Sitemap generation
- Robots.txt
- Vercel Analytics
- Open Graph metadata

---

**Built with ❤️ by Gensoft X AI Labs**

