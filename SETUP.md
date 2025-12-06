# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Before Going Live

1. **Update Contact Information**
   - Edit `components/Footer.tsx` - Update email and phone
   - Edit `components/ContactForm.tsx` - Update contact details
   - Update WhatsApp link in `components/ContactForm.tsx`

2. **Customize Content**
   - Review all page content in `/app` directory
   - Update testimonials in `components/Testimonials.tsx` if needed
   - Modify program details in `/app/program/page.tsx`

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Features Implemented

✅ All 7 pages (Home, About, Program, Internship, Project, Contact, Blog)
✅ Responsive navigation with mobile hamburger menu
✅ All required components
✅ Blue/white theme with professional styling
✅ Smooth animations and hover effects
✅ Mobile-first responsive design
✅ TypeScript for type safety
✅ Tailwind CSS for styling

## Notes

- Contact form currently shows an alert on submit. Integrate with your backend/email service.
- WhatsApp link is a placeholder - update with actual number.
- Phone number is placeholder - update with actual contact number.
- Blog posts are placeholder content - add real blog posts later.

