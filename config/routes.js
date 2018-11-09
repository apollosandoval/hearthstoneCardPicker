//Update the name of the controller below and rename the file.
const cards = require("../controllers/cards.js");
module.exports = function (app) {

  app.get('/', cards.index);
  app.get('/cards/add/:id', cards.addToList);
  app.get('/cards/remove/:id', cards.removeFromList);
  app.post('/cards', cards.create);
};
