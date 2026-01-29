# Payload CMS + Spatial GenUI LP

A high-performance landing page featuring a spatial, liquid-motion design powered by Next.js 15+ (App Router) and Payload CMS 3.0.

## 🚀 Project Overview

- **Frontend**: Next.js App Router with "Spatial GenUI" aesthetic. Features fluid cursor physics, text reveal animations, and bento-grid layouts.
- **Backend**: Payload CMS (Beta) for content management (Pages, Media, Users).
- **Design**: Minimalist, dark/light mode compatible, using `framer-motion` for animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16.1.6)
- **CMS**: [Payload CMS](https://payloadcms.com/) (v3.0+)
- **Database**: Postgres (via Neon, managed by Payload Adapter)
- **Styling**: Tailwind CSS v4, Lucide React
- **Animations**: Framer Motion

## 🚦 Setup Guide

### Prerequisites
- Node.js v18+ (Recommended v20 or v22)
- Postgres Database URL (Neon recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd cms-lp-hab
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://...  # Your Postgres Connection String
   PAYLOAD_SECRET=...             # A random strong string
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## ⚠️ Known Issues

- **Admin Panel**: Currently experiences a 500 error on local environments using certain Node.js/tsx configurations (`ERR_UNKNOWN_FILE_EXTENSION`). See `ISSUES.md` for details.
- **Security**: Moderate vulnerabilities detected in `esbuild` dependency (upstream).

## 📄 License

Private / Proprietary
