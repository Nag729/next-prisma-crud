import * as Yup from "yup";

export const beverageFormSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().min(0).max(3000),
  isRecomment: Yup.boolean(),
});
