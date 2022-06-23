import * as yup from 'yup'

const registerDvdSchema = yup.object().shape({
  dvds: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup.string().required(),
          duration: yup.string().required(),
          quantity: yup.number().positive().required(),
          price: yup.number().positive().required(),
        })
        .required()
    )
    .required(),
})

const serializedRegisterDvdSchema = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        dvd_id: yup.string().required(),
        name: yup.string().required(),
        duration: yup.string().required(),
        stock: yup.object().shape({
          stock_id: yup.string(),
          quantity: yup.number(),
          price: yup.number(),
        }),
      })
      .required()
  )
  .required()

export { registerDvdSchema, serializedRegisterDvdSchema }
