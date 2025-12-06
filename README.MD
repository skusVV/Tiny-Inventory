# Tiny Inventory

A simple inventory management system for tracking stores, products, and categories.

## Run Instructions

```bash
# Start everything (PostgreSQL, Backend, Frontend)
docker-compose up --build

# Access the app
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
```

For local development:
```bash
# Start only the database
cd backend && npm run up:db

# Run backend (in another terminal)
cd backend && npm run dev

# Run frontend (in another terminal)
cd frontend && npm run dev
```

## API Sketch

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /stores               | List stores (paginated)  |
| POST   | /stores               | Create store             |
| GET    | /stores/:id           | Get store by ID          |
| GET    | /stores/:id/products  | Get products for store   |
| GET    | /products             | List products (paginated)|
| POST   | /products             | Create product           |
| GET    | /categories           | List all categories      |

## Decisions & Trade-offs

**NestJS** — Well-structured, OOP-oriented framework with built-in DI, validation, and great TypeScript support. Trade-off: heavier than Express for a small app.

**PostgreSQL** - Chosen for future extensibility (locations, labels, expiration dates, sales). Current state could work with NoSQL, but relational model scales better with growing complexity.

**TypeORM** - Integrates seamlessly with NestJS. Trade-off: some query limitations vs raw SQL.


## Testing Approach

- Jest configured for unit and integration tests
- Cypress - for e2e flows [Not Implemented]
- Screenshot testing - to be sure ui not broken and consisten [Not Implemented]



## If I Had More Time

- **Add product search & filtering** - search by name, filter by category, price range, stock quantity
- **Add authentication & authorization** - protect endpoints, support multiple users per store
- **Audit logs** - it's must have in enterpirse systems.