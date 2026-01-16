# RABA - Audio Learning Management System

RABA adalah sistem manajemen pembelajaran berbasis audio yang memungkinkan guru mengelola siswa, orang tua memantau perkembangan anak, dan siswa melacak progress pembelajaran mereka.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Tech Stack](#tech-stack)
- [Setup dan Instalasi](#setup-dan-instalasi)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Role dan Permissions](#role-dan-permissions)
- [Panduan Penggunaan](#panduan-penggunaan)
- [Integrasi ESP32](#integrasi-esp32)

## 🎯 Fitur Utama

### 1. Guru (Teacher)
- ✅ Upload dan kelola audio files
- ✅ Upload dan kelola gambar/images
- ✅ Assign audio ke siswa tertentu
- ✅ Link parent/orang tua ke siswa
- ✅ Pantau progress siswa (completion rate, downloads)
- ✅ Lihat daftar semua siswa dan orang tua

### 2. Siswa (Child/Student)
- ✅ Lihat hanya audio yang di-assign guru
- ✅ Play audio dengan player embedded
- ✅ Download audio files
- ✅ Track progress pribadi (sudah play/belum)
- ✅ Mark audio sebagai completed setelah selesai mendengarkan

### 3. Orang Tua (Parent)
- ✅ Lihat hanya anak mereka (di-link oleh guru)
- ✅ Pantau progress setiap anak
- ✅ Lihat berapa banyak audio sudah completed
- ✅ Track download progress

## 🏗️ Arsitektur Sistem
┌─────────────────────────────────────────────────────────────┐
│ Frontend (React + Vite) │
│ (Dashboard Guru, Siswa, Orang Tua, Audio Player, Upload) │
└────────────────────────┬────────────────────────────────────┘
│ HTTP/REST API
↓
┌─────────────────────────────────────────────────────────────┐
│ Backend (Express.js + TypeScript) │
│ (Auth, Progress Tracking, File Management, Assignments) │
└────────────────────────┬────────────────────────────────────┘
│
↓
┌─────────────────────────────────────────────────────────────┐
│ Database (PostgreSQL) + File Storage │
│ (Users, Audio Files, Images, Progress Tracking) │
└─────────────────────────────────────────────────────────────┘

## 💻 Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- React Router v7
- TailwindCSS + shadcn/ui
- React Hook Form + Zod
- SweetAlert2
- Sonner (Toast notifications)

**Backend:**
- Node.js + Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt (Password hashing)
- express-fileupload (File uploads)
- CORS

**Database:**
- PostgreSQL
- Prisma Schema

## 🚀 Setup dan Instalasi

### Prerequisites
- Node.js v16+ dan npm
- PostgreSQL v12+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/your-repo/RABA-master.git
cd RABA-master
```

### 2. Backend Setup
```cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env dan tambahkan:
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/raba_dev?schema=public"
JWT_SECRET="your_strong_secret_key_here"

# Setup database
npx prisma migrate dev --name initial

# Seed data (audio files)
npm run db:seed

# Start development server
npm run dev
# Server akan berjalan di http://localhost:8080
```

### Frontend Setup
```cd client

# Install dependencies
npm install

# Start development server
npm run dev
# Client akan berjalan di http://localhost:5173
```

### 📚 API Documentation
```Authentication Endpoints
Register User

POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "CHILD"  // CHILD, PARENT, TEACHER, ADMIN
}

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "CHILD"
}

Login User

POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "role": "CHILD",
  "userId": "uuid"
}

GET /audio

Response: [
  {
    "id": "uuid",
    "title": "Audio Title",
    "description": "Description",
    "audioUrl": "/uploads/audio/filename.mp3",
    "createdAt": "2024-01-15T10:00:00Z"
  }
]

GET /me/progress
Authorization: Bearer {token}

Response: [
  {
    "id": "uuid",
    "title": "Audio Title",
    "audioUrl": "/uploads/audio/filename.mp3",
    "openedAt": "2024-01-15T10:00:00Z" | null,
    "downloadedAt": "2024-01-15T11:00:00Z" | null
  }
]

POST /audio/mark-downloaded
Authorization: Bearer {token}
Content-Type: application/json

{
  "audioId": "uuid"
}

GET /teacher/children-progress
Authorization: Bearer {teacher_token}

Response:
{
  "totalAudio": 20,
  "children": [
    {
      "childId": "uuid",
      "fullName": "Student Name",
      "played": 15,
      "downloaded": 10,
      "progressPercent": 75
    }
  ]
}

GET /parent/children-progress
Authorization: Bearer {parent_token}

Response:
{
  "totalAudio": 20,
  "children": [
    {
      "childId": "uuid",
      "fullName": "Child Name",
      "played": 15,
      "downloaded": 10,
      "progressPercent": 75
    }
  ]
}

GET /teacher/all-students
Authorization: Bearer {teacher_token}

Response: [
  {
    "id": "uuid",
    "fullName": "Student Name"
  }
]
```