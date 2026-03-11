# Quick Setup Guide - Art Gallery Project

## 🚀 Quick Start (5 Steps)

### Step 1: Start MySQL
- Ensure MySQL Server is running
- Default port: 3306
- Default username: root
- Update password in `application.properties` if different

### Step 2: Configure Database
Edit `Art_Gallery/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Start Backend
**Option A - Using Eclipse:**
1. Open Eclipse
2. Import `Art_Gallery` as Maven Project
3. Right-click `ArtGalleryApplication.java`
4. Run As → Spring Boot App
5. Wait for: "Started ArtGalleryApplication"

**Option B - Using Command Line:**
```bash
cd Art_Gallery
mvn spring-boot:run
```

**Verify Backend:**
- Open: http://localhost:8080
- Should see error page (server is running)
- Check console: "Started ArtGalleryApplication"

### Step 4: Start Frontend
```bash
cd art-gallery-frontend
npm install
npm run dev
```

**Verify Frontend:**
- Opens automatically at: http://localhost:5173
- Should see Art Gallery homepage

### Step 5: Test the Application
1. Open http://localhost:5173
2. Click "Register" to create account
3. Login with your credentials
4. Browse artworks, place orders, etc.

## ✅ Verification Checklist

- [ ] MySQL is running
- [ ] Database credentials updated in `application.properties`
- [ ] Backend starts without errors (port 8080)
- [ ] Frontend starts without errors (port 5173)
- [ ] Can access http://localhost:5173
- [ ] Can register/login
- [ ] Database tables created (check MySQL)

## 🔧 Common Issues & Fixes

### Backend Port Error
**Problem:** Port 8080 already in use
**Fix:** 
- Kill process: `netstat -ano | findstr :8080` then `taskkill /PID <PID> /F`
- Or change port in `application.properties` to 8081

### Database Connection Error
**Problem:** Cannot connect to MySQL
**Fix:**
1. Verify MySQL is running
2. Check username/password in `application.properties`
3. Test connection: `mysql -u root -p`
4. Create database: `CREATE DATABASE art_gallery;`

### Frontend API Error
**Problem:** API calls failing
**Fix:**
1. Ensure backend is running on port 8080
2. Check `art-gallery-frontend/src/utils/api.js` has correct URL
3. Verify CORS is configured

### CORS Error
**Problem:** CORS policy blocking requests
**Fix:**
- Backend already configured for `http://localhost:5173`
- If using different port, update `CorsConfig.java` and controllers

## 📊 API Endpoints

**Base URL:** `http://localhost:8080/api`

- **Users:** `/api/users` (GET, POST, PUT, DELETE)
- **Register:** `/api/users/register` (POST)
- **Login:** `/api/users/login` (POST)
- **Artworks:** `/api/artworks` (GET, POST, PUT, DELETE)
- **Orders:** `/api/orders` (GET, POST, PUT, DELETE)
- **Feedback:** `/api/feedback` (GET, POST, DELETE)

## 🎯 Next Steps After Setup

1. Register as admin user (set role to "admin")
2. Add some artworks via admin panel
3. Register as regular user
4. Browse artworks and place orders
5. Test all CRUD operations

---

**Need Help?** Check the main `README.md` for detailed troubleshooting guide.

