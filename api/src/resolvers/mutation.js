const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { 
  AuthenticationError, 
  ForbiddenError 
} = require('apollo-server-express');
require('dotenv').config();

// https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt

const gravatar = require('../utils/gravatar');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();

    const hashed = await bcrypt.hashSync(password, 10);
    console.log('from signup:', hashed);
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
      console.log(error);
      throw new Error('Error creating account.');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    
    const user = await models.User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      throw new AuthenticationError('Error signing in.');
    }

    const valid = await bcrypt.compareSync(password, user.password);

    if (!valid) {
      throw new AuthenticationError('Error signing in.');
    }

    return jwt.sign({ id: user._id }, JWT_SECRET);
  },
  newNote: async (parent, { content }, { models }) => {
    try {
      return await models.Note.create({
        content: content,
        author: 'Zondazx',
      });
    } catch (error) {
      throw new Error('Error saving the new note.');
    }
  },
  updateNote: async (parent, { id, content }, { models }) => {
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
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  }
};