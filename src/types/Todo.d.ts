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