# Groupomania

I built and designed this full-stack website using React, Express, MySQL, Sequelize, JavaScript, Sass, and HTML. This was project 7 for the OpenClassrooms Web Developer path.

## Installation

1. Clone the project using the following command:

```bash
git clone git@github.com:tssa017/groupomania.git
```

2. Redirect to the project folder using the following command:

```bash
cd groupomania
```

### Back-end

1. Download the backend dependencies with the following command:

```bash
cd back
npm ci
```

2. Launch the server with the following command:

```bash
nodemon server
```

### Front-end

In another terminal,

1. Download the frontend dependencies with this command:

```bash
cd front
npm ci
```

2. Launch React with the following command:

```bash
npm run start
```

### Build the database

1. Download [MySql](https://dev.mysql.com/downloads/mysql/) by following the instructions from their community downloads page

2. Download [MySql Workbench](https://dev.mysql.com/downloads/workbench/) by following the instructions from their community downloads page

3. Create a new MySql connection using Workbench, following [these instructions](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html)

4. In a new terminal, connect to your MySql database from the project terminal with the following command:

```bash
mysql -u <username> -p
```

5. Create a new database with the following command:

```bash
CREATE DATABASE <databasename>;
USE <databasename>;
```

6. Build a **Users** table with the following command:

```bash
CREATE TABLE Users (
    userId TINYINT,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    email VARCHAR(320),
    password VARCHAR(100),
    profilePic VARCHAR(512),
    isAdmin TINYINT,
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (userId)
);
```

7. Build a **Posts** table with the following command:

```bash
CREATE TABLE Posts (
    id TINYINT,
    post VARCHAR(4000),
    likes TINYINT,
    read TINYINT,
    userId TINYINT,
    postPicUrl VARCHAR(512),
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);
```

8. Build a **Comments** table with the following command:

```bash
CREATE TABLE Comments (
    id TINYINT,
    comment VARCHAR(4000),
    postId TINYINT,
    userId TINYINT,
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES Posts(id)
);
```

9. Sign in to the website! (You can create an admin account by setting `isAdmin` to `1` in the database)

### For developers

1. Compile Sass with the following command:

```bash
sass --watch index.scss index.css
```
