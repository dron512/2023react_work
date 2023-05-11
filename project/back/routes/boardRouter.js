const express = require('express');
const router = express.Router();

const {Board, User} = require('../db.js');

router.get('/list/:id?', async (req, res) => {
  console.log(req.params.id);
  const boards = await Board.findAll({
    include: User,
  });
  res.json(boards);
});

module.exports = router;