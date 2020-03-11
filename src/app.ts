import express from 'express';
import WebSocket from 'ws';
import { TicTacToe, GameState } from './game';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const wss = new WebSocket.Server({
  port: +process.env['WEBSOCKET_PORT']
});
const game = new TicTacToe();

let socket: WebSocket;

wss.on('connection', function connection(ws) {
  socket = ws;
  const message = JSON.stringify(game.getGameState());
  console.log(message);
  socket.send(message);
});

app.use(cors());

app.get('/next-turn/:space', (req, res) => {
  const space = +req.params['space'];
  sendMessage(res, game.move(space));
});

app.get('/reset', (req, res) => {
  sendMessage(res, game.reset());
});

const sendMessage = (res: express.Response, message: GameState) => {
  res.json(message);
  if (socket) {
    socket.send(JSON.stringify(message));
  }
};

app.listen(process.env.PORT, () => {
  console.log('working');
});