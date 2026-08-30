# Smart Irrigation API

Express 5 and Mongoose API under `/api/v1`. Configure the values documented in `.env.example`, then run `npm run dev`. Use `npm test` for the Node test suite.

## Production database

Vercel must use a MongoDB Atlas `MONGODB_URI`; a localhost URI only works during local development. Configure `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL` in the Vercel Production environment, allow the deployment to reach Atlas, and redeploy after changing environment variables. `FRONTEND_URL` may include a trailing slash; the API normalizes it before applying CORS.

For local development with Atlas, copy `.env.example` to `.env` and replace the URI placeholders with the Atlas database user's credentials and cluster hostname. Keep `/smart_irrigation` in the URI so the application uses the documented database. URL-encode special characters in the password, add the current machine's IP address in Atlas Network Access, and never commit `.env`.

Production startup rejects missing or malformed database configuration, non-SRV MongoDB URLs, and database names other than `smart_irrigation` before attempting a network connection. The URI value is never included in errors or logs.

`GET /api/v1/health` establishes the database connection and returns `503 DATABASE_UNAVAILABLE` when MongoDB cannot be reached. Database-backed requests use the same cached connection across warm serverless invocations.

When a connection fails, Function Logs include only a safe `category` (`configuration`, `dns`, `authentication`, `network_access`, `timeout`, or `database_unavailable`) plus the error name/code. Connection strings and credentials are never logged.

## Five-year development seed

The bundled synthetic dataset contains one farmer, five farms, and five years of
weather and recommendation history. Validate it without a database:

```powershell
npm run seed:validate
```

To import it into the MongoDB database configured by `MONGODB_URI`, set a local
password for the seeded farmer and run:

```powershell
$env:SEED_USER_PASSWORD='choose-a-local-password'
npm run seed
```

Sign in with `rahulpatil@example.com` and that password. The importer converts
the source string IDs to deterministic MongoDB ObjectIds and can be rerun; it
replaces only records that use the bundled seed IDs. The weather is simulated
development data, not live or observed weather.
