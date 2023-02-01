import mongoose, { Schema } from 'mongoose';

export interface Chat extends Document {
    room: string;
    message: string;
    user: string;
}

const ChatSchema: Schema = new Schema({
  room: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
});

export const Chat = mongoose.model<Chat >('Chat', ChatSchema);
