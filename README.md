# Flex BotEditor!

A production-ready web application to manage your Telegram Bot profile using the Telegram Bot API.

## Features

- Fetch bot information (name, username, ID, description, short description)
- Display bot profile photo
- Update bot name, description, and short description
- Secure: token never stored or saved
- Fully responsive (mobile, tablet, desktop, ultra-wide)
- Premium SaaS design with Framer Motion animations

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/flex-boteditor)

## Usage

1. Get your Bot Token from [@BotFather](https://t.me/BotFather) on Telegram
2. Enter the token in the input field
3. Click **Search Bot** to fetch your bot's current info
4. Edit the name, description, or short description
5. Click **Update Bot** to apply changes

## Security

- Bot tokens are processed only at request time via Next.js API routes
- No tokens are stored in any database, cookie, or storage
- All API calls are made server-side via Edge Runtime routes

## Developer

Built by [@Prime_x_Samiul](https://t.me/Prime_x_Samiul)
