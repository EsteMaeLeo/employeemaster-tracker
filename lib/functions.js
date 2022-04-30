const console = require('console');
function consoleTable(data) {
    const cTable = require('console.table');
    const table = cTable.getTable(data);
    console.log(table);
}

module.exports = consoleTable;