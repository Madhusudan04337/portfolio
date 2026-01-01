# Madhusudan | Full Stack Developer Portfolio

A modern, high-performance portfolio website built with Next.js 16, Tailwind CSS v4, and GSAP for fluid animations.

## ✨ Features

- **Modern UI/UX**: Sophisticated dark theme with custom typography and interactive elements.
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes.
- **GSAP Animations**: Smooth, high-performance animations and scroll effects.
- **Server Actions**: Secure contact form handling using Next.js Server Actions.
- **Optimized Performance**: Built with Next.js 16 and Tailwind v4 for lightning-fast load times.
- **Clean Codebase**: Well-organized folder structure following industry best practices.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables for the contact form:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `CONTACT_EMAIL`

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Folder Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components.
- `components/ui/`: shadcn/ui components.
- `public/`: Static assets (images, documents).
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
