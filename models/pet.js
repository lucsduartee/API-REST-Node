const conexao = require('../infra/conexao');

class Pet {
  adiciona(pet, res) {
    const sql = 'INSERT INTO Pets SET ?';
    conexao.query(sql, pet, (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(pet);
      }
    })
  }
}

module.exports = new Pet;