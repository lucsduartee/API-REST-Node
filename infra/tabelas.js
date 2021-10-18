class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarAtendimentos();
    this.criarPets();
  };

  criarAtendimentos() {
    const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,' + 
      'cliente varchar(50) NOT NULL,' +
      'pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL,' +
      ' dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

    this.conexao.query(sql, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Tabela Atendimentos criada');
      }
    });
  }

  criarPets() {
    const query = 'CREATE TABLE IF NOT EXISTS PETS' +
      '(id int NOT NULL AUTO_INCREMENT, nome varchar(50),' +
      'imagem varchar(200), PRIMARY KEY (id))';

    this.conexao.query(query, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Table Pet criada com sucesso');
      }
    })
  }
};

module.exports = new Tabelas;