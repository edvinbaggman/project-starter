import * as Yup from 'yup';

export const todoCreateSchema = Yup.object({
  stringField: Yup.string().required(),
  numberField: Yup.number().required(),
});

export const todoUpdateSchema = Yup.object({
  stringField: Yup.string(),
  numberField: Yup.number(),
});
