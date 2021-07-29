const md5 = require('md5')

const verificaVersao = async(db) => {
  return new Promise(async (resolve, reject) => {
    var sql = "select number from version;"
    db.get(sql, (err, row) => {
      if (err) reject(false)
      if (!Boolean(row)) {
        db.run('INSERT INTO version (number) VALUES (0)')
        resolve(0);
      }
      resolve(row.number)
    });
  })
}

// Banco Versão 0
// Criação da tabela de versão de banco
const db = require('./database.js')
const versao0 = async(db) => {
  return new Promise(async (resolve, reject) => {
    db.run(`CREATE TABLE version ( number INTEGER )`,
      async (err) => {
        if (err) {
          await verificaVersao(db).then(valor => {
            resolve(valor)
          }).catch(error => {
            reject(false)
          })
          // Tabela já existe
        } else {
          // Tabela criado, inserindo valores padrões
          db.run('INSERT INTO version (number) VALUES (0)')
          resolve(0);
        }
      }
    );
  })
}

// Banco Versão 1
// Criação da tabela de usuário
const versao1 = (db) => {
  return new Promise(async (resolve, reject) => {
    db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Tabela já existe
        } else {
          // Tabela criado, inserindo valores padrões
          db.run(`UPDATE version SET number = ?`, 1)
          var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
          db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
          db.run(insert, ["user", "user@example.com", md5("user123456")])
        }
      });
      resolve(true);
  })
}

// Banco Versão 2
// Criação da tabela de empreendimentos
const versao2 = (db) => {
  return new Promise(async (resolve, reject) => {
    db.run(`CREATE TABLE enterprises (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name text            
              )`,
      (err) => {
        if (err) {
          // Tabela já existe
        } else {
          // Tabela criado, inserindo valores padrões
          var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
          db.run(`UPDATE version SET number = ?`, 2)
          db.run(insert, "Le Jardim");
          db.run(insert, "Evian");
          db.run(insert, "Olímpia Thermas");
        }
      });
    resolve(true);
  })
}

// Banco Versão 3
// Criação da tabela de votos
const versao3 = (db) => {
  return new Promise(async (resolve, reject) => {
    db.run(`CREATE TABLE vote (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              enterprise_Id INTEGER,
              user_Id            
              )`,(err) => {
      db.run(`UPDATE version SET number = ?`, 3)
    });

    resolve(true);
  })
}

// Banco Versão 4
// Criação da tabela de sessão de usuário
const versao4 = (db) => {
  return new Promise(async (resolve, reject) => {
    db.run(`CREATE TABLE session (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_Id INTEGER, 
              date text,
              token text           
              )`,(err) => {
      db.run(`UPDATE version SET number = ?`, 4)
    });
    resolve(true);
  })
}

module.exports = { versao0, versao1, versao2, versao3, versao4 }