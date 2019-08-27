const allMarcas = require('./data/marcas.json')
const allTipos = require('./data/tipos.json')

module.exports = {
  convertTipo: tipo => allTipos.indexOf(tipo),
  convertMarca: marca => allMarcas.indexOf(marca),
};
