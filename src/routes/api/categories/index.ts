import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import auth from "../../../auth";
import Card from "../../../models/Card";
import LocalUser from "../../../models/LocalUser";
import Board from "../../../models/Board";
import Category, { CategoryUpdateProperties } from "../../../models/Category";

const router = express.Router();

const User = mongoose.model<LocalUser>('LocalUser');
const Card = mongoose.model<Card>('Card');
const Board = mongoose.model<Board>('Board');
const Category = mongoose.model<Category>('Category');

// POST new category
router.post('/', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
  const { user, body } = req;

  try {
    // Verify JWT with database to prevent auth on old session
    const existingUser = await User.findById(user._id);
    if (existingUser === null) {
      throw new Error('user not found');
    }

    const board = await Board.findOne({
      _id: body.boardid,
      members: { id: user._id },
      archived: false,
    });

    if (board === null) {
      throw new Error('board not found');
    }

    const category = new Category({
      title: body.title,
      createdOn: new Date().getTime(),
      updatedOn: new Date().getTime(),
      boardid: body.boardid,
      archived: false,
    });
    board.categories.push(category._id);
    
    await board.save();
    await category.save();
    return res.status(200).send(board);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// POST update category
router.post('/:categoryid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
  const { user, body, params } = req;

  try {
    const category = await Category.findOne({
      _id: params.categoryid,
    });

    if (category === null) {
      throw new Error('category not found');
    }

    const board = await Board.findOne({ 
      _id: category.boardid,
      members: { id: user._id },
      archived: false,
    });

    if (board === null) {
      throw new Error('board not found');
    }

    Object.assign<Category, Pick<Category, CategoryUpdateProperties>>(category, {
      title: body.title,
      updatedOn: new Date(),
    });

    await category.save();
    return res.status(200).send(board);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// DELETE category
router.delete('/:categoryid', ...auth.required, async (req: Request, res: Response): Promise<Response> => {
  const { user, params } = req;

  try {
    const category = await Category.findOne({
      _id: params.categoryid,
    });

    if (category === null) {
      throw new Error('category not found');
    }

    const board = await Board.findOne({ 
      _id: params.boardid,
      members: { id: user._id, scopes: 'admin' },
      archived: false,
    });

    if (board === null) {
      throw new Error('board not found');
    }

    Object.assign(category, {
      archived: !category.archived,
    });
    board.categories = board.categories.filter(id => id !== category._id);

    await board.save();
    await category.save();
    return res.status(200).send(board);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

export default router;