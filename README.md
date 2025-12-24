# Portfolio Website

A modern, animated portfolio website built with Next.js, TypeScript, Tailwind CSS, and GSAP.

## Features

- 🎨 Dark mode by default with toggle functionality
- ✨ Smooth GSAP animations
- 📱 Fully responsive design
- 🚀 Built with Next.js 14 and TypeScript
- 🎭 Beautiful typography with serif and sans-serif fonts

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add your profile image:
   - Place your profile image at `public/profile.jpg`
   - Recommended size: 800x800px or larger

3. Update your resume:
   - Place your resume PDF at `public/resume.pdf`

4. Customize the content:
   - Edit `components/Hero.tsx` to update your introduction
   - Update social media links in `components/Footer.tsx`
   - Modify `app/layout.tsx` to change the site title and metadata

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind directives
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page
├── components/
│   ├── Header.tsx       # Header with navigation and dark mode toggle
│   ├── Hero.tsx         # Main hero section with profile and intro
│   └── Footer.tsx       # Footer with social media icons
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
└── public/              # Static assets (images, PDFs)
```

## Customization

### Colors
Edit `app/globals.css` to change the color scheme.

### Fonts
Modify `app/layout.tsx` to use different Google Fonts.

### Animations
Adjust GSAP animations in each component's `useEffect` hook.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

