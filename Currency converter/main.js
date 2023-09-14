import chalk from 'chalk';
import inquirer from 'inquirer';
import sqlite3 from 'sqlite3';
console.log(chalk.bgCyan("Currency Converter"));
console.log(chalk.redBright("Rate list As Of 13-Sep-2023"));
// Define the currency enum
let currency = ["KWD", "BHD", "OMR", "GBP", "CHF", "EUR", "USD", "CAD", "BND", "SGD", "AUD", "NZD", "BGN", "QAR", "AED", "SAR", "ILS", "PLN", "RON", "MYR", "LYD", "BRL", "TTD", "DKK", "CNY", "HKD", "NOK", "SEK", "BWP", "MXN", "ZAR", "CZK", "TRY", "TWD", "THB", "MUR", "PHP", "INR", "RUB", "NPR", "ISK", "JPY", "PKR", "LKR", "ARS", "HUF", "KZT", "CLP", "KRW", "COP", "IDR", "IRR", "VES"];
console.table(currency);
let db = new sqlite3.Database('currency_database.db');
async function Currenc_enter() {
    let cur_conf_1 = await inquirer.prompt([
        {
            type: "input",
            name: "Cur",
            message: "Enter currency",
            validate: (x) => {
                return currency.includes(x);
            },
        },
    ]);
    return { Cur: cur_conf_1.Cur };
}
async function Number_Curr() {
    let Number_c = await inquirer.prompt([
        {
            type: "input",
            name: "NCur",
            message: "Enter Amount"
        }
    ]);
    return { NCur: Number_c.NCur };
}
function getValue_from_db(x) {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('currency_database.db');
        db.all(`Select Value from currency_data where Symbol = ?`, [x], (err, rows) => {
            if (err) {
                reject(err);
            }
            // Display the retrieved data
            // console.log('Retrieved data from the currency_data table:');
            let count = rows[0].Value || 0;
            resolve(count);
        });
    });
}
let currencY_1 = await Currenc_enter();
let currencY_2 = await Currenc_enter();
let Number_Enter = await Number_Curr();
let x = await getValue_from_db(currencY_1.Cur);
// console.log(x);
let y = await getValue_from_db(currencY_2.Cur);
// console.log(y);
let result = Number_Enter.NCur * (y / x);
console.log(`01 ${currencY_1.Cur} = (${(y / x).toFixed(10)} ${currencY_2.Cur})`);
// console.log(`  1 USD = ${x} ${currencY_1.Cur}`)
// console.log(`  1 USD = ${y} ${currencY_2.Cur}`)
console.log(`  ${Number_Enter.NCur} ${currencY_1.Cur} = ${result.toFixed(2)} ${currencY_2.Cur}`);
