# Sports Player Lookup

A web application that allows users to search and filter sports players by **name**, **gender**, and **sports**. The application uses Express, EJS, MySQL, and AJAX to update search results without reloading the entire page.

## Folder Structure

```text
sports-player-lookup/
├── models/
│   ├── Model.js              # Base model for database connection and queries
│   └── players.js            # Player search and filtering queries
│
├── views/
│   ├── search.ejs            # Main search page
│   └── partials/
│       └── playerCards.ejs   # Player results displayed on the page
│
├── controllers/
│   └── players.js            # Handles search requests and responses
│
├── assets/
│   ├── js/
│   │   └── search.js         # Handles AJAX search requests
│   └── css/
│       └── styles.css        # Application styling
│
├── app.js                    # Express application setup
├── config.js                 # Database configuration
├── routes.js                 # Application routes
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Features

* Search players by name using partial name matching.
* Filter players by gender.
* Filter players by one or more sports.
* Combine name, gender, and sport filters.
* A search will return results only when **at least one gender and at least one sport are selected**.
* If no gender or no sport is selected, the search returns no players.
* Display all of a player's sports even when the player was found through a specific sport filter.
* Display a message when no players match the selected filters.
* Use AJAX to update player results without reloading the entire page.
* Use EJS partial rendering to return only the player results for AJAX requests.
* Use a MySQL database with a many-to-many relationship between players and sports.
* Follow an MVC structure separating models, views, controllers, and routes.

## Technologies Used

* Node.js
* Express
* EJS
* MySQL
* MySQL2
* JavaScript
* AJAX using the Fetch API
* dotenv

## Database

The application uses a MySQL database named:

```text
sports_players
```

The database contains three tables:

```text
players
sports
player_sports
```

`player_sports` serves as the junction table between players and sports, allowing a player to participate in multiple sports and a sport to have multiple players.

The database is designed to support:

```text
players
    │
    │
    └── player_sports ── sports
```

The database includes 36 players and five sports:

* Basketball
* Volleyball
* Baseball
* Soccer
* Football

## Installation

### 1. Install the project dependencies

From the project directory, run:

```bash
npm install
```

This installs the dependencies defined in `package.json`.

### 2. Set up MySQL

Make sure MySQL is running locally.

The application uses the default local MySQL connection:

```text
localhost:3306
```

Create the database and tables using the provided SQL queries.

The database should be named:

```text
sports_players
```

### 3. Configure the database

Create a `.env` file containing the database configuration required by `config.js`.

Do not commit the `.env` file or database passwords to the repository.

### 4. Populate the database

Run the database creation and insert queries in MySQL.

The queries create:

* The `sports_players` database
* The `players` table
* The `sports` table
* The `player_sports` junction table
* The initial five sports
* 36 players
* Player-to-sport relationships

## Running the Application

Start the application with:

```bash
nodemon app.js
```

The application runs on port `5000`.

Open the following address in your browser:

```text
http://localhost:5000/search
```

## Search Behavior

The application requires at least **one gender** and **one sport** to be selected for a search to return players.

For example:

```text
Gender:
☑ Male

Sports:
☑ Basketball
```

will return male players who participate in Basketball.

Multiple selections can also be made:

```text
Gender:
☑ Male
☑ Female

Sports:
☑ Basketball
☑ Soccer
```

This will return players who match either selected gender and participate in at least one of the selected sports.

If nothing is checked in either category, no players will be returned.

For example:

```text
Gender:
☐ Male
☐ Female

Sports:
☐ Basketball
☐ Volleyball
☐ Baseball
☐ Soccer
☐ Football
```

will result in:

```text
No players found.
```

The same behavior applies if all genders are unchecked or if all sports are unchecked.

## How AJAX Works in the Application

When the user submits the search form, `search.js` prevents the browser from performing its normal form submission.

Instead, JavaScript collects the form values and sends them to the Express `/search` route using the Fetch API.

```text
User submits search
        ↓
search.js
        ↓
Fetch API
        ↓
GET /search
        ↓
players controller
        ↓
players model
        ↓
MySQL database
        ↓
playerCards.ejs
        ↓
HTML response
        ↓
search.js
        ↓
Results section is updated
```

The server returns the `playerCards.ejs` partial for AJAX requests rather than rendering the entire `search.ejs` page.

This allows the player results to be updated without reloading the entire page.