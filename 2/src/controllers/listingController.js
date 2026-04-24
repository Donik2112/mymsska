const Listing = require('../models/listing');

exports.getAll = async (req, res) => {
  const { q, min, max, category } = req.query;

  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }

  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
  }

  if (category) filter.category = category;

  const listings = await Listing.find(filter).sort({ createdAt: -1 });
  res.json(listings);
};

exports.getOne = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.sendStatus(404);

  res.json(listing);
};

exports.create = async (req, res) => {
  const { title, description, price, category, images = [] } = req.body;

  if (!title || price === undefined) {
    return res.status(400).json({ error: 'title and price are required' });
  }

  const listing = await Listing.create({
    title,
    description,
    price,
    category,
    images,
    owner_id: req.user.id,
  });

  res.status(201).json(listing);
};

exports.update = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.sendStatus(404);

  if (String(listing.owner_id) !== req.user.id) {
    return res.sendStatus(403);
  }

  const { title, description, price, category, images } = req.body;

  if (title !== undefined) listing.title = title;
  if (description !== undefined) listing.description = description;
  if (price !== undefined) listing.price = price;
  if (category !== undefined) listing.category = category;
  if (images !== undefined) listing.images = images;

  await listing.save();
  res.json(listing);
};

exports.delete = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return res.sendStatus(404);

  if (String(listing.owner_id) !== req.user.id) {
    return res.sendStatus(403);
  }

  await listing.deleteOne();
  res.sendStatus(204);
};
