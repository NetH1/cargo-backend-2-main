import express from 'express';
// import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import { PostController, UserController } from './controllers/index.js';


mongoose.connect('mongodb+srv://admin:123456789asd@cluster0.wwueicw.mongodb.net/tracknumber')


const app = express();



app.use(express.json());
app.use(cors());


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.authLogin);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.authRegister);
app.get('/auth/me', checkAuth, UserController.getMe);
app.patch('/update/user', checkAuth, registerValidation,  UserController.updateUser);



app.get('/posts', PostController.getAllPosts);
app.get('/myposts',checkAuth, PostController.getMyPosts);
app.post('/posts', checkAuth, handleValidationErrors, PostController.createPost);
app.get('/posts/text/:text', PostController.getPost);
app.delete('/posts/:id', checkAuth, PostController.removePost);




app.listen(5000, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});
