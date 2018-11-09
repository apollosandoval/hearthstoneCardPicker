const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    // Check if the session has a deck, if not create one. Add here to ensure session is created upon initial visit.
    if (!req.session.deck) {
      req.session.deck = [];
    }

    knex('cards')
      .then( cards => {
        res.render('index', {cards: cards, deck: req.session.deck})
      })
  },
  create: function(req, res) {
    knex('cards').insert({
      mana: req.body.mana,
      attack: req.body.attack,
      health: req.body.health,
      description: req.body.description
    })
    .then( () => {
      res.redirect('/');
    })
  },
  addToList: function(req, res) {
    knex('cards').where('id', req.params.id)
      .then( result => {
        req.session.deck.push(result[0]);
        res.redirect('/');
      })
  },
  removeFromList: function(req, res) {
    let deck = req.session.deck;
    if (deck.length < 2) {
      req.session.deck = [];
      res.redirect('/');
      return;
    };
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].id == req.params.id) {
        deck.splice(i,1);
        res.redirect('/');
        return;
      }
    }
    res.redirect('/');
  }
}
