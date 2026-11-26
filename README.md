# Banking_projects-

## Registration setup

The registration endpoint is `POST /api/register`. It stores a bcrypt password
hash in PostgreSQL and returns a JWT that expires after one hour.

Configure these environment variables in the `.env` file loaded by
`config/db.js`:

```env
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
JWT_SECRET=replace_with_a_long_random_secret
PORT=3000
```

Create the `users` table by running `database/schema.sql` against your database
before starting the server. Keep `.env` out of source control and use a strong,
private `JWT_SECRET`.







