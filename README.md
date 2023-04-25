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
npm ci back/package-lock.json
```

2. Launch the server with the following command:

```bash
nodemon server
```

### Front-end

1. Download the frontend dependencies with this command:

```bash
npm ci front/package-lock.json
```

2. Launch React with the following command:

```bash
npm run start
```

### Build the database

1. Download [MySql](https://dev.mysql.com/downloads/mysql/) by following the instructions from their community downloads page

2. Download [MySql Workbench](https://dev.mysql.com/downloads/workbench/) by following the instructions from their community downloads page

3. Create a new MySql connection using Workbench, following [these instructions](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html)

4. Create a new MySql database from Workbench or with the following command:

```bash
CREATE DATABASE databasename;
```

2. Build a **Users** table with the following command:

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

3. Build a **Posts** table with the following command:

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

4. Build a **Comments** table with the following command:

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

5. Connect to your MySql database from the project terminal with the following command:

```bash
mysql -u <username> -h <hostname> -P <port> <database> -p
```

6. Sign in to the website! (You can create an admin account by setting `isAdmin` to `1` in the database)

### For developers

1. Compile Sass with the following command:

```bash
sass --watch index.scss index.css
```
