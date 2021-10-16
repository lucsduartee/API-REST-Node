const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas')

conexao.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('conectado');

    Tabelas.init(conexao);
    const app = customExpress();
    app.listen(3000, () => console.log('server in port 3000'));
  }
});
