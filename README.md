# Modern Developer Portfolio

A high-performance, visually stunning developer portfolio built with **React**, **TypeScript**, and **Framer Motion**. Featuring interactive morphing project cards, a specialized achievement carousel, and a fully integrated contact system.

## 🚀 Features

-   **Interactive Project Showcase**: Morphing card components that reveal project details and direct links (Live/Repo) on hover.
-   **Dynamic Experience Timeline**: Categorized professional history with associated internship certificates.
-   **Achievement Carousel**: A premium achievement swiper highlighting symposium victories and technical milestones.
-   **EmailJS Integration**: Fully functional contact form with **Real-time Notifications** and **Auto-Reply** capabilities.
-   **Aesthetic UI**: Premium dark/light mode aesthetics with smooth GSAP-inspired animations and glassmorphism.
-   **Responsive Design**: Optimized for all devices, from mobile to ultra-wide displays.

## 🛠️ Tech Stack

-   **Frontend**: React 18, TypeScript, Vite
-   **Animations**: Framer Motion (motion/react), Lucide React (Icons)
-   **Styling**: Vanilla CSS (Modern CSS features like OKLCH, Flexbox, Grid)
-   **Forms**: EmailJS (@emailjs/browser)
-   **Deployment**: Optimized for Vercel / Netlify

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Madhusudan04337/dev-portfolio.git
cd dev-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_primary_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_auto_reply_template_id
```

### 4. Run Locally
```bash
npm run dev
```

## 📧 EmailJS Configuration

This portfolio uses two EmailJS templates:
1.  **Primary Template**: For receiving messages from users.
2.  **Auto-Reply Template**: For sending an automated confirmation back to the user.

Ensure your template variables match the following keys:
- `name`
- `email`
- `subject`
- `message`

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Developed by [Madhusudan](https://github.com/Madhusudan04337)
