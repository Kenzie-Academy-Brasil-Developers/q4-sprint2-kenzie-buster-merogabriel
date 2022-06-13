import * as yup from 'yup'

const buyDvdSchema = yup.object().shape({
  quantity: yup.number().positive().required(),
})

const serializedBuyDvdSchema = yup.object().shape({
  id: yup.string(),
  total: yup.string(),
  paid: yup.boolean().default(false),
  newUser: yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
  }),
  dvds: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
      duration: yup.string().required(),
    })
  ),
})

export { buyDvdSchema, serializedBuyDvdSchema }
