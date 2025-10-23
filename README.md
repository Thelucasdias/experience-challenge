# Experiences API

This project is a RESTful API built with **NestJS**, **Prisma**, **PostgreSQL**, and **Docker**.  
It was developed as a technical challenge and includes complete CRUD operations, soft delete and restore logic, relational booking transactions, seeding, automated tests, and full API documentation using Swagger.

---

## Overview

The **Experiences API** allows users to manage experiences (like tours, trips, and activities) and related bookings.  
It demonstrates clean architecture, separation of concerns, transaction safety, and testable code using NestJS best practices.

---

## Main Technologies

- **NestJS** – Progressive Node.js framework for building efficient and scalable server-side applications
- **Prisma ORM** – Modern TypeScript ORM with schema-based migrations
- **PostgreSQL** – Relational database engine
- **Docker** – Containerized development and deployment
- **Jest & Supertest** – Unit and end-to-end testing
- **Swagger** – Auto-generated API documentation

---

## Project Structure

```bash
.
├── src
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── database/
│   │   └── prisma.service.ts
│   ├── experiences/
│   │   ├── dto/
│   │   │   ├── create-experience.dto.ts
│   │   │   ├── update-experience.dto.ts
│   │   │   └── pagination-query.dto.ts
│   │   ├── experiences.controller.ts
│   │   ├── experiences.service.ts
│   │   ├── experiences.repository.ts
│   │   └── experiences.module.ts
│   ├── bookings/
│   │   ├── dto/
│   │   │   └── create-booking.dto.ts
│   │   ├── bookings.controller.ts
│   │   ├── bookings.service.ts
│   │   ├── bookings.repository.ts
│   │   └── bookings.module.ts
│   └── common/
│       ├── filters/
│       │   └── http-exception.filter.ts
│       └── interceptors/
│           └── response.interceptor.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md


*Running the Project with Docker*

1. Build and start the containers
docker-compose down -v
docker-compose build
docker-compose up -d

2. Apply database migrations and seeds
docker-compose exec api npx prisma migrate deploy
docker-compose exec api npx prisma db seed

3. Access the application

API: http://localhost:3000

Swagger Docs: http://localhost:3000/api

Prisma Studio: http://localhost:5555

*Database Seeding*

Seeds are used to populate the database with initial data for testing and demonstration.

Run:

docker-compose exec api npx prisma db seed


Example seeded data:

Wine Tour — Serra Gaúcha

Mountain Trail — Itatiaia National Park

Hot Air Balloon Ride — Boituva, SP

*Core Features*

-Experiences-

Create, list, update, and delete experiences

Filtering by location, price range, and search query

Pagination support (limit, offset)

Soft delete and restore using the deletedAt field

Optional inclusion of deleted records (includeDeleted=true)

-Bookings-

Create bookings linked to specific experiences

Ensures transaction safety and decrements available slots

Prevents booking on deleted or sold-out experiences

Soft delete and restore support

*Testing*

Run unit and end-to-end tests
docker-compose exec api npm run test
docker-compose exec api npm run test:e2e


The main E2E test file is located at:
/test/app.e2e-spec.ts — it validates the core /experiences routes.

*Package Scripts*

"scripts": {
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main.js",
  "build": "nest build",
  "test": "jest",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "lint": "eslint . --ext .ts",
  "seed": "npx prisma db seed"
}

*API Endpoints*

Method	Route	Description
GET	/experiences	List all experiences with filters and pagination
GET	/experiences/:id	Get details for a specific experience
POST	/experiences	Create a new experience
PATCH	/experiences/:id	Update an experience
DELETE	/experiences/:id	Soft delete an experience
PATCH	/experiences/:id/restore	Restore a soft-deleted experience
POST	/bookings	Create a new booking
GET	/bookings/by-experience/:experienceId	List bookings by experience
DELETE	/bookings/:id	Soft delete a booking
PATCH	/bookings/:id/restore	Restore a soft-deleted booking

*API Documentation (Swagger)*

Swagger UI is automatically available once the API is running.

Access it at:

http://localhost:3000/api


You can test endpoints directly and explore DTO definitions interactively.

## License

This project was developed for a technical evaluation and is open for educational and demonstration purposes.
```
