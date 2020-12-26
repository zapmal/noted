const notes = async (parent, args, { models }) => {
  return await models.Note.find().limit(50);
};

const note = async (parent, args, { models }) => {
  return await models.Note.findById(args.id);
};

const users = async (parent, args, { models }) => {
  return await models.User.find().limit(25);
};

const user = async (parent, { username }, { models }) => {
  return await models.User.findOne({ username });
};

const me = async (parent, args, { models, user }) => {
  return await models.User.findById(user.id);
};

const noteFeed = async (parent, { cursor }, { models }) => {
  const limit = 10;
  let hasNextPage = false;
  let cursorQuery = {};

  if (cursor) {
    cursorQuery = { _id: { $lt: cursor } };
  }

  let notes = await models.Note.find(cursorQuery)
    .sort({ _id: -1 })
    .limit(limit + 1);
  
  if (notes.length > limit) {
    hasNextPage = true;
    notes = notes.slice(0, -1);
  }

  const newCursor = notes[notes.length - 1]._id;

  return {
    notes,
    cursor: newCursor,
    hasNextPage,
  };
};

module.exports = {
  notes,
  note,
  users,
  user,
  me,
  noteFeed,
};