import * as fs from 'fs';
import sqlite3 from 'sqlite3';

// async function main() {
//   // Read data from the text file
//   const data = fs.readFileSync('./currency_data.txt', 'utf8');

//   // Split data into rows
//   const rows = data.split('\n');

//   // Create or open the SQLite database file
//   const db = new sqlite3.Database('currency_database.db', (err) => {
//     if (err) {
//       console.error('Error opening database:', err.message);
//       return;
//     }

//     console.log('Connected to the database.');
//   });

//   // Create a table to store the currency data
//   db.run(
//     'CREATE TABLE IF NOT EXISTS currency_data (ID INTEGER PRIMARY KEY, Currency TEXT, Symbol TEXT, Value REAL)',
//     (err) => {
//       if (err) {
//         console.error('Error creating table:', err.message);
//         return;
//       }

//       console.log('Table created.');
//     }
//   );

//   // Loop through rows and insert data into the database
//   const insertStatement = db.prepare(
//     'INSERT INTO currency_data (Currency, Symbol, Value) VALUES (?, ?, ?)'
//   );

//   for (const row of rows) {
//     const [currency, symbol, value] = row.split('\t');
//     insertStatement.run(currency, symbol, parseFloat(value));
//   }

//   // Finalize the insert statement
//   insertStatement.finalize();

//   // Close the database
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing database:', err.message);
//     } else {
//       console.log('Data inserted successfully. Database closed.');
//     }
//   });
// }

// await main().catch((error) => {
//   console.error('Error:', error);
// });


// let db = new sqlite3.Database('currency_database.db')
// db.all("Select * from currency_data where Value IS NOT NULL", [], (err, rows) => {
//     if (err) {
//       console.error('Error executing query:', err.message);
//       return;
//     }
//      // Display the retrieved data
//      console.log('Retrieved data from the currency_data table:');
//      console.table(rows); // Use console.table for a
// })




// // let db = new sqlite3.Database('currency_database.db')
// //  db.all("Delete from currency_data where Symbol in (WHERE symbol IN (SELECT symbol FROM currency_data GROUP BY symbol HAVING COUNT(*) > 1);)",[],(err,rows)=>{
// //     if(err){
// //         console.log("bhnada")
// //      }
// //      console.table(rows)
// //  })
// // db.close()
// let  db = new sqlite3.Database('currency_database.db')
// db.all("Select * from currency_data where Value IS NOT NULL", [], (err, rows) => {
//     if (err) {
//       console.error('Error executing query:', err.message);
//       return;
//     }
//      // Display the retrieved data
//      console.log('Retrieved data from the currency_data table:');
//      console.table(rows); // Use console.table for a
// })
