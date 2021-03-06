const moment = require('moment');
const conexao = require('../infra/conexao');

class Atendimentos {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;
    const atendimentoDatado = { ...atendimento, dataCriacao, data };

    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres',
      },
    ]

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const sql = 'INSERT INTO Atendimentos SET ?';
      conexao.query(sql, atendimentoDatado, (err) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos';

    conexao.query(sql, (err, resultados) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    conexao.query(sql, (err, resultado) => {
      const atendimento = resultado[0];
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data =  moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
    conexao.query(sql, [valores, id], (err, resultados) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({
          ...valores,
          id,
        });
      }
    });
  }

  deleta(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?';

    conexao.query(sql, id, (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimentos;
