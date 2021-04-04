'use strict';
const Boom = require('boom')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async join(ctx) {
    const id = ctx.params.id
    const game = await strapi.query("game").findOne({id})
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

    return "OK"
  }
};
