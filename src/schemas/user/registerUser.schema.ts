import * as yup from 'yup'

const registerUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  isAdm: yup.boolean().default(false).optional(),
  password: yup.string().required(),
})

const serializedRegisterUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  isAdm: yup.boolean().required(),
})

export { registerUserSchema, serializedRegisterUserSchema }
