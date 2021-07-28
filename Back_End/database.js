const sqlite3 = require('sqlite3').verbose()

const migration = require('./migration.js');
const DBSOURCE = "db.sqlite"

//logger.salvarLog(`Request `, "HistoricoAcesso", "RelatorioController", 'info')

let db = new sqlite3.Database(DBSOURCE, async (err) => {
  if (err) {
    // Exeção caso não consiga acessa o sqlite
    console.error(err.message)
    throw err
  } else {
    var versaoTabela = await migration.versao0(db);
    console.log('versão tabela: ', versaoTabela)
    switch (++versaoTabela){
      case 1:
        await migration.versao1(db);
        versaoTabela++;
      case 2:
        await migration.versao2(db);
        versaoTabela++;
      case 3:
        await migration.versao3(db);
        versaoTabela++;
      case 4:
        await migration.versao4(db);
        versaoTabela++;
    }
  }
  ;
})

module.exports = db