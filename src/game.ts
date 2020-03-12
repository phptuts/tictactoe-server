const winnningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export class TicTacToe {
  private board: Array<'X' | 'O' | ''> = ['', '', '', '', '', '', '', '', ''];
  player1 = 'X';
  player2 = 'O';
  nextPlayer: 'X' | 'O' = this.player1 as 'X';

  move(space: number): GameState {
    if (this.board[space] !== '') {
      return {
        board: this.board,
        winner: this.getWinner(),
        nextPlayer: this.nextPlayer,
        errorMessage: `Error space already take.`
      };
    }
    if (!this.getWinner()) {
      this.board[space] = this.nextPlayer;
    }
    const winner = this.getWinner();

    const nextPlayer = this.nextPlayer === 'X' ? 'O' : 'X';
    this.nextPlayer = winner === undefined ? nextPlayer : undefined;

    return {
      board: this.board,
      winner,
      nextPlayer: this.nextPlayer,
      errorMessage: undefined
    };
  }

  getGameState(): GameState {
    return {
      board: this.board,
      winner: this.getWinner(),
      nextPlayer: this.nextPlayer,
      errorMessage: undefined
    };
  }

  reset(): GameState {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.nextPlayer = 'X';
    return {
      board: this.board,
      winner: null,
      nextPlayer: this.nextPlayer,
      errorMessage: undefined
    };
  }

  getWinner(): 'X' | 'O' | 'TIE' | undefined {
    const winningPlayer = winnningCombos
      .map((combo) => {
        if (combo.filter((space) => this.board[space] === 'X').length == 3) {
          return 'X';
        }

        if (combo.filter((space) => this.board[space] === 'O').length === 3) {
          return 'O';
        }

        return undefined;
      })
      .find((winner) => winner !== undefined);

    if (winningPlayer) {
      return winningPlayer;
    }

    const isTie = this.board.filter((space) => space !== '').length === 9;
    if (isTie) {
      return 'TIE';
    }

    return undefined;
  }
}

export interface GameState {
  board: Array<'X' | 'O' | ''>;
  winner: 'X' | 'O' | 'TIE' | undefined;
  nextPlayer: 'X' | 'O' | undefined;
  errorMessage?: string;
}
