const { Comment } = require('../models')

class Controller {
  static async createComment(req, res) {
    try {
      const { content, poster, ContentId } = req.body
      console.log({ content, poster, ContentId })
      const newComment = await Comment.create({ content, poster, ContentId })
      res.status(201).json(newComment)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  static async listComment(req, res) {
    try {
      const listComment = await Comment.findAll({
        where: {
          ContentId: req.body.ContentId
        }
      })
      res.status(200).json(listComment)
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
}
module.exports = Controller