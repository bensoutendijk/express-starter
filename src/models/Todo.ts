import mongoose from 'mongoose';

export enum TodoStatus {
    Doing,
    Done,
    Archived,
}

export interface Todo extends mongoose.Document {
    title: string,
    description: string,
    status: TodoStatus,
    createdOn: Date,
    updatedOn: Date,
}

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: TodoStatus, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: false },
});

mongoose.model<Todo>('Todo', todoSchema);
export default Todo;