const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../bd/user.schema');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Bad email').isEmail(),
    check('password', 'Password must contain at least 6 symbols')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Bad data'
        })
      }
      const { email, password, name } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User is already exist' });
      }
      const hashedPassword = await bcrypt.hash(password, 8)
      let nickName;
      if (name === '') {
        nickName = email;
      } else {
        nickName = name;
      }
      const user = new User({ email, password: hashedPassword, name: nickName })
      await user.save();
      res.status(201).json({ message: 'User created' });

    } catch (e) {
      res.status(500).json({ message: 'Back error. Try again' })
    }
  })

router.post('/login',
  [
    check('email', 'Wrong email').normalizeEmail().isEmail(),
    check('password', 'Wrong password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Wrong email or password'
        })
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Wrong data or smth' })
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong email or password' })
      }
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
      res.json({ token, userId: user.id });
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message: "Server error" })
    }
  })

module.exports = router;