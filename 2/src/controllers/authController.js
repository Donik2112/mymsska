const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { email, password, name, avatar_url } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'user already exists' });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password_hash: hash,
    name,
    avatar_url,
  });

  res.status(201).json({
    id: user._id,
    email: user.email,
    name: user.name,
    avatar_url: user.avatar_url,
    created_at: user.created_at,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(404);

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.sendStatus(401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
};
