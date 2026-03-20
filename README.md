# 🚀 Full Stack Score Tracker App

A simple full-stack web application where users can log in, add scores, and view a global leaderboard.

---

## 🔥 Features

* 🔐 Authentication (Email + Google login using Supabase)
* 📊 Add and manage personal scores
* 🏆 Leaderboard (Top 10 scores across all users)
* 🔒 Secure database with Row Level Security (RLS)
* 🚪 Logout functionality
* 🎨 Clean and responsive UI

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router) + Tailwind CSS
* **Backend:** Supabase (Auth + Database)
* **Deployment:** Vercel

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── login/
 │   ├── dashboard/
 │   ├── leaderboard/
 │
 ├── lib/
 │   └── supabaseClient.ts
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add environment variables

Create a `.env.local` file in root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zafuqapabymxvvhytxyt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_BuaaJTMSRM6tdDsm-qk-XA_jkkdAAyx
```

---

### 4. Run the project

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## 🗄 Database Schema

**Table: scores**

| Column     | Type      |
| ---------- | --------- |
| id         | uuid      |
| user_id    | uuid      |
| score      | int       |
| created_at | timestamp |

---

## 🔐 Security (RLS Policies)

* Users can insert their own scores
* Users can view their own scores
* Leaderboard allows public read access

---

## 🌐 Deployment

Deployed using **Vercel**

---

## 👨‍💻 Author

* Developed as part of Full Stack Training Project
* Built with focus on clean UI and proper architecture

---

## 📌 Notes

* Google OAuth used to avoid email rate limits
* UI kept simple and clean for usability
* Optimized for quick development and clarity

## For Testing Stripe
Card: 4242 4242 4242 4242
Expiry: 12/34 (any future date)
CVV: 123 (any 3 digits)
ZIP: 12345 (anything)
