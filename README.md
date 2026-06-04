# PixMeal Backend - DevOps Documentation

## 1. Project context

PixMeal Backend is a NestJS API using PostgreSQL and Prisma.

The goal of this DevOps setup is to provide a reproducible development, test, and deployment environment using:

* Docker
* Docker Compose
* PostgreSQL
* Prisma
* ESLint
* Jest
* Git workflow conventions
* Continuous Integration

This documentation explains how another developer can install, run, test, and deploy the project.

---

## 2. Technical stack

* Node.js 20
* NestJS
* TypeScript
* PostgreSQL 16
* Prisma ORM
* Docker
* Docker Compose
* Jest
* ESLint
* Prettier
* GitHub Actions / CI pipeline

---

## 3. Project structure

```txt
.
├── src/                    # NestJS source code
├── prisma/                 # Prisma schema and database configuration
├── uploads/                # Uploaded files volume
├── Dockerfile              # Production Docker image
├── docker-compose.yml      # Local development environment
├── docker-compose.prod.yml # Production-like deployment environment
├── test.yml                # CI pipeline configuration
├── Taskfile.yml            # Useful automation commands
├── .env.example            # Example environment variables
├── .gitignore              # Ignored files and secrets
└── README.md               # Project documentation
```

---

## 4. Environment variables and secrets

The project uses environment variables to configure the application and database.

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

The `.env` file contains secrets and must never be committed to Git.

Only `.env.example` is versioned to show other developers which variables are required.

Example variables:

```env
APP_PORT=3000

POSTGRES_USER=pixmeal
POSTGRES_PASSWORD=pixmeal
POSTGRES_DB=pixmeal
POSTGRES_PORT=5432

DATABASE_URL=postgresql://pixmeal:pixmeal@db:5432/pixmeal

JWT_SECRET=change_me
JWT_EXPIRES_IN=1d
```

---

## 5. Development environment with Docker Compose

The development environment is based on Docker Compose.

It contains two main services:

| Service | Role                         |
| ------- | ---------------------------- |
| `app`   | Runs the NestJS backend      |
| `db`    | Runs the PostgreSQL database |

The application container depends on the database container.
The database uses a healthcheck to make sure PostgreSQL is ready before the API starts.

Start the environment:

```bash
docker compose up -d --build
```

Show logs:

```bash
docker compose logs -f
```

Stop the environment:

```bash
docker compose down
```

Stop the environment and remove volumes:

```bash
docker compose down -v
```

---

## 6. Docker services

### app service

The `app` service builds the NestJS application from the `Dockerfile`.

It exposes the API on port `3000` by default.

```txt
localhost:3000
```

The `uploads` folder is mounted as a volume so uploaded files can persist outside the container.

### db service

The `db` service uses the official PostgreSQL 16 Alpine image.

Database data is stored in a Docker volume:

```txt
postgres_data
```

This allows the database to keep its data even if the container is restarted.

---

## 7. Useful Docker commands

Build the images:

```bash
docker compose build
```

Start the containers:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

Restart a service:

```bash
docker compose restart app
```

Stop all services:

```bash
docker compose down
```

Clean containers and volumes:

```bash
docker compose down -v
```

---

## 8. Local installation without Docker

Install dependencies:

```bash
npm ci
```

Generate Prisma client:

```bash
npx prisma generate
```

Run the application in development mode:

```bash
npm run start:dev
```

Build the application:

```bash
npm run build
```

Run the production build:

```bash
npm run start:prod
```

---

## 9. Tests and code quality

The project uses ESLint for static code analysis and Jest for unit tests.

Run the linter:

```bash
npm run lint
```

Run unit tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:cov
```

Run the full local CI sequence:

```bash
npm run ci
```

The local CI command runs:

```txt
lint → tests with coverage → build
```

---

## 10. Git workflow

The project uses GitHub Flow.

### Branch strategy

* `main` contains stable and validated code.
* New work is done on feature branches.
* Each feature branch is merged through a pull request.

Branch examples:

```txt
feature/docker-environment
feature/add-ci-pipeline
feature/add-unit-tests
fix/database-connection
docs/update-readme
```

### Merge strategy

Pull requests are reviewed before being merged.

The preferred merge strategy is squash merge because it keeps the Git history clean and readable.

### Commit convention

The project follows Conventional Commits.

Examples:

```txt
feat: add docker compose environment
ci: add test pipeline
test: add unit tests for auth service
docs: document deployment process
fix: update database connection configuration
```

### Secret management

Secrets are not committed to Git.

The following files are ignored:

```txt
.env
.env.*
```

Only `.env.example` is committed.

In the CI/CD platform, secrets must be stored in the platform secret manager, for example GitHub Actions Secrets or GitLab CI/CD Variables.

---

## 11. Continuous Integration

The CI pipeline is triggered automatically on Git events such as:

* push
* pull request

The pipeline validates the application before merging or deploying.

Pipeline stages:

```txt
Push / Pull Request
        ↓
Checkout repository
        ↓
Install dependencies
        ↓
Run ESLint
        ↓
Run unit tests with coverage
        ↓
Build application
        ↓
Build Docker image
        ↓
Pipeline success or failure report
```

If one step fails, the pipeline stops and the code must be corrected before merging.

---

## 12. Deployment environment

A production-like deployment environment is provided with Docker Compose.

The deployment environment is defined in:

```txt
docker-compose.prod.yml
```

Start the production-like environment:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Stop the production-like environment:

```bash
docker compose -f docker-compose.prod.yml down
```

The production-like environment uses:

* isolated API and database containers
* persistent PostgreSQL volume
* persistent uploads volume
* restart policy
* environment variables for secrets
* database healthcheck

This setup can be deployed on any server with Docker and Docker Compose installed.

---

## 13. Taskfile commands

The project includes a `Taskfile.yml` to simplify common commands.

Install dependencies:

```bash
task install
```

Run linter:

```bash
task lint
```

Run tests with coverage:

```bash
task test:cov
```

Run the local CI sequence:

```bash
task ci
```

Start Docker environment:

```bash
task docker:up
```

View logs:

```bash
task docker:logs
```

Stop Docker environment:

```bash
task docker:stop
```

Deploy locally:

```bash
task deploy:local
```

---

## 14. Troubleshooting

### Database is not ready

Check database logs:

```bash
docker compose logs -f db
```

Check if PostgreSQL is healthy:

```bash
docker compose ps
```

### API cannot connect to database

Verify the `DATABASE_URL` variable.

Inside Docker, the database host must be:

```txt
db
```

Example:

```env
DATABASE_URL=postgresql://pixmeal:pixmeal@db:5432/pixmeal
```

### Clean the environment

```bash
docker compose down -v
docker compose up -d --build
```

---

## 15. DevOps summary

This project implements the following DevOps practices:

* containerized development environment
* isolated services for API and database
* reproducible setup with Docker Compose
* environment variable management
* Git workflow with branch and commit conventions
* static analysis with ESLint
* unit tests with Jest
* coverage report
* automated CI pipeline
* production-like deployment environment
* documented commands for developers
