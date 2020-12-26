const author = async (note, args, { models }) => {
  return await models.User.findById(note.author);
};

const favoritedBy = async (note, args, { models }) => {
  return await models.User.find({ _id: { $in: note.favoritedBy } });
};

module.exports = {
  author,
  favoritedBy,
};