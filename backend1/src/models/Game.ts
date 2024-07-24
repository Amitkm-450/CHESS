import { Schema, model, Document } from 'mongoose';

interface Move extends Document {
  from: string;
  to: string;
  player: string;
  timestamp: Date;
}

const moveSchema = new Schema<Move>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  player: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

interface Game extends Document {
  player1SocketId: string;
  player2SocketId: string;
  moves: Move[];
  createdAt: Date;
}

const gameSchema = new Schema<Game>({
  player1SocketId: { type: String, required: true },
  player2SocketId: { type: String, required: true },
  moves: [moveSchema],
  createdAt: { type: Date, default: Date.now }
});

const GameModel = model<Game>('GameDB', gameSchema);

export default GameModel;
