const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../db.js');
const jwt = require('jsonwebtoken');

const secretKey = 'a123456789';

router.post('/login',async(req,res)=>{
  try{
    // jwt 다시 발행해야함
    const decoded = await jwt.verify(req.body.mytoken, secretKey);
    const { iat, exp, ...payload } = decoded;
    const newToken = jwt.sign(payload, secretKey, {expiresIn: '1m'});
    return res.json({decoded, newToken});
  }catch(error){
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
})

router.post('/signin', async (req, res) => {
  const oneUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (oneUser === null) {
    return res.send({code: 418, message: '해당하는 User가 없습니다'});
  }
  const payload = {name: oneUser.name, email: oneUser.email};
  try {
    const comp = await bcrypt.compare(req.body.password, oneUser.password);
    if (comp) {
      const token = jwt.sign(payload, secretKey, {expiresIn: '1m'});
      res.json({code: 200, message: '토근이발급되었습니다.', token});
    } else {
      return res.send({code: 419, message: '비밀번호가 다릅니다.'});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

module.exports = router;
