# PCForge — Custom PC Marketplace & Microservices Platform

> **"Build. Customize. Game."**

PCForge is a production-grade online gaming PC marketplace and custom PC builder platform engineered with an **API-First Microservices Architecture**.

---

## Technical Stack

- **Frontend**: React 18, Vite, HTML5, CSS3 (Glassmorphism + Futuristic Dark Theme), JavaScript (ES6+), Axios, Lucide Icons.
- **Backend**: Java 17 / Spring Boot 3.2, Spring Cloud (Eureka Server & API Gateway), Spring Security + JWT, Spring Data JPA / Hibernate, OpenFeign.
- **Database**: MySQL 8.x (Database-Per-Service pattern, 12 isolated service databases).
- **API Design**: API-First approach with OpenAPI 3.0 (Swagger) specifications located in `/docs/openapi/`.
- **Build & Tooling**: Apache Maven, Postman API Collection.

---

## Microservices Architecture & Port Mapping

| Service Name | Port | Database | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **API Gateway** | `8080` | Stateless | Central router, CORS policy & security filter |
| **Service Discovery** | `8761` | In-Memory | Netflix Eureka dynamic service registration |
| **Auth Service** | `8081` | `pcforge_auth_db` | JWT authentication, BCrypt hashing, roles |
| **User Service** | `8082` | `pcforge_user_db` | Customer profile management |
| **Product Service** | `8083` | `pcforge_product_db` | Hardware catalog search, pagination, filtering |
| **Category Service** | `8084` | `pcforge_category_db` | Hardware category registry |
| **Inventory Service** | `8085` | `pcforge_inventory_db` | Thread-safe stock locking (`409 CONFLICT` logic) |
| **Cart Service** | `8086` | `pcforge_cart_db` | Cart subtotal, GST & discount calculations |
| **Order Service** | `8087` | `pcforge_order_db` | Order state engine & inventory orchestration |
| **Payment Service** | `8088` | `pcforge_payment_db` | Sandbox QR countdown timer & payment providers |
| **Review Service** | `8089` | `pcforge_review_db` | User reviews and hardware star ratings |
| **Wishlist Service** | `8090` | `pcforge_wishlist_db` | Customer saved hardware wishlist |
| **PC Builder Service** | `8091` | `pcforge_pc_builder_db` | Component compatibility engine & FPS estimator |
| **Recommendation Service** | `8092` | Stateless | Budget & gaming tier component recommendations |
| **Notification Service** | `8093` | `pcforge_notification_db` | System notifications & stock alerts |
| **Admin Service** | `8094` | Aggregated Telemetry | Revenue analytics, sales charts, inventory manager |

---

## Core Business Rules & Thread Safety

### 1. Database-Backed Stock Isolation & Locking
- Stock reduction takes place directly in the backend `Inventory Service` database using `@Lock(LockModeType.PESSIMISTIC_WRITE)` to prevent race conditions during concurrent checkouts.
- If available stock is insufficient:
  - Returns `HTTP 409 CONFLICT` with `{ "success": false, "message": "Insufficient stock" }`.
- If payment fails:
  - Reservation is released (`POST /api/inventory/release`).
- If an order is cancelled:
  - Stock is restored to inventory (`POST /api/inventory/restore`).

### 2. PC Builder Compatibility Engine Algorithm
- Real-time physical and electrical validation:
  - **Socket Match**: CPU Socket vs Motherboard Socket (e.g. AM5 vs LGA1700)
  - **RAM Type Match**: RAM vs Motherboard Memory Support (e.g. DDR4 vs DDR5)
  - **Power Headroom**: Estimated Total Draw vs PSU Wattage (+ 150W safety margin)
- Live gaming FPS estimates for Cyberpunk 2077, Valorant, and Forza Horizon 5.

---

## Quick Start Guide

### 1. Database Initialization (MySQL 8.x)
Execute the master SQL script to create all 12 isolated databases and seed hardware data:
```bash
mysql -u root -p < docs/database/01-master-schema-and-seed.sql
```

### 2. Run Backend Microservices
```bash
cd backend

# Build parent pom and submodules
mvn clean install

# Launch Eureka Discovery Server
cd service-discovery
mvn spring-boot:run

# Launch API Gateway
cd ../api-gateway
mvn spring-boot:run

# Launch Domain Services as needed (Product, Inventory, Order, Payment, PC Builder, etc.)
cd ../product-service
mvn spring-boot:run
```

### 3. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

---

## Postman API Collection
Import `postman/PCForge-API-Collection.json` into Postman to test Auth, Product search, Inventory stock reservation, PC Builder compatibility engine, and Order creation endpoints.
