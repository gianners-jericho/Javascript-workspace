# Dockerize Express

A simple Express.js application running with **Node.js, Docker, Docker Compose, and MySQL 5.7**.

The project uses Docker Compose to run both the Express application and MySQL database as separate containers.

## Project Structure

```text
dockerize-express-master/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── mysql-dump/
│   └── db.sql
└── src/
    ├── app.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   └── game.controller.js
    ├── models/
    │   └── game.model.js
    ├── routes/
    │   └── user.view.routes.js
    └── views/
        └── index.ejs
```

## Requirements

Before setting up the project, make sure you have:

* Docker
* Docker Compose

You can verify that Docker is installed with:

```bash
docker --version
```

And Docker Compose with:

```bash
docker compose version
```

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
```

Then enter the project directory:

```bash
cd dockerize-express-master
```

### 2. Build and start the containers

Run:

```bash
docker compose up --build
```

This will:

1. Build the Express application image.
2. Install the Node.js dependencies.
3. Create the MySQL container.
4. Create the `hh` database.
5. Import the SQL file from `mysql-dump/db.sql`.
6. Start the Express application.

The first build may take a little longer because Docker needs to download the required images and install the dependencies.

### 3. Open the application

Once the containers are running, open:

```text
http://localhost:3001
```

The Express application runs on port `3000` inside Docker and is exposed as port `3001` on the host machine.

## Database

The MySQL database runs in its own Docker container.

### Database Configuration

| Setting                 | Value       |
| ----------------------- | ----------- |
| Host from Express       | `db`        |
| Host from your computer | `localhost` |
| Database                | `hh`        |
| Username                | `root`      |
| Password                | `password`  |
| MySQL container port    | `3306`      |
| Host port               | `3307`      |

### Connecting with MySQL Workbench

If you want to connect to the database using MySQL Workbench:

```text
Hostname: 127.0.0.1
Port: 3307
Username: root
Password: password
Database: hh
```

The Express application does **not** use `localhost` to connect to MySQL. Inside Docker, it connects using the Docker service name:

```text
db
```

## Database Initialization

The project contains the database dump here:

```text
mysql-dump/db.sql
```

Docker Compose mounts this directory into:

```text
/docker-entrypoint-initdb.d
```

When MySQL initializes for the first time, it automatically executes the SQL file.

### Important

The SQL dump is only automatically imported when the MySQL database is initialized.

The database uses a persistent Docker volume:

```text
db_data
```

Therefore, running:

```bash
docker compose up
```

again will **not** re-import `db.sql` if the database volume already exists.

If you need to completely reset the database and import the SQL dump again, run:

```bash
docker compose down -v
```

Then:

```bash
docker compose up --build
```

**Warning:** `docker compose down -v` deletes the Docker volumes, including the project's MySQL data.

## Running the Application

### Start the application

```bash
docker compose up
```

### Build and start

Use this when the Dockerfile or dependencies have changed:

```bash
docker compose up --build
```

### Stop the application

Press:

```text
Ctrl + C
```

Or, from another terminal:

```bash
docker compose down
```

### Run in the background

```bash
docker compose up -d
```

### View logs

```bash
docker compose logs
```

To view only the Express application logs:

```bash
docker compose logs web_app
```

To view only MySQL logs:

```bash
docker compose logs db
```

## Development

The Express source directory is mounted into the container:

```yaml
- ./src:/var/www/app/src
```

This means changes made to files inside `src/` are reflected inside the running container.

The project uses `nodemon` through the `npm start` command:

```json
"start": "nodemon src/app.js"
```

Therefore, changes to the application source code can be detected automatically while the container is running.

## Application Architecture

The application follows a simple MVC-style structure.

### Routes

```text
src/routes/
```

Defines the application's routes and determines which controller should handle a request.

### Controllers

```text
src/controllers/
```

Contains application logic for handling requests.

### Models

```text
src/models/
```

Contains database-related operations.

### Views

```text
src/views/
```

Contains EJS templates used to render HTML pages.

### Database Configuration

```text
src/config/database.js
```

Contains the MySQL connection configuration and query execution logic.

## Docker Architecture

The project uses two Docker services:

```text
                    Docker Compose
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
        web_app                      db
       Express.js                  MySQL 5.7
        Port 3000                  Port 3306
             │                       ▲
             └─────── connects ──────┘
```

From the host machine:

```text
http://localhost:3001
        │
        ▼
web_app:3000
```

For MySQL:

```text
localhost:3307
        │
        ▼
db:3306
```

## Common Problems

### Port 3001 is already in use

If another application is using port `3001`, change the host port in `docker-compose.yml`:

```yaml
ports:
  - 3002:3000
```

Then access the application at:

```text
http://localhost:3002
```

### Port 3307 is already in use

Change:

```yaml
ports:
  - 3307:3306
```

to another available host port, for example:

```yaml
ports:
  - 3308:3306
```

The Express application should still use:

```text
db:3306
```

because `3306` is the MySQL port inside the Docker network.

### Database changes are not appearing

If you changed `mysql-dump/db.sql` after the database was already initialized, the new SQL file will not automatically run.

To recreate the database:

```bash
docker compose down -v
docker compose up --build
```

Remember that this deletes the existing MySQL data stored in the Docker volume.

### Check whether the containers are running

```bash
docker compose ps
```

You should see both:

```text
web_app
db
```

running.

## Useful Docker Commands

| Command                       | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `docker compose up`           | Start the application              |
| `docker compose up --build`   | Rebuild and start                  |
| `docker compose up -d`        | Start in the background            |
| `docker compose down`         | Stop and remove containers         |
| `docker compose down -v`      | Stop containers and delete volumes |
| `docker compose ps`           | Check container status             |
| `docker compose logs`         | View logs                          |
| `docker compose logs web_app` | View Express logs                  |
| `docker compose logs db`      | View MySQL logs                    |

## Quick Start

For a colleague who just wants to get the project running:

```bash
git clone <repository-url>
cd dockerize-express-master
docker compose up --build
```

Then open:

```text
http://localhost:3001
```

That's it. The Express application and MySQL database are both managed by Docker Compose.

