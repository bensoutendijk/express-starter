import mongoose from 'mongoose';

export interface Board extends mongoose.Document {
    title: string;
    settings: BoardSettings;
    createdOn: Date;
    updatedOn: Date;
    userid: string;
}

const boardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true },
    userid: { type: String, required: true },
});

mongoose.model<Board>('Board', boardSchema);
export default Board;