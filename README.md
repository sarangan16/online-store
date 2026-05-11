# KaufDE — SARANS Luxury Cosmetics Store

A full-stack luxury e-commerce application built with React and Node.js, featuring real Stripe payment processing, a dark editorial design, and smooth GSAP animations.

🌐 **Live Demo:** [kaufde.vercel.app](https://kaufde.vercel.app)

---

## Features

- 🛍️ **Product browsing** with category filtering and live search
- 🛒 **Cart system** with slide-in drawer and item management
- 💳 **Real Stripe checkout** — test with card `4242 4242 4242 4242`
- 📧 **Contact form** powered by EmailJS
- 🎞️ **GSAP scroll animations** on product cards
- 🌙 **Dark luxury design** with Cormorant Garamond typography and gold accents
- 📱 **Responsive** across all screen sizes

---

## Tech Stack

**Frontend**

- React 18
- Tailwind CSS
- GSAP + ScrollTrigger
- Framer Motion
- React Router v7
- React Icons

**Backend**

- Node.js + Express
- Stripe API
- CORS
- dotenv

**Deployment**

- Frontend → Vercel
- Backend → Railway

**APIs & Services**

- [DummyJSON](https://dummyjson.com) — product data
- [Stripe](https://stripe.com) — payment processing
- [EmailJS](https://emailjs.com) — contact form

---

## Getting Started

### Prerequisites

- Node.js 18+
- Stripe account (for payments)
- EmailJS account (for contact form)

### Installation

```bash
# clone the repo
git clone https://github.com/sarangan16/online-store.git
cd online-store

# install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Running locally

```bash
# run both frontend and backend together
npm run dev
```

- React app → `http://localhost:3000`
- Express server → `http://localhost:4000`

### Test Payment

Use Stripe test card details:

```
Card:    4242 4242 4242 4242
Expiry:  12/26
CVC:     123
```

---

## Project Structure

```
online-store/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # fixed nav with cart drawer + Stripe checkout
│   │   ├── Hero.jsx        # full screen image slider
│   │   ├── Home.jsx        # product grid with filters and search
│   │   ├── Product.js      # product detail with color swatches + reviews
│   │   ├── Contact.jsx     # EmailJS contact form
│   │   ├── Footer.jsx      # newsletter + links
│   │   └── Toast.jsx       # cart notification
│   ├── App.js
│   └── index.css           # global styles + utility classes
├── server.js               # Express + Stripe backend
├── Procfile                # Railway deployment config
└── package.json
```

---

## Deployment

**Frontend (Vercel)**

- Connect GitHub repo to Vercel
- Auto deploys on every push to `main`

**Backend (Railway)**

- Connect GitHub repo to Railway
- Set environment variable: `STRIPE_SECRET_KEY`
- Start command: `node server.js`

---

## License

ISC © 2025 SARANS
