# Online---Art---Gallary
A complete full-stack Online Art Gallery application built with Spring Boot (Backend) and React.js (Frontend).


🎨 Features
User Features
Browse and search artworks
View detailed artwork information
Place orders for artworks
Track order status
Submit feedback/contact form
User authentication (Login/Register)
Admin Features
Admin dashboard with statistics
Manage artworks (CRUD operations)
Manage orders (view and update status)
View and manage customer feedback
🛠️ Technology Stack
Backend
Spring Boot 3.5.8
Java 21
MySQL Database
Spring Data JPA
Maven
Frontend
React 19
React Router DOM
Axios (for API calls)
Bootstrap 5
Vite (build tool)
📋 Prerequisites
Before running the project, ensure you have:

Java 21 or higher
Maven 3.6+
Node.js 16+ and npm
MySQL 8.0+
Eclipse IDE (for backend)
VS Code (for frontend)
🚀 Setup Instructions
Step 1: Database Setup
Start MySQL Server:

Make sure MySQL is installed and running on your system
Default port: 3306
Create Database (Optional - Auto-created if configured):

CREATE DATABASE IF NOT EXISTS art_gallery;
Update Database Credentials:

Open Art_Gallery/src/main/resources/application.properties
Update the following lines with your MySQL credentials:
spring.datasource.username=root
spring.datasource.password=your_mysql_password
Note: The database will be auto-created if it doesn't exist (configured with createDatabaseIfNotExist=true)
Step 2: Backend Setup
Option A: Using Eclipse IDE
Import Project:

Open Eclipse IDE
File → Import → Existing Maven Projects
Select the Art_Gallery folder
Click Finish
Update Maven Dependencies:

Right-click on project → Maven → Update Project
Check "Force Update of Snapshots/Releases"
Click OK and wait for dependencies to download
Verify Configuration:

Check application.properties - Port should be 8080
Verify database credentials are correct
Run the Application:

Right-click on ArtGalleryApplication.java
Run As → Spring Boot App
Wait for "Started ArtGalleryApplication" message
Backend will be running on http://localhost:8080
Option B: Using Command Line (Maven)
Navigate to Backend Directory:

cd Art_Gallery
Build the Project:

mvn clean install
Run the Application:

mvn spring-boot:run
Verify Backend is Running:

Open browser: http://localhost:8080
You should see a Whitelabel Error Page (this is normal - means server is running)
Check console for "Started ArtGalleryApplication" message
Step 3: Frontend Setup
Navigate to Frontend Directory:

cd art-gallery-frontend
Install Dependencies:

npm install
If you encounter errors, delete node_modules and package-lock.json, then run npm install again
Verify API Configuration:

Check src/utils/api.js - Base URL should be http://localhost:8080/api
Run the Development Server:

npm run dev
Frontend will start on http://localhost:5173
The app will automatically open in your browser
Step 4: Verify Everything is Working
Check Backend:

Backend API: http://localhost:8080/api/artworks (should return empty array or artworks)
Check console for any errors
Check Frontend:

Open http://localhost:5173
You should see the Art Gallery homepage
Try registering a new user
Check Database Connection:

If backend starts successfully, database connection is working
Tables will be auto-created on first run
Check MySQL to verify tables: user, artwork, order, feedback
🔌 API Endpoints
Base URL: http://localhost:8080/api

Authentication
POST /api/users/register - Register new user
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer" // or "admin"
}
POST /api/users/login - User login
{
  "email": "john@example.com",
  "password": "password123"
}
Users (CRUD)
GET /api/users - Get all users
GET /api/users/{id} - Get user by ID
POST /api/users - Create user
PUT /api/users/{id} - Update user
DELETE /api/users/{id} - Delete user
Artworks (CRUD)
GET /api/artworks - Get all artworks
GET /api/artworks/{id} - Get artwork by ID
POST /api/artworks - Create artwork
{
  "title": "Sunset",
  "artist": "John Artist",
  "description": "Beautiful sunset painting",
  "price": 500.00,
  "imageUrl": "https://example.com/image.jpg",
  "category": "Painting"
}
PUT /api/artworks/{id} - Update artwork
DELETE /api/artworks/{id} - Delete artwork
Orders (CRUD)
GET /api/orders - Get all orders
GET /api/orders/{id} - Get order by ID
GET /api/orders/user/{userId} - Get orders by user
POST /api/orders - Create order
PUT /api/orders/{id} - Update order
PATCH /api/orders/{id}/status - Update order status
{
  "status": "PENDING" // or "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"
}
DELETE /api/orders/{id} - Delete order
Feedback (CRUD)
GET /api/feedback - Get all feedback
GET /api/feedback/{id} - Get feedback by ID
POST /api/feedback - Submit feedback
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great artwork!"
}
DELETE /api/feedback/{id} - Delete feedback
🧪 Testing with Postman
Prerequisite: Start backend (mvn spring-boot:run) so http://localhost:8080 is reachable.

1. Register Customer (POST)
Open Postman → New → HTTP Request
Method: POST
URL: http://localhost:8080/api/users/register
Tab Body → raw → JSON
Payload example:
{
  "name": "Demo Customer",
  "email": "customer1@example.com",
  "password": "customer123"
}
Click Send → Expect 201 Created with user JSON (password omitted).
2. Login (POST)
Method: POST
URL: http://localhost:8080/api/users/login
Body (raw JSON):
{
  "email": "admin@gallery.com",
  "password": "admin@123"
}
Click Send → Expect 200 OK:
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
Copy the token if you want to call protected endpoints later.
3. Get Users (GET)
Method: GET
URL: http://localhost:8080/api/users
Click Send → Expect list of users (password never returned).
4. Create Artwork (POST)
Method: POST
URL: http://localhost:8080/api/artworks
Body:
{
  "title": "Sunset Bliss",
  "artist": "A. Painter",
  "description": "Oil on canvas",
  "price": 8999.00,
  "imageUrl": "https://example.com/art.jpg",
  "category": "Painting"
}
Click Send → Expect 201 Created.
5. List Artworks (GET)
Method: GET
URL: http://localhost:8080/api/artworks
Click Send → Expect array of artworks.
Tip: Save the requests into a Postman collection for repeated testing.

📁 Project Structure
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
🔐 Default Credentials
The backend auto-creates the following account on startup if it does not exist:

Admin: admin@gallery.com / admin@123
All other accounts should be registered via the UI or API and will always be created with the customer role.

🌐 CORS Configuration
The backend is configured to accept requests from:

http://localhost:5173 (Vite default port)
If you change the frontend port, update:

Art_Gallery/src/main/java/com/art_gallery/config/CorsConfig.java
Art_Gallery/src/main/java/com/art_gallery/controller/*.java (CrossOrigin annotation)
🐛 Troubleshooting
Backend Issues
Port 8080 Already in Use
Error: Port 8080 is already in use

Solution:

Find process using port 8080:
# Windows
netstat -ano | findstr :8080
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
Or change port in application.properties:
server.port=8081
Then update frontend api.js to match the new port.
Database Connection Failed
Error: Communications link failure or Access denied

Solutions:

Verify MySQL is running:

# Windows - Check Services
services.msc
# Look for MySQL service and ensure it's running
Check database credentials in application.properties:

spring.datasource.username=root
spring.datasource.password=your_actual_password
Test MySQL connection:

mysql -u root -p
# Enter password when prompted
Create database manually if needed:

CREATE DATABASE art_gallery;
Check MySQL port (default 3306):

Verify MySQL is listening on port 3306
Update URL if using different port: jdbc:mysql://localhost:3307/art_gallery
Maven Build Fails
Error: Maven build failed or dependency errors

Solutions:

Clean and rebuild:

cd Art_Gallery
mvn clean install
Update Maven project in Eclipse:

Right-click project → Maven → Update Project
Check "Force Update"
Check Java version (should be 21):

java -version
Application Won't Start
Error: Application failed to start

Solutions:

Check console for specific error messages
Verify all required dependencies in pom.xml
Ensure database is accessible
Check application.properties for syntax errors
Frontend Issues
API Calls Failing
Error: Network Error or CORS Error

Solutions:

Ensure backend is running:

Check http://localhost:8080 in browser
Verify backend console shows "Started ArtGalleryApplication"
Check API base URL in src/utils/api.js:

baseURL: "http://localhost:8080/api"
Verify CORS configuration:

Backend should allow http://localhost:5173
Check CorsConfig.java and controller @CrossOrigin annotations
CORS Errors
Error: Access to XMLHttpRequest has been blocked by CORS policy

Solution:

Backend CORS is already configured for http://localhost:5173
If using different frontend port, update:
CorsConfig.java
All controller @CrossOrigin annotations
application.properties CORS settings
Dependencies Not Installing
Error: npm install fails

Solutions:

Delete and reinstall:

cd art-gallery-frontend
rm -rf node_modules package-lock.json
npm install
Clear npm cache:

npm cache clean --force
npm install
Check Node.js version (should be 16+):

node -v
Frontend Won't Start
Error: Port 5173 already in use or Vite errors

Solutions:

Kill process on port 5173 or use different port:

npm run dev -- --port 5174
Update backend CORS to allow new port

Database Issues
Tables Not Created
Solution:

Check application.properties has:
spring.jpa.hibernate.ddl-auto=update
Restart backend application
Check MySQL for tables: SHOW TABLES;
Data Not Persisting
Solution:

Verify database connection is successful
Check spring.jpa.show-sql=true to see SQL queries
Ensure transactions are committed
📝 Notes
The application uses JPA's ddl-auto=update which automatically creates/updates database tables
Passwords are stored in plain text (for demo purposes). In production, use password hashing
Image URLs should be provided as full URLs or relative paths to images
The application includes basic error handling and validation
🎯 Quick Start Guide
Complete Setup Steps (Summary)
Start MySQL Server

Ensure MySQL is running on port 3306
Configure Database

Update Art_Gallery/src/main/resources/application.properties
Set your MySQL username and password
Start Backend

cd Art_Gallery
mvn spring-boot:run
Or use Eclipse: Right-click ArtGalleryApplication.java → Run As → Spring Boot App

Wait for "Started ArtGalleryApplication" message
Backend runs on http://localhost:8080
Start Frontend

cd art-gallery-frontend
npm install
npm run dev
Frontend runs on http://localhost:5173
Access Application

Open browser: http://localhost:5173
Register a new user or login
Start exploring the Art Gallery!
Testing CRUD Operations
Test Artworks CRUD:

Create: Add new artwork via admin panel
Read: View all artworks on gallery page
Update: Edit artwork details
Delete: Remove artwork
Test Orders CRUD:

Create: Place an order for an artwork
Read: View orders in "My Orders" page
Update: Change order status (admin)
Delete: Cancel/delete order
Test Users CRUD:

Create: Register new user
Read: View user profile
Update: Update user information
Delete: Remove user account
Test Feedback CRUD:

Create: Submit feedback/contact form
Read: View feedback (admin)
Delete: Remove feedback (admin)
📝 Important Notes
Port Configuration: Backend runs on port 8080, Frontend on port 5173
Database: MySQL database art_gallery will be auto-created if it doesn't exist
Tables: Database tables are auto-created on first run (JPA ddl-auto=update)
CORS: Backend is configured to accept requests from http://localhost:5173
API Base URL: Frontend API is configured to call http://localhost:8080/api
📄 License
This project is for educational purposes.

Happy Coding! 🎨
