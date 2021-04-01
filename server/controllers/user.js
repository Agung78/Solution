const { User } = require('../models')
class Controller {
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body
      const newUser = await User.create({ name, email, password, role })
      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }
  static async login(req, res) {
    // res.status(200).json('ini controller Owner')
    try {
      const { email, password } = req.body
      const userLogin = await User.findOne({
        where: {
          email
        }
      })
      if (userLogin.password === password) {
        res.status(200).json(userLogin)
      } else {
        throw res.status(404).json({ msg: 'Email/password is wrong' })
      }
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  static logout(req, res) {
    res.status(200).json('ini controller Owner')
  }
}
module.exports = Controller