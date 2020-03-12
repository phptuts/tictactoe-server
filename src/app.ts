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
  sendMessage(game.getGameState());
});

app.use(cors());

app.get('/next-turn/:space', (req, res) => {
  const space = +req.params['space'];
  const message = game.move(space);
  const { errorMessage } = message;
  sendMessage(message);
  res.json({ errorMessage });
});

app.get('/reset', (req, res) => {
  sendMessage(game.reset());
  res.send('OK');
});

const sendMessage = (message: GameState) => {
  const numberOfPeeps = Array.from(wss.clients).filter(
    (c) => c.readyState === WebSocket.OPEN
  ).length;
  const messagePlusPeeps = { ...message, numberOfPeeps };
  console.log(messagePlusPeeps, 'messagePlusPeeps');
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messagePlusPeeps));
    }
  });
};

app.listen(process.env.PORT, () => {
  console.log('working');
});
