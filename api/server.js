const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: 'booger',
  secret: process.env.COOKIE_SECRET || 'is it a secret? is it safe?',
  cookie: {
    maxAge: 100*60*60,//valid for one hour in milliseconds
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: true
  },
  resave:false,
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up', session: req.session});
});

module.exports = server;
