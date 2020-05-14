import mongoose from 'mongoose';

export interface Card extends mongoose.Document {
    title: string;
    description?: string;
    categoryTitle: string;
    createdOn: Date;
    updatedOn: Date;
    categoryid: string;
}

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    categoryTitle: { type: String, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true },
    categoryid: { type: String, required: true },
});

mongoose.model<Card>('Card', cardSchema);
export default Card;