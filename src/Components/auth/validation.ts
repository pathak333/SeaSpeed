import Joi from "joi";

export interface LoginSchema {
  email: string;
  adminPassword: string;
  confirmPassword?: string;
}

interface validationSchema extends LoginSchema {
  register: number;
}

export const validationAuth = (auth: Partial<validationSchema>) =>
  Joi.object({
  email: Joi.string().label("Enter emai ID"),
    password: Joi.string().min(10),
    confirmPassword: Joi.ref("password"),
  }).validateAsync(auth, { abortEarly: true });
