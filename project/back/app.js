const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
const fileRouter = require('./routes/boardfileRouter');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/file', fileRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
