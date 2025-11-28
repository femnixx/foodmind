import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send("This is where to get all users");
});

userRouter.post('/', (req, res) => {
    res.send("This is where to post all users");
});

userRouter.post('/:id', (req, res) => {
    res.send("This is where to post a user");
});

userRouter.put('/:id', (req, res) => {
    res.send("This is where to update a user");
});

userRouter.delete('/:id', (req, res) => {
    res.send("This is where to delete a user");
});

