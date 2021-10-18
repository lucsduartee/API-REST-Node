const fs = require('fs');

fs.createReadStream('./assets/dog.jpg')
  .pipe(fs.createWriteStream('./assets/dogStream.jpg'))
  .on('finish', () => console.log('imagem escrita'));