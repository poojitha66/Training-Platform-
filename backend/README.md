# TrainPro Rails API Backend

This Rails API-only application powers the TrainPro platform by providing authentication, product management, order processing, and Stripe checkout endpoints that the Next.js frontend consumes.

## Prerequisites
- Ruby 3.2.3
- PostgreSQL 13+
- Node.js (for running the frontend)
- Bundler (`gem install bundler`)

## Getting Started

1. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

2. **Configure environment variables**
   Create a `.env` file (loaded in development/test) or add the values to your shell/credentials:
   ```env
   DB_HOST=localhost
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=backend_development
   DB_TEST_NAME=backend_test

   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=sk_test_...
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   CHECKOUT_SUCCESS_URL=http://localhost:3000/success
   CHECKOUT_CANCEL_URL=http://localhost:3000/cancel
   ```

3. **Prepare the database**
   ```bash
   bundle exec rails db:create db:migrate
   ```

4. **Run the server**
   ```bash
   bundle exec rails s -p 3001
   ```
   The API will be available at `http://localhost:3001/api`.

## Available Endpoints

- `POST /api/auth/register` – Create a new user and receive a JWT.
- `POST /api/auth/login` – Authenticate and receive a JWT.
- `GET /api/products` – List products (public).
- `POST /api/products` – Create product (admin only).
- `PUT /api/products/:id` – Update product (admin only).
- `DELETE /api/products/:id` – Delete product (admin only).
- `GET /api/orders` – List current user orders (admins see all orders).
- `POST /api/orders` – Create a new order for the current user.
- `PUT /api/orders/:id` – Update order status/payment status (admin only).
- `POST /api/checkout` – Create a Stripe Checkout session for the supplied line items.

All protected endpoints expect an `Authorization: Bearer <token>` header containing the JWT issued by the auth endpoints.

## Stripe Configuration

Set `STRIPE_SECRET_KEY` with your Stripe secret key. The checkout endpoint will send users to the URLs configured via `CHECKOUT_SUCCESS_URL` and `CHECKOUT_CANCEL_URL`.

## Running Tests

Add your preferred test framework (e.g., RSpec or Minitest) and execute with:
```bash
bundle exec rails test
```

## Deployment Notes

- Ensure the environment variables above are configured in your hosting provider.
- Run database migrations during deployment: `bundle exec rails db:migrate`.
- Provide secure values for `JWT_SECRET` and `STRIPE_SECRET_KEY`.
