# 🚗 RentWheels — Vehicle Rental Platform

A full-stack vehicle rental management system built with **Spring Boot** and **React**.

**Live Demo:** [Frontend](https://rental-services-bhavy.vercel.app) | [API Docs](https://rentwheels-api-hp4w.onrender.com/swagger-ui.html)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 17, Spring Boot 3.3, Spring Data JPA, Hibernate |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Database** | MySQL 8 |
| **Deployment** | Docker (Render), Vercel |

## Features

### Customer
- Browse vehicle catalog with search & filters
- View vehicle details by type (Car, SUV, Bike, Sedan, Scooter, Van, Truck, Bus, Luxury)
- Book vehicles with time slots and customer details
- View & cancel bookings
- Real-time availability status

### Admin
- Dashboard with analytics (revenue, bookings by type, recent orders)
- CRUD operations for branches and vehicles
- Manage bookings — Complete or Cancel orders
- Vehicle availability tracking (Booked/Available status)

### Technical
- RESTful API with proper HTTP methods (GET, POST, PUT, DELETE)
- Global exception handling with meaningful error messages
- Swagger/OpenAPI documentation
- CORS configuration for cross-origin requests
- Responsive design (mobile + desktop)
- Docker containerization

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/branches` | Get all branches |
| POST | `/api/v1/branches` | Create a branch |
| PUT | `/api/v1/branches/{id}` | Update a branch |
| DELETE | `/api/v1/branches/{id}` | Delete a branch |
| GET | `/api/v1/vehicles` | Get all vehicles (with filters) |
| POST | `/api/v1/vehicles` | Add a vehicle |
| PUT | `/api/v1/vehicles/{id}` | Update a vehicle |
| DELETE | `/api/v1/vehicles/{id}` | Delete a vehicle + associated bookings |
| GET | `/api/v1/bookings` | Get all bookings |
| POST | `/api/v1/bookings` | Book a vehicle |
| PUT | `/api/v1/bookings/{id}/cancel` | Cancel a booking |
| PUT | `/api/v1/bookings/{id}/complete` | Complete a booking |
| GET | `/api/v1/dashboard/stats` | Get dashboard analytics |

## Run Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8

### Backend
```bash
cd rental
# Update src/main/resources/application.properties with your MySQL credentials
./mvnw spring-boot:run
# Runs on http://localhost:8090
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### Seed Demo Data
```bash
bash seed-data.sh
```

## Deployment

### 1. MySQL Database (Railway.app — Free)
1. Go to [railway.app](https://railway.app) → New Project → MySQL
2. Copy the connection details (host, port, user, password, database)

### 2. Backend (Render — Docker)
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `rental`
4. Set **Environment** to `Docker`
5. Add environment variables:
   - `DATABASE_URL` = `jdbc:mysql://HOST:PORT/DATABASE`
   - `DATABASE_USERNAME` = your Railway MySQL user
   - `DATABASE_PASSWORD` = your Railway MySQL password
   - `PORT` = `8090`

### 3. Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com) → Import Project
2. Set **Root Directory** to `frontend`
3. Framework: **Vite**
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com`

## Project Structure
```
├── rental/                    # Spring Boot Backend
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/rental/rental/
│       ├── config/            # CORS, Swagger
│       ├── controller/        # REST Controllers
│       ├── dao/               # JPA Repositories
│       ├── dto/               # Response DTOs
│       ├── entity/            # JPA Entities
│       ├── exception/         # Error Handling
│       └── service/           # Business Logic
│
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── api.js            # Axios API client
│   │   ├── App.jsx           # Routes
│   │   ├── components/       # Reusable components
│   │   ├── layouts/          # Customer & Admin layouts
│   │   └── pages/            # All pages
│   └── vercel.json
│
└── seed-data.sh              # Demo data script
```

## Author
Built as a full-stack demo project showcasing Spring Boot + React integration with Docker deployment.
