# Online Art Gallery - Full Stack Application

A complete full-stack Online Art Gallery application built with **Spring Boot** (Backend) and **React.js** (Frontend).

## 🎨 Features

### User Features
- Browse and search artworks
- View detailed artwork information
- Place orders for artworks
- Track order status
- Submit feedback/contact form
- User authentication (Login/Register)

### Admin Features
- Admin dashboard with statistics
- Manage artworks (CRUD operations)
- Manage orders (view and update status)
- View and manage customer feedback

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.5.8**
- **Java 21**
- **MySQL Database**
- **Spring Data JPA**
- **Maven**

### Frontend
- **React 19**
- **React Router DOM**
- **Axios** (for API calls)
- **Bootstrap 5**
- **Vite** (build tool)

## 📋 Prerequisites

Before running the project, ensure you have:

1. **Java 21** or higher
2. **Maven 3.6+**
3. **Node.js 16+** and **npm**
4. **MySQL 8.0+**
5. **Eclipse IDE** (for backend)
6. **VS Code** (for frontend)

## 🚀 Setup Instructions

### Step 1: Database Setup

1. **Start MySQL Server:**
   - Make sure MySQL is installed and running on your system
   - Default port: 3306

2. **Create Database (Optional - Auto-created if configured):**
   ```sql
   CREATE DATABASE IF NOT EXISTS art_gallery;
   ```

3. **Update Database Credentials:**
   - Open `Art_Gallery/src/main/resources/application.properties`
   - Update the following lines with your MySQL credentials:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
   - **Note:** The database will be auto-created if it doesn't exist (configured with `createDatabaseIfNotExist=true`)

### Step 2: Backend Setup

#### Option A: Using Eclipse IDE

1. **Import Project:**
   - Open Eclipse IDE
   - File → Import → Existing Maven Projects
   - Select the `Art_Gallery` folder
   - Click Finish

2. **Update Maven Dependencies:**
   - Right-click on project → Maven → Update Project
   - Check "Force Update of Snapshots/Releases"
   - Click OK and wait for dependencies to download

3. **Verify Configuration:**
   - Check `application.properties` - Port should be `8080`
   - Verify database credentials are correct

4. **Run the Application:**
   - Right-click on `ArtGalleryApplication.java`
   - Run As → Spring Boot App
   - Wait for "Started ArtGalleryApplication" message
   - Backend will be running on `http://localhost:8080`

#### Option B: Using Command Line (Maven)

1. **Navigate to Backend Directory:**
   ```bash
   cd Art_Gallery
   ```

2. **Build the Project:**
   ```bash
   mvn clean install
   ```

3. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Verify Backend is Running:**
   - Open browser: `http://localhost:8080`
   - You should see a Whitelabel Error Page (this is normal - means server is running)
   - Check console for "Started ArtGalleryApplication" message

### Step 3: Frontend Setup

1. **Navigate to Frontend Directory:**
   ```bash
   cd art-gallery-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   - If you encounter errors, delete `node_modules` and `package-lock.json`, then run `npm install` again

3. **Verify API Configuration:**
   - Check `src/utils/api.js` - Base URL should be `http://localhost:8080/api`

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   - Frontend will start on `http://localhost:5173`
   - The app will automatically open in your browser

### Step 4: Verify Everything is Working

1. **Check Backend:**
   - Backend API: `http://localhost:8080/api/artworks` (should return empty array or artworks)
   - Check console for any errors

2. **Check Frontend:**
   - Open `http://localhost:5173`
   - You should see the Art Gallery homepage
   - Try registering a new user

3. **Check Database Connection:**
   - If backend starts successfully, database connection is working
   - Tables will be auto-created on first run
   - Check MySQL to verify tables: `user`, `artwork`, `order`, `feedback`

## 🔌 API Endpoints

**Base URL:** `http://localhost:8080/api`

### Authentication
- `POST /api/users/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "customer" // or "admin"
  }
  ```
- `POST /api/users/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Users (CRUD)
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Artworks (CRUD)
- `GET /api/artworks` - Get all artworks
- `GET /api/artworks/{id}` - Get artwork by ID
- `POST /api/artworks` - Create artwork
  ```json
  {
    "title": "Sunset",
    "artist": "John Artist",
    "description": "Beautiful sunset painting",
    "price": 500.00,
    "imageUrl": "https://example.com/image.jpg",
    "category": "Painting"
  }
  ```
- `PUT /api/artworks/{id}` - Update artwork
- `DELETE /api/artworks/{id}` - Delete artwork

### Orders (CRUD)
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/orders/user/{userId}` - Get orders by user
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}` - Update order
- `PATCH /api/orders/{id}/status` - Update order status
  ```json
  {
    "status": "PENDING" // or "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"
  }
  ```
- `DELETE /api/orders/{id}` - Delete order

### Feedback (CRUD)
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/{id}` - Get feedback by ID
- `POST /api/feedback` - Submit feedback
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great artwork!"
  }
  ```
- `DELETE /api/feedback/{id}` - Delete feedback

## 🧪 Testing with Postman

> **Prerequisite:** Start backend (`mvn spring-boot:run`) so `http://localhost:8080` is reachable.

### 1. Register Customer (POST)
1. Open Postman → **New → HTTP Request**
2. Method: `POST`
3. URL: `http://localhost:8080/api/users/register`
4. Tab **Body → raw → JSON**
5. Payload example:
   ```json
   {
     "name": "Demo Customer",
     "email": "customer1@example.com",
     "password": "customer123"
   }
   ```
6. Click **Send** → Expect `201 Created` with user JSON (password omitted).

### 2. Login (POST)
1. Method: `POST`
2. URL: `http://localhost:8080/api/users/login`
3. Body (raw JSON):
   ```json
   {
     "email": "admin@gallery.com",
     "password": "admin@123"
   }
   ```
4. Click **Send** → Expect `200 OK`:
   ```json
   {
     "user": {
       "id": 1,
       "name": "Default Admin",
       "email": "admin@gallery.com",
       "role": "admin",
       "createdAt": "2025-11-28T10:00:00"
     },
     "token": "token_1",
     "role": "admin"
   }
   ```
5. Copy the `token` if you want to call protected endpoints later.

### 3. Get Users (GET)
1. Method: `GET`
2. URL: `http://localhost:8080/api/users`
3. Click **Send** → Expect list of users (password never returned).

### 4. Create Artwork (POST)
1. Method: `POST`
2. URL: `http://localhost:8080/api/artworks`
3. Body:
   ```json
   {
     "title": "Sunset Bliss",
     "artist": "A. Painter",
     "description": "Oil on canvas",
     "price": 8999.00,
     "imageUrl": "https://example.com/art.jpg",
     "category": "Painting"
   }
   ```
4. Click **Send** → Expect `201 Created`.

### 5. List Artworks (GET)
1. Method: `GET`
2. URL: `http://localhost:8080/api/artworks`
3. Click **Send** → Expect array of artworks.

> **Tip:** Save the requests into a Postman collection for repeated testing.

## 📁 Project Structure

```
Backend/
├── Art_Gallery/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/art_gallery/
│   │   │   │   ├── config/          # CORS configuration
│   │   │   │   ├── controller/     # REST controllers
│   │   │   │   ├── entity/         # JPA entities
│   │   │   │   ├── repository/     # Data repositories
│   │   │   │   ├── service/        # Service interfaces
│   │   │   │   └── serviceImpl/    # Service implementations
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml

art-gallery-frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── utils/          # API utilities
│   └── App.jsx         # Main app component
└── package.json
```

## 🔐 Default Credentials

The backend auto-creates the following account on startup if it does not exist:
- **Admin**: `admin@gallery.com` / `admin@123`

All other accounts should be registered via the UI or API and will always be created with the `customer` role.

## 🌐 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite default port)

If you change the frontend port, update:
- `Art_Gallery/src/main/java/com/art_gallery/config/CorsConfig.java`
- `Art_Gallery/src/main/java/com/art_gallery/controller/*.java` (CrossOrigin annotation)

## 🐛 Troubleshooting

### Backend Issues

#### Port 8080 Already in Use
**Error:** `Port 8080 is already in use`

**Solution:**
1. Find process using port 8080:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   # Kill the process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```
2. Or change port in `application.properties`:
   ```properties
   server.port=8081
   ```
   Then update frontend `api.js` to match the new port.

#### Database Connection Failed
**Error:** `Communications link failure` or `Access denied`

**Solutions:**
1. **Verify MySQL is running:**
   ```bash
   # Windows - Check Services
   services.msc
   # Look for MySQL service and ensure it's running
   ```

2. **Check database credentials in `application.properties`:**
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_actual_password
   ```

3. **Test MySQL connection:**
   ```bash
   mysql -u root -p
   # Enter password when prompted
   ```

4. **Create database manually if needed:**
   ```sql
   CREATE DATABASE art_gallery;
   ```

5. **Check MySQL port (default 3306):**
   - Verify MySQL is listening on port 3306
   - Update URL if using different port: `jdbc:mysql://localhost:3307/art_gallery`

#### Maven Build Fails
**Error:** `Maven build failed` or dependency errors

**Solutions:**
1. Clean and rebuild:
   ```bash
   cd Art_Gallery
   mvn clean install
   ```

2. Update Maven project in Eclipse:
   - Right-click project → Maven → Update Project
   - Check "Force Update"

3. Check Java version (should be 21):
   ```bash
   java -version
   ```

#### Application Won't Start
**Error:** `Application failed to start`

**Solutions:**
1. Check console for specific error messages
2. Verify all required dependencies in `pom.xml`
3. Ensure database is accessible
4. Check `application.properties` for syntax errors

### Frontend Issues

#### API Calls Failing
**Error:** `Network Error` or `CORS Error`

**Solutions:**
1. **Ensure backend is running:**
   - Check `http://localhost:8080` in browser
   - Verify backend console shows "Started ArtGalleryApplication"

2. **Check API base URL in `src/utils/api.js`:**
   ```javascript
   baseURL: "http://localhost:8080/api"
   ```

3. **Verify CORS configuration:**
   - Backend should allow `http://localhost:5173`
   - Check `CorsConfig.java` and controller `@CrossOrigin` annotations

#### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Backend CORS is already configured for `http://localhost:5173`
- If using different frontend port, update:
  - `CorsConfig.java`
  - All controller `@CrossOrigin` annotations
  - `application.properties` CORS settings

#### Dependencies Not Installing
**Error:** `npm install` fails

**Solutions:**
1. Delete and reinstall:
   ```bash
   cd art-gallery-frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Check Node.js version (should be 16+):
   ```bash
   node -v
   ```

#### Frontend Won't Start
**Error:** `Port 5173 already in use` or Vite errors

**Solutions:**
1. Kill process on port 5173 or use different port:
   ```bash
   npm run dev -- --port 5174
   ```

2. Update backend CORS to allow new port

### Database Issues

#### Tables Not Created
**Solution:**
- Check `application.properties` has:
  ```properties
  spring.jpa.hibernate.ddl-auto=update
  ```
- Restart backend application
- Check MySQL for tables: `SHOW TABLES;`

#### Data Not Persisting
**Solution:**
- Verify database connection is successful
- Check `spring.jpa.show-sql=true` to see SQL queries
- Ensure transactions are committed

## 📝 Notes

- The application uses JPA's `ddl-auto=update` which automatically creates/updates database tables
- Passwords are stored in plain text (for demo purposes). In production, use password hashing
- Image URLs should be provided as full URLs or relative paths to images
- The application includes basic error handling and validation

## 🎯 Quick Start Guide

### Complete Setup Steps (Summary)

1. **Start MySQL Server**
   - Ensure MySQL is running on port 3306

2. **Configure Database**
   - Update `Art_Gallery/src/main/resources/application.properties`
   - Set your MySQL username and password

3. **Start Backend**
   ```bash
   cd Art_Gallery
   mvn spring-boot:run
   ```
   Or use Eclipse: Right-click `ArtGalleryApplication.java` → Run As → Spring Boot App
   - Wait for "Started ArtGalleryApplication" message
   - Backend runs on `http://localhost:8080`

4. **Start Frontend**
   ```bash
   cd art-gallery-frontend
   npm install
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`

5. **Access Application**
   - Open browser: `http://localhost:5173`
   - Register a new user or login
   - Start exploring the Art Gallery!

### Testing CRUD Operations

1. **Test Artworks CRUD:**
   - Create: Add new artwork via admin panel
   - Read: View all artworks on gallery page
   - Update: Edit artwork details
   - Delete: Remove artwork

2. **Test Orders CRUD:**
   - Create: Place an order for an artwork
   - Read: View orders in "My Orders" page
   - Update: Change order status (admin)
   - Delete: Cancel/delete order

3. **Test Users CRUD:**
   - Create: Register new user
   - Read: View user profile
   - Update: Update user information
   - Delete: Remove user account

4. **Test Feedback CRUD:**
   - Create: Submit feedback/contact form
   - Read: View feedback (admin)
   - Delete: Remove feedback (admin)

## 📝 Important Notes

- **Port Configuration:** Backend runs on port **8080**, Frontend on port **5173**
- **Database:** MySQL database `art_gallery` will be auto-created if it doesn't exist
- **Tables:** Database tables are auto-created on first run (JPA `ddl-auto=update`)
- **CORS:** Backend is configured to accept requests from `http://localhost:5173`
- **API Base URL:** Frontend API is configured to call `http://localhost:8080/api`

## 📄 License

This project is for educational purposes.

---

**Happy Coding! 🎨**

