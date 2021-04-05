'use strict';
const Boom = require('boom')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {

    const move = ctx.request.body;
    const game = await strapi.query("game").findOne({code: move.game});
    const boardSize = game.size
    console.log({boardSize})
    if (game.winner) {
      return game
    }
    const turn = game.turn || game.player1
    let currentUserId = ctx.state.user.id;

    if (game.player2 === null) {
      throw Boom.badRequest("Please wait for the other player to join!");
    }
    if (turn.id !== currentUserId) {
      throw Boom.badRequest("It's not your turn!");
    }

    const moveExists = game.moves.filter(
      m => m.x === move.x && m.y === move.y).length > 0

    if (moveExists) {
      throw Boom.badRequest("This move is already taken");
    }

    move.player = turn;
    move.game = game.id
    await strapi.query("move").create(move)

    game.moves.push(move)
    let hasWinner = false
    for (let i = 0; i < boardSize; i++) {
      const won = game.moves.filter(m => m.x == i).length === boardSize
        ||
        game.moves.filter(m => m.y == i).length == boardSize
      if (won) {
        hasWinner = true
        break
      }
    }
    let diagonalWon = true
    for (let i = 0; i < boardSize; i++) {
      if (game.moves.filter(m => m.x === i && m.y === i).length == 0) {
        diagonalWon = false
        break
      }
    }
    if (diagonalWon) {
      hasWinner = true
    }

    if (hasWinner) {
      game.winner = currentUserId

    }
    const newTurn = game.player1.id == ctx.state.user.id ? game.player2
      : game.player1
    game.turn = newTurn
    await strapi.query("game").update({code: game.code}, game)
    return game

  }
};
