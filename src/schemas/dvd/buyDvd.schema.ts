import * as yup from 'yup'

const buyDvdSchema = yup.object().shape({
  quantity: yup.number().positive().required(),
})

const serializedBuyDvdSchema = yup.object().shape({
  cart_id: yup.string(),
  total: yup.string(),
  paid: yup.boolean().default(false),
  newUser: yup.object().shape({
    user_id: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
  }),
  dvds: yup.array().of(
    yup.object().shape({
      dvd_id: yup.string().uuid().required(),
      name: yup.string().required(),
      duration: yup.string().required(),
    })
  ),
})

export { buyDvdSchema, serializedBuyDvdSchema }
