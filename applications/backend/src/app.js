const express = require('express')
const mysql = require('mysql2/promise') // Change to your db client

// See the documentation for the db client package you are using
// to learn how to use it, but it will be something like this:

async function connect(){
    try{
        const connection = await mysql.createConnection({
            user: "root",   // See the documentation for the database you are
            password: "abc123", // using to learn which connection settings you
            host: "db",  // should use, but it usually includes these 5
            port: 3306,         // options.
            database: "forum-db",
        })
        if (connection) {
            console.log('Database Connected');
            // console.log(connection);
            }
        return connection;
    } 
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

const app = express()

app.get('/accounts', async function(request, response){
	
	// See the documentation for the db client package you are using
	// to learn how to use it, but it will most likely be something
	// like this:
	
	try{
		const db = await connect();
		const query = `SELECT * FROM accounts`
		
		const accounts = await db.execute(query)
		
		response.status(200).json(accounts[0])
		
	}catch(error){
		
		console.log(error)
		response.status(500).end()
		
	}
	
})
console.log("Running")
app.listen(8080)