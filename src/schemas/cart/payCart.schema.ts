import * as yup from 'yup'

const payCartSchema = yup.object().shape({
  cart: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          cart_id: yup.string().required(),
          paid: yup.boolean().required(),
          total: yup.number().positive().required(),
          dvd: yup.object().shape({
            dvd_id: yup.string().required(),
            name: yup.string().required(),
            duration: yup.string().required(),
          }),
        })
        .required()
    )
    .required(),
})

export default payCartSchema
