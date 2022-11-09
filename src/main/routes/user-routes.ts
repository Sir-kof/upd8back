import { Router } from 'express'
import { User } from '../../infra/db/mysql/models'

export default (router: Router): void => {
  // ---------------------- Create -------------------------------
  router.post('/user', async (req, res) => {
    const {
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    } = req.body
    const resultadoCreate = await User.create({
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    })
    return res.status(200).json(resultadoCreate)
  })

  // ----------------------- Get ---------------------------------
  router.get('/user/:cpf', async (req, res) => {
    const cpf = req.params.cpf
    const user = await User.findOne({ where: { cpf } })
    return res.status(200).json(user)
  })

  // ----------------------- Update -----------------------------
  router.put('/user', async (req, res) => {
    const {
      cpf,
      name,
      address,
      birthday,
      gender,
      state,
      city
    } = req.body

    const resultUpdate = await User.update({
      cpf, name, address, birthday, gender, state, city
    }, {
      where: {
        cpf
      }
    })
    return res.status(200).json(resultUpdate)
  })

  // ----------------------- Delete -----------------------------
  router.delete('/user/:cpf', async (req, res) => {
    const { cpf } = req.body
    const user = await User.destroy({ where: { cpf } })
    return res.status(200).json(user)
  })
}
