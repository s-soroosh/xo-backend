'use strict';
const Boom = require('boom')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  async create(ctx) {
    const code = this.makeid(4)
    const player1 = ctx.state.user
    const game = await strapi.query("game").create({
      ...ctx.request.body,
      code,
      player1
    })

    return game;

  },

  async findOne(ctx) {
    const id = ctx.params.id
    const game = await strapi.query("game").findOne({code: id})
    return game;
  },

  async join(ctx) {
    const id = ctx.params.id
    const game = await strapi.query("game").findOne({code: id})
    const currentUser = ctx.state.user

    if (game.player1.id === currentUser.id) {
      throw Boom.badRequest("You can't play with yourself :)");
    }
    if (game.player2 === null || game.player2.id == currentUser.id) {
      game.player2 = currentUser.id
      strapi.query("game").update({id}, game)
    } else {
      console.log(game.player2.id, game.player1.id, currentUser)
      throw Boom.badRequest('Player cannot join this game')
    }

    return game;
  }
};
