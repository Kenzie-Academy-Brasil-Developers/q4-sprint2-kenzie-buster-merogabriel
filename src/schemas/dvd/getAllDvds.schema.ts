import * as yup from 'yup'

const getAllDvdsSchema = yup
  .array()
  .of(
    yup.object().shape({
      dvd_id: yup.string(),
      name: yup.string(),
      duration: yup.string(),
      stock: yup.object().shape({
        stock_id: yup.string(),
        quantity: yup.number(),
        price: yup.number(),
      }),
    })
  )
  .required()

export default getAllDvdsSchema
