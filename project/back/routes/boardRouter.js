const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'a123456789';
const {Board, User} = require('../db.js');

router.get('/list', async (req, res) => {
  console.log(req.params.id);
  const boards = await Board.findAll({
    include: User,
  });
  res.json(boards);
});

router.post('/delete', async (req, res) => {
  try {
    const decoded = await jwt.verify(req.body.mytoken, secretKey);
    const {iat, exp, ...payload} = decoded;
    const newToken = jwt.sign(payload, secretKey, {expiresIn: '1m'});

    await Board.destroy({
      where: {id: req.body.id},
    });

    return res.json({decoded, newToken});
  } catch (err) {
    console.log(err);
    return res.json({message: '세션이만료되어삭제할수없습니다.'});
  }
});

module.exports = router;