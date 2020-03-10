import { TicTacToe } from './game';

describe('tictactoe game', () => {
  test('should be able to tell if a player won the game.', () => {
    const game = new TicTacToe();

    const state1 = game.move(0); // X
    expect(state1.board).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(state1.nextPlayer).toBe('O');
    expect(state1.winner).toBeUndefined();

    const state2 = game.move(1); // O
    expect(state2.board).toEqual(['X', 'O', '', '', '', '', '', '', '']);
    expect(state2.nextPlayer).toBe('X');
    expect(state2.winner).toBeUndefined();

    const state3 = game.move(4); // X
    expect(state3.board).toEqual(['X', 'O', '', '', 'X', '', '', '', '']);
    expect(state3.nextPlayer).toBe('O');
    expect(state3.winner).toBeUndefined();

    const state4 = game.move(5); // 0
    expect(state4.board).toEqual(['X', 'O', '', '', 'X', 'O', '', '', '']);
    expect(state4.nextPlayer).toBe('X');
    expect(state4.winner).toBeUndefined();

    const state5 = game.move(8); // 0
    expect(state5.board).toEqual(['X', 'O', '', '', 'X', 'O', '', '', 'X']);
    expect(state5.nextPlayer).toBeUndefined();
    expect(state5.winner).toBe('X');
  });

  test('should be able to prevent a user from doubling space', () => {
    const game = new TicTacToe();

    game.move(0); // X
    const { board, winner, nextPlayer, errorMessage: errorMessage } = game.move(
      0
    ); // O

    expect(errorMessage).toBe(`Error space already take.`);
    expect(board).toEqual(['X', '', '', '', '', '', '', '', '']);
    expect(winner).toBeUndefined();
    expect(nextPlayer).toBe('O');
  });

  test('test for a tie', () => {
    '0|1|2';
    '3|4|5';
    '6|7|8';

    'X|O|X';
    'X|O|O';
    'O|X|X';
    const game = new TicTacToe();

    game.move(0); // X
    game.move(1); // O
    game.move(2); // X
    game.move(4); // O
    game.move(3); // X
    game.move(5); // O
    game.move(7); // X
    game.move(6); // O
    const { board, winner, nextPlayer } = game.move(8); // X
    expect(board).toEqual(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
    expect(winner).toBe('TIE');
    expect(nextPlayer).toBeUndefined();
  });

  test('should be able to tell if a O won.', () => {
    '0|1|2';
    '3|4|5';
    '6|7|8';

    'O|O|O';
    '|X|X';
    'X||';
    const game = new TicTacToe();

    game.move(4); // X
    game.move(0); // O
    game.move(5); // X
    game.move(1); // O
    game.move(6); // X
    const { board, winner, nextPlayer } = game.move(2); // O
    expect(board).toEqual(['O', 'O', 'O', '', 'X', 'X', 'X', '', '']);
    expect(winner).toBe('O');
    expect(nextPlayer).toBeUndefined();
  });
});
