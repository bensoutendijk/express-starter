import mongoose from 'mongoose';

export enum TodoStatus {
    Todo,
    Doing,
    Done,
    Archived,
}

export interface Todo extends mongoose.Document {
    title: string;
    description?: string;
    status: TodoStatus;
    createdOn: Date;
    updatedOn: Date;
    userid: string;
}

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: TodoStatus, required: true },
    createdOn: { type: Date, required: true },
    updatedOn: { type: Date, required: true },
    userid: { type: String, required: true },
});

mongoose.model<Todo>('Todo', todoSchema);
export default Todo;