import * as yup from 'yup'

const getAllDvdsSchema = yup
  .array()
  .of(
    yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      duration: yup.string(),
      stock: yup.object().shape({
        id: yup.string(),
        quantity: yup.number().positive(),
        price: yup.number().positive(),
      }),
    })
  )
  .required()

export default getAllDvdsSchema
