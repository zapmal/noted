const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { 
  AuthenticationError, 
  ForbiddenError 
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../utils/gravatar');
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (parent, { username, email, password }, { models }) => {
  email = email.trim().toLowerCase();
  const hashed = bcrypt.hashSync(password, 10);
  const avatar = gravatar(email);

  try {
    const user = await models.User.create({
      username,
      email,
      avatar,
      password: hashed
    });

    return jwt.sign({ id: user._id }, JWT_SECRET);
  } catch (error) {
    throw new Error('Error creating account.');
  }
};

const signIn = async (parent, { username, email, password }, { models }) => {
  if (email) {
    email = email.trim().toLowerCase();
  }
    
  const user = await models.User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new AuthenticationError('Error signing in.');
  }

  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    throw new AuthenticationError('Error signing in.');
  }

  return jwt.sign({ id: user._id }, JWT_SECRET);
};

const newNote = async (parent, args, { models, user }) => {

  if (!user) {
    throw new AuthenticationError('You must be signed in to create a note.');
  }

  try {
    return await models.Note.create({
      content: args.content,
      author: mongoose.Types.ObjectId(user.id),
      favoriteCount: 0
    });
  } catch (error) {
    throw new Error('Error saving the new note.');
  }
};

const updateNote = async (parent, { id, content }, { models, user }) => {

  if (!user) {
    throw new AuthenticationError('You must be signed in to update a note.');
  }

  const note = await models.Note.findById(id);

  if (note && String(note.author) !== user.id) {
    throw new ForbiddenError('You don\'t have permissions to update this note.');
  }

  try {
    return await models.Note.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: { content }
      },
      {
        new: true
      }
    );
  } catch (error) {
    throw new Error('Error updating note.');
  }
};

const deleteNote = async (parent, { id }, { models, user }) => {
  
  if (!user) {
    throw new AuthenticationError('You must be signed in to delete a note.');
  }

  const note = await models.Note.findById(id);

  if (note && String(note.author) !== user.id) {
    throw new ForbiddenError('You don\'t have permissions to delete this note.');
  }

  try {
    await note.remove();
    return true;
  } catch (error) {
    return false;
  }
};

const toggleFavorite = async (parent, { id }, { models, user }) => {
  if (!user) {
    throw new AuthenticationError();
  }

  const noteCheck = await models.Note.findById(id);
  const hasUser = noteCheck.favoritedBy.indexOf(user.id);

  if (hasUser >= 0) {
    return await models.Note.findByIdAndUpdate(
      id, 
      {
        $pull: {
          favoritedBy: mongoose.Types.ObjectId(user.id)
        },
        $inc: {
          favoriteCount: -1
        }
      },
      {
        new: true
      }
    );
  } else {
    return await models.Note.findByIdAndUpdate(
      id,
      {
        $push: {
          favoritedBy: mongoose.Types.ObjectId(user.id)
        },
        $inc: {
          favoriteCount: 1
        }
      },
      {
        new: true
      }
    );
  }
};

// TODO: Suggest note improvement(?)

module.exports = {
  signUp, 
  signIn, 
  newNote,  
  updateNote,
  deleteNote,
  toggleFavorite,
};