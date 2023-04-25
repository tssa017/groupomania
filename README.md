# Groupomania

I built and designed this full-stack website using React, Express, MySQL, Sequelize, JavaScript, Sass, and HTML. This was project 7 for the OpenClassrooms Web Developer path.

## Installation

Clone the project

```bash
git clone git@github.com:tssa017/groupomania.git
```

### Back-end

1. Download the backend dependencies with this command:

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

2. Build a **Users** table with the following fields:

-   userId (primary key) **_type: TINYINT_**
-   firstName **_type: VARCHAR(20)_**
-   lastName **_type: VARCHAR(20)_**
-   email **_type: VARCHAR(320)_**
-   password **_type: VARCHAR(100)_**
-   profilePic **_type: VARCHAR(512)_**
-   isAdmin **_type: TINYINT_**
-   createdAt **_type: DATETIME_**
-   updatedAt **_type: DATETIME_**

3. Build a **Posts** table with the following fields:

-   id (primary key) **_type: TINYINT_**
-   post type: VARCHAR(4000)
-   likes **_type: TINYINT_**
-   read **_type: TINYINT_**
-   userId (foreign key associated with **Users** model) **_type: TINYINT_**
-   postPicUrl **_type: VARCHAR(512)_**
-   createdAt **_type: DATETIME_**
-   updatedAt **_type: DATETIME_**

4. Build a **Comments** table with the following fields:

-   id (primary key)
-   comment type: **_VARCHAR(4000)_**
-   postId (foreign key associated with **Posts** model) **_type: TINYINT_**
-   userId (foreign key associated with **Users** model) **_type: TINYINT_**
-   createdAt **_type: DATETIME_**
-   updatedAt **_type: DATETIME_**

5. Connect to your database with the following command, you will be prompted for your password

```bash
mysql -u <username> -h <hostname> -P <port> <database> -p
```

6. Sign in to the website! (You can create an admin account by setting `isAdmin` to `1` in the database)

### For developers

1. Compile Sass with the following command:

```bash
sass --watch index.scss index.css
```
