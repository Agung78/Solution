const { Content, UserContent, User } = require('../models')

class Controller {
  static async listContent(req, res) {
    console.log(req.body.id)
    try {
      const list = await UserContent.findAll({
        where: {
          UserId: req.body.id
        },
        include: User
      })
      res.status(200).json(list)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  static async createContent(req, res) {
    try {
      const { title, content, UserId } = req.body
      const newContent = await Content.create({ title, content })
      const newUserContent = await UserContent.create({ UserId, ContentId: newContent.id })
      res.status(201).json({ newContent, newUserContent })
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  static async updateContent(req, res) {
    try {
      const { title, content, id } = req.body
      const newContent = await Content.update(
        { title, content },
        { where: { id } }
      )
      res.status(201).json(newContent)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  static async deleteContent(req, res) {
    try {
      const deleteContent = await Content.destroy({
        where: {
          id: req.body.id
        }
      })
      res.status(200).json(deleteContent)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
}
module.exports = Controller