const User = require('./User');
const Listing = require('./Listing');
const Comment = require('./Comment');
const Message = require('./Message');

User.hasMany(Listing, { foreignKey: 'owner_id' });
Listing.belongsTo(User, { foreignKey: 'owner_id' });

User.hasMany(Comment);
Comment.belongsTo(User);

Listing.hasMany(Comment);
Comment.belongsTo(Listing);

User.hasMany(Message, { foreignKey: 'sender_id' });
User.hasMany(Message, { foreignKey: 'receiver_id' });

module.exports = { User, Listing, Comment, Message };