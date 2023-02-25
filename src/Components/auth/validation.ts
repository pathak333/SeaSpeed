import Joi from "joi";

export interface LoginSchema {
  userId: number;
  adminPassword: string;
  confirmPassword?: string;
}

interface validationSchema extends LoginSchema {
  register: number;
}

export const validationAuth = (auth: Partial<validationSchema>) =>
  Joi.object({
    userId: Joi.number().label("Enter user ID"),
    password: Joi.string().min(10),
    confirmPassword: Joi.ref("password"),
  }).validateAsync(auth, { abortEarly: true });
