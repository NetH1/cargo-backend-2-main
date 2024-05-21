import { body } from 'express-validator';


export const loginValidation = [
    body('email', 'Неверная почта!').isEmail(),
    body('password', 'Пароль должен быть минимум 7 символов!').isLength({min:7}),
];

export const registerValidation = [
    body('email', 'Неверная почта!').isEmail(),
    body('password', 'Пароль должен быть минимум 7 символов!').isLength({min:7}),
    body('fullName', 'Укажите Имя!').isLength({min:3}),
    body('avatarUrl', 'Неверная ссылка на аватарку!').optional().isString(),
];

export const postCreateValidation = [
    body('text', 'Введите текст статьи!').isLength({min:3}).isString(),
];