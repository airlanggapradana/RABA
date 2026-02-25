# 🚀 RABA API - Deployment & Testing Guide

## Pre-Deployment Checklist

### 1. Database Setup
- [x] Prisma schema updated with ESP32 models
- [x] Migration file created: `20260224000000_add_esp32_models`
- [x] Prisma client configured for serverless (singleton pattern)

### 2. Environment Variables (Set in Vercel Dashboard)
Required variables:
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### 3. Vercel Configuration
- [x] `vercel.json` properly configured
- [x] Build script: `npm run vercel-build` (generates Prisma client + TypeScript compilation)
- [x] Builds include Prisma migration

### 4. Local Testing Before Deploy

```bash
# 1. Install dependencies
cd server
npm install

# 2. Setup .env file with DATABASE_URL
# Copy from .env.example and update with actual PostgreSQL connection string

# 3. Run database migration
npm run db:migrate

# 4. Start development server
npm run dev
```

## ESP32 Event Endpoints

All endpoints accept JSON payloads from ESP32. No authentication required for `/event` endpoint.

### POST /event
Main endpoint for receiving all ESP32 events.

**Valid Event Types:**
1. `status` - Sent every 60s + on boot
2. `game_start` - When child starts playing
3. `sensor_hit` - When sensor is stepped on
4. `game_complete` - When quest is completed

### GET /device/status/:deviceId
Get current device status (online/offline, signal strength, theme, uptime)

### GET /device/statistics/:deviceId
Get device game history and statistics (total games, average duration, recent sessions)

### GET /device/:deviceId/active-session
Get current active game session with sensor hit details

## Testing with Postman

### Setup
1. Import `RABA_API_Postman.postman_collection.json` dalam Postman
2. Set variable `{{BASE_URL}}`:
   - Local: `http://localhost:8080`
   - Production: `https://your-vercel-domain.vercel.app`

### Test Flow (Recommended Order)
1. **Device Status Event** - Send device status
2. **Get Device Status** - Verify status was updated
3. **Game Start Event** - Start a game
4. **Get Active Session** - Verify session created
5. **Sensor Hit Event** - Simulate sensor press (multiple times)
6. **Game Complete Event** - End the game
7. **Get Statistics** - See game history

## Payload Validation

All payloads are validated using Zod schema. Invalid payloads return 400 with detailed errors.

### Status Event Validation
```json
{
  "device_id": "RABA_XXX",  // Format: RABA_ followed by 3 digits
  "event": "status",
  "data": {
    "wifi_rssi": -120 to 0,  // WiFi signal strength (dBm)
    "theme": "string or null",
    "in_game": boolean,
    "uptime_sec": integer >= 0
  }
}
```

### Game Start Validation
```json
{
  "device_id": "RABA_XXX",
  "event": "game_start",
  "data": {
    "theme": "string",
    "total_steps": integer >= 1
  }
}
```

### Sensor Hit Validation
```json
{
  "device_id": "RABA_XXX",
  "event": "sensor_hit",
  "data": {
    "sensor": 1-16,
    "correct": boolean,
    "step": "X/Y" format,
    "theme": "string"
  }
}
```

### Game Complete Validation
```json
{
  "device_id": "RABA_XXX",
  "event": "game_complete",
  "data": {
    "theme": "string",
    "duration_sec": integer >= 0,
    "total_steps": integer >= 1
  }
}
```

## Database Models

### ESP32Device
Tracks device status and metadata
- `deviceId` (unique): RABA_001, RABA_002, etc.
- `theme`: Current theme
- `wifiRssi`: WiFi signal strength
- `isOnline`: Online status
- `lastSeen`: Last communication timestamp
- `uptimeSec`: Device uptime

### ESP32Event
Logs all incoming events
- `deviceId`: Reference to ESP32Device
- `eventType`: status | game_start | sensor_hit | game_complete
- `payload`: Full JSON payload stored for audit

### GameSession
Tracks each game session
- `deviceId`: Which device
- `theme`: Game theme
- `totalSteps`: Target steps
- `completedSteps`: Steps completed
- `startedAt`: Game start time
- `completedAt`: Game end time
- `durationSec`: Total duration
- `isCompleted`: Session status

### SensorHit
Records each sensor press
- `gameSessionId`: Reference to GameSession
- `sensorNumber`: 1-16
- `isCorrect`: Was it the right sensor?
- `step`: Step indicator (e.g., "4/9")

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add ESP32 event API and database models"
git push
```

### 2. Deploy to Vercel
Option A: Via Vercel Dashboard
- Connect GitHub repository
- Select root folder
- Add environment variables
- Deploy

Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

### 3. Post-Deployment
- Set environment variables in Vercel dashboard
- Run migrations (Vercel will auto-run with `vercel-build` script)
- Test endpoints with Postman using production URL

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL in Vercel environment variables
- Ensure PostgreSQL server accepts connections from Vercel IPs
- Verify SSL mode is enabled (`?sslmode=require`)

### Prisma Generate Error
- Ensure `vercel-build` script runs: `npx prisma generate && npm run build`
- Check that `.env` has DATABASE_URL during build

### CORS Error
- CORS is enabled for all origins in production
- Check that requests include proper headers

### Validation Error
- Check Postman payload format matches examples
- Verify device_id is in format `RABA_XXX`
- Check wifi_rssi is between -120 and 0

## Monitoring & Logs

In Vercel dashboard:
1. Go to project settings
2. View function logs
3. Monitor ESP32 events in real-time
4. Check error rates and response times

## Performance Optimization

### Already Implemented
- ✅ Prisma Client singleton (prevents connection pool exhaustion)
- ✅ Database indexes on frequently queried columns
- ✅ Pagination ready for game_sessions queries
- ✅ JSON payload stored for audit trail

### Future Improvements
- Add rate limiting for `/event` endpoint
- Implement WebSocket for real-time dashboard updates
- Add caching for device statistics
- Archive old game sessions to separate table

## API Response Examples

### Success Response
```json
{
  "success": true,
  "event": "status",
  "message": "Device status updated"
}
```

### Error Response
```json
{
  "error": "Invalid event payload",
  "details": [
    "data.wifi_rssi: Number must be greater than or equal to -120"
  ]
}
```

## Support & Issues

If you encounter issues:
1. Check logs in Vercel dashboard
2. Verify environment variables are set
3. Test with Postman collection first
4. Review validation schemas in `src/utils/esp32-validation.ts`
