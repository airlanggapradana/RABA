# RABA Server

Backend API untuk aplikasi RABA (Reading and Basic Audio).

## Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon DB)
- Cloudinary (File Storage)
- JWT Authentication

## Environment Variables

Buat file `.env` dengan konfigurasi berikut (lihat `.env.example`):

```env
DATABASE_URL=postgresql://your_user:your_password@your_host/your_database?sslmode=require
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

## Development

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:8080`

## Build & Production

```bash
# Build
npm run build

# Start production server
node dist/src/server.js
```

## Deployment ke Vercel

### 1. Install Vercel CLI (optional)

```bash
npm install -g vercel
```

### 2. Set Environment Variables di Vercel Dashboard

Buka Vercel Dashboard → Project Settings → Environment Variables, lalu tambahkan:

- `DATABASE_URL` - PostgreSQL connection string dari Neon DB
- `JWT_SECRET` - Secret key untuk JWT
- `CLOUDINARY_CLOUD_NAME` - Nama cloud Cloudinary
- `CLOUDINARY_API_KEY` - API key Cloudinary
- `CLOUDINARY_API_SECRET` - API secret Cloudinary
- `NODE_ENV` - Set ke `production`

### 3. Deploy

```bash
# Push code ke Git repository
git add .
git commit -m "Ready for deployment"
git push

# Deploy via Vercel (otomatis jika sudah linked dengan Git)
# atau gunakan CLI:
vercel --prod
```

### Troubleshooting Deployment

#### Error: ENOENT: no such file or directory, mkdir

**Penyebab**: Vercel serverless functions tidak memiliki akses write ke file system kecuali `/tmp`.

**Solusi**: ✅ Sudah diperbaiki - File upload sekarang langsung ke Cloudinary menggunakan buffer, tanpa menyimpan ke
disk.

#### Error 500: Missing Cloudinary environment variables

**Penyebab**: Environment variables tidak di-set di Vercel.

**Solusi**:

1. Buka Vercel Dashboard
2. Pilih project Anda
3. Settings → Environment Variables
4. Tambahkan semua environment variables yang diperlukan

#### Error: Prisma Client not generated

**Penyebab**: Prisma Client belum di-generate saat build.

**Solusi**: ✅ Sudah ada di `vercel-build` script:

```json
"vercel-build": "npx prisma generate && npm run build"
```

## API Endpoints

### Authentication

- `POST /auth/register` - Register user baru
- `POST /auth/login` - Login user

### Media (Teacher only)

- `POST /teacher/upload-audio` - Upload file audio
- `POST /teacher/upload-image` - Upload gambar
- `GET /images` - Get semua gambar
- `DELETE /audio/:audioId` - Delete audio
- `DELETE /images/:imageId` - Delete gambar

### Audio

- `GET /audio` - Get semua audio files
- `POST /audio/mark-opened` - Tandai audio sebagai dibuka
- `POST /audio/mark-downloaded` - Tandai audio sebagai didownload

### Teacher

- `POST /teacher/assign-audio` - Assign audio ke student
- `POST /teacher/remove-assignment` - Remove assignment
- `GET /teacher/all-students` - Get semua students
- `GET /teacher/assignments` - Get assignments
- `GET /teacher/parent-links` - Get parent links
- `POST /teacher/link-parent-to-student` - Link parent ke student
- `DELETE /teacher/parent-links/:linkId` - Delete parent link
- `GET /teacher/all-parents` - Get semua parents
- `GET /teacher/children-progress` - Get progress semua children

### Parent

- `POST /parent/link-child` - Link child
- `GET /parent/children-progress` - Get progress children

### Child

- `GET /child/token` - Get token untuk ESP32
- `GET /me/progress` - Get progress sendiri

## File Upload

File upload menggunakan `express-fileupload` dan langsung di-upload ke Cloudinary:

- **Audio files**: Maksimal 50MB, disimpan di folder `raba/audio`
- **Image files**: Maksimal 50MB, disimpan di folder `raba/images`

Semua file disimpan di Cloudinary, tidak ada file local storage.

## Database

Menggunakan PostgreSQL di Neon DB. Prisma schema ada di `prisma/schema.prisma`.

### Migrations

```bash
# Create new migration
npm run db:migrate

# Pull schema from database
npm run db:pull

# Push schema to database (tidak disarankan untuk production)
npm run db:push
```
