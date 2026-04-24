const Comment = require('../models/comment');

exports.create = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    user_id: req.user.id,
    listing_id: req.params.id,
  });

  res.json(comment);
};