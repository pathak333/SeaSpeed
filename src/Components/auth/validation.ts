import Joi from "joi";

interface Login {
  userId: string;
  adminPassword: string;
  confirmPassword?: string;
}

interface validationSchema extends Login {
  register: number;
}

export const validationAuth = (auth: Partial<validationSchema>) =>
  Joi.object({
    userId: Joi.string().label("Enter user ID"),
    password: Joi.string().min(10),
    confirmPassword: Joi.ref("password"),
  })
  .validateAsync(auth, { abortEarly: true });
