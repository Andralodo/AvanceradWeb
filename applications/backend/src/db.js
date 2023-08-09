import mysql from 'mysql2' // Change to your db client

const db = mysql.createPool({
    user: "root",   // See the documentation for the database you are
    password: "abc123", // using to learn which connection settings you
    host: "db",  // should use, but it usually includes these 5
    port: 3306,         // options.
    database: "forum-db",
}).promise()


export default db;