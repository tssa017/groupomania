# Groupomania

I designed and built this full-stack website as project 7 for the OpenClassrooms Web Developer path. On the back-end I used Node.js, Express, and MySql with Sequelize. On the front-end I used React and Sass.

Groupomania is a social media platform that allows users to publish and interact with multimedia content on a feed.

## Installation

1. Clone and access the project using the following commands:

```bash
git clone git@github.com:tssa017/groupomania.git
cd groupomania
```

### Back-end

1. Download the backend dependencies with the following commands:

```bash
cd back
npm ci
```

2. Launch the server with this command:

```bash
nodemon server
```

### Front-end

In another terminal,

1. Download the frontend dependencies with these commands:

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

2. Download [MySql Workbench](https://dev.mysql.com/downloads/workbench/) by following the instructions from the MySql community downloads page

3. Create a new MySql connection using Workbench, following [these instructions](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html)

In a new terminal,

4. Connect to your MySql connection with this command:

```bash
mysql -u root -p
```

5. Create a new database with the following commands:

```bash
CREATE DATABASE <databasename>;
USE <databasename>;
```

Store the database name in your .env file.

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
    FOREIGN KEY (postId) REFERENCES Posts(id),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);
```

9. Head to the sign in portal (it should look something like: http://localhost:XXXX/portal) on your browser, click the sign up tab, and follow the instructions! 🚀

### For developers

1. Compile Sass with the following commands:

```bash
cd front/src
sass --watch index.scss index.css
```
