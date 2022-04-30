

async function example1 () {
    const mysql = require('mysql2/promise');
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'Sql2022',
            database: 'employee_tracker'
        },
        console.log('connected to the election database.')
    );
    const [rows, fields] = await db.execute('select * from as employee');
    console.log(rows, fields);
    await conn.end();

  }

module.exports = example1;