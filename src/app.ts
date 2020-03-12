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
  const message = JSON.stringify(game.getGameState());
  ws.send(message);
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
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

app.listen(process.env.PORT, () => {
  console.log('working');
});
