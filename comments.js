//create web server
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');
const { auth } = require('../middleware/auth');