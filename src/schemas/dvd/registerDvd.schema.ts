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

const serializedRegisterDvdSchema = yup.object().shape({
  dvds: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          id: yup.string().required(),
          name: yup.string().required(),
          duration: yup.string().required(),
          stock: yup.object().shape({
            id: yup.string().nullable(),
            quantity: yup.number().positive().nullable(),
            price: yup.number().positive().nullable(),
          }),
        })
        .required()
    )
    .required(),
})

export { registerDvdSchema, serializedRegisterDvdSchema }
