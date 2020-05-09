import express, { Request, Response } from "express";
import auth from "../../../auth";

const router = express.Router();

router.post('/', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Create new Todo');
})

router.get('/', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Get all Todos');
});

router.get('/:todoid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Get Todo by ID');
});

router.post('/:todoid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Update Todo');
})

router.delete('/:todoid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send('Delete Todo');
})

export default router;