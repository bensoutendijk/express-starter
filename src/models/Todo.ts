import mongoose, { Schema, Document } from 'mongoose';

const todoSchema = new Schema<TodoModel>({
    title: String,
    description: String,
    createdOn: Date,
    updatedOn: Date,
});

mongoose.model<TodoModel>('Todo', todoSchema);

export enum TodoStatus {
    Doing,
    Done,
    Archived,
}

export interface Todo {
    title: string,
    description: string,
    createdOn: Date,
    updatedOn: Date,
}

export interface TodoModel extends Document, Todo {

}