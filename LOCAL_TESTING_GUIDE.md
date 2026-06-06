# 🚀 Local Testing Guide - RABA API

## Status ✅

- ✅ Database schema created
- ✅ Migration applied (`20260224000000_add_esp32_models`)
- ✅ TypeScript build successful
- ✅ `.env` file configured
- ⏳ Ready to start dev server

## Quick Start

### 1. Start Development Server

```bash
cd server
npm run dev
```

Server akan jalan di: **http://localhost:8080**

Jika berhasil akan melihat:
```
[timestamp] Server is running on http://localhost:8080
```

### 2. Test dengan Postman

#### Import Collection
1. Buka Postman
2. Import file: `RABA_API_Postman.postman_collection.json`
3. Set variable `BASE_URL` = `http://localhost:8080`

#### Test Sequence (Recommended Order)

**✏️ Test 1: Device Status Event**
```
POST http://localhost:8080/event
Body:
{
  "device_id": "RABA_001",
  "event": "status",
  "data": {
    "wifi_rssi": -44,
    "theme": "Alat makan",
    "in_game": false,
    "uptime_sec": 6
  }
}
```
Expected: `{ "success": true, "event": "status", "message": "Device status updated" }`

---

**✏️ Test 2: Check Device Status**
```
GET http://localhost:8080/device/status/RABA_001
```
Expected: Device info dengan `isOnline: true`, `wifiRssi: -44`, `theme: "Alat makan"`

---

**✏️ Test 3: Game Start Event**
```
POST http://localhost:8080/event
Body:
{
  "device_id": "RABA_001",
  "event": "game_start",
  "data": {
    "theme": "Alat makan",
    "total_steps": 9
  }
}
```
Expected: `{ "success": true, "event": "game_start", "message": "Game session started", "gameSessionId": "..." }`

---

**✏️ Test 4: Get Active Session**
```
GET http://localhost:8080/device/RABA_001/active-session
```
Expected: Game session yang sedang berjalan dengan `isCompleted: false`, `totalSteps: 9`

---

**✏️ Test 5: Sensor Hit Event (Kirim 3-5 kali)**
```
POST http://localhost:8080/event
Body:
{
  "device_id": "RABA_001",
  "event": "sensor_hit",
  "data": {
    "sensor": 3,
    "correct": true,
    "step": "1/9",
    "theme": "Alat makan"
  }
}
```
(Ubah `step` jadi "2/9", "3/9", dst untuk setiap hit)

---

**✏️ Test 6: Game Complete Event**
```
POST http://localhost:8080/event
Body:
{
  "device_id": "RABA_001",
  "event": "game_complete",
  "data": {
    "theme": "Alat makan",
    "duration_sec": 120,
    "total_steps": 9
  }
}
```
Expected: `{ "success": true, "message": "Game session completed", "durationSec": 120 }`

---

**✏️ Test 7: Check Game Statistics**
```
GET http://localhost:8080/device/statistics/RABA_001
```
Expected: 
```json
{
  "device": { ... },
  "statistics": {
    "totalGamesCompleted": 1,
    "averageDuration": 120,
    "recentSessions": [...]
  }
}
```

---

## Database Tables Created

### esp32_devices
- `deviceId` (unique): RABA_001, RABA_002, etc.
- `isOnline`: true/false
- `wifiRssi`: -120 to 0
- `theme`: Current game theme
- `uptimeSec`: Device uptime in seconds
- `lastSeen`: Last communication time

### esp32_events
- `deviceId`: Reference to device
- `eventType`: status | game_start | sensor_hit | game_complete
- `payload`: Full JSON payload (for audit trail)

### game_sessions
- `deviceId`: Which device
- `theme`: Game theme
- `totalSteps`: Target steps
- `completedSteps`: Steps completed
- `isCompleted`: Session status
- `durationSec`: Game duration (only when completed)

### sensor_hits
- `gameSessionId`: Reference to session
- `sensorNumber`: 1-16
- `isCorrect`: true/false
- `step`: "X/Y" format

## Validation Rules

All events are validated with Zod. Invalid payloads return 400 with detailed errors.

### Device ID Format
- Must be: `RABA_XXX` (RABA_ followed by 3 digits)
- Examples: `RABA_001`, `RABA_999`

### WiFi RSSI
- Range: -120 to 0 (dBm)
- Typical: -30 to -90

### Step Format
- Must be: `X/Y` (e.g., "4/9", "1/10")

### Sensor Number
- Range: 1 to 16

## Troubleshooting

### 🔴 Connection Error
```bash
# Check if server is running on port 8080
netstat -ano | findstr :8080

# If port is in use, kill it (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or use different port in env
PORT=3000 npm run dev
```

### 🔴 Database Connection Error
- Check `.env` DATABASE_URL is correct
- Verify PostgreSQL is running
- Check connection string: `postgresql://postgres:123@localhost:5432/raba_dev`

### 🔴 Validation Error
- Check payload format matches examples
- Device ID must be `RABA_XXX` format
- WiFi RSSI must be between -120 and 0
- Step must be "X/Y" format

### 🔴 404 Errors
- Make sure device exists (send status event first)
- Make sure game session exists (send game_start first)

## Monitoring

Check server logs for:
- `[timestamp] Server is running...` → Server started
- `Applying migration...` → Database migrations running
- Error messages for debugging

## Next Steps After Local Testing

1. ✅ Test all 7 endpoints locally
2. ✅ Verify database data in PostgreSQL
3. ✅ Commit changes to GitHub
4. ✅ Deploy to Vercel
5. ✅ Update Postman BASE_URL to production domain
6. ✅ Test against live server

## Database Query Examples

### Check all devices
```sql
SELECT * FROM esp32_devices;
```

### Check game history for a device
```sql
SELECT * FROM game_sessions WHERE "deviceId" = 'RABA_001' ORDER BY "startedAt" DESC;
```

### Check sensor hits for a session
```sql
SELECT * FROM sensor_hits WHERE "gameSessionId" = '<session_id>' ORDER BY "createdAt";
```

### Check event logs
```sql
SELECT * FROM esp32_events WHERE "deviceId" = 'RABA_001' ORDER BY "createdAt" DESC;
```

---

**Happy Testing!** 🎉 Setelah sukses di local, siap deploy ke Vercel!
