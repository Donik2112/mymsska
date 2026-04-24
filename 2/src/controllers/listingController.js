const Listing = require('../models/Listing');

exports.getAll = async (req, res) => {
  const { q, min, max, category } = req.query;

  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }

  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
  }

  if (category) filter.category = category;

  const listings = await Listing.find(filter);
  res.json(listings);
};