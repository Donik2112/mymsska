module.exports = (model) => async (req, res, next) => {
  const item = await model.findById(req.params.id);

  if (!item) return res.sendStatus(404);
  if (String(item.owner_id) !== req.user.id) return res.sendStatus(403);

  req.item = item;
  next();
};
