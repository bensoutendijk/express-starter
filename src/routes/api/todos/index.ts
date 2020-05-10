import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import auth from "../../../auth";
import Todo, { TodoStatus } from "../../../models/Todo";

const router = express.Router();

const Todo = mongoose.model<Todo>('Todo');

router.post('/', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    const { user, body } = req;

    try {
        const todo = new Todo({
            title: body.title,
            description: body.description,
            userid: user._id,
            createdOn: new Date().getTime(),
            updatedOn: new Date().getTime(),
            status: TodoStatus.Todo
        });

        await todo.save();
        return res.status(200).send(todo.toJSON());
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
})

router.get('/', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    const { user } = req;

    try {
        const todos = await Todo.find({ 
            userid: user._id,
        });
        return res.status(200).send(todos);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

router.get('/:takeid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    const { user, params } = req;

    try {
        const take = await Todo.findOne({ 
            _id: params.takeid,
            userid: user._id,
        });

        if (take === null) {
            throw new Error('take not found')
        }

        return res.status(200).send(take);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

router.post('/:takeid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    const { user, body, params } = req;

    try {
        const take = await Todo.findOne({ 
            _id: params.takeid, 
            userid: user._id,
        });

        if (take === null) {
            throw new Error('take not found')
        }

        Object.assign(take, {
            title: body.title,
            description: body.description,
            status: body.status,
            updatedOn: new Date().getTime(),
        });

        await take.save();
        return res.status(200).send(take);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

router.delete('/:takeid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    const { user, params } = req;

    try {
        const take = await Todo.findOne({ 
            _id: params.takeid, 
            userid: user._id
        });

        if (take === null) {
            throw new Error('take not found')
        }

        Object.assign(take, {
            status: TodoStatus.Archived,
        });

        await take.save();
        return res.status(200).send(take);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
});

export default router;