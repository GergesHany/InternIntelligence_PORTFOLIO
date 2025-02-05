const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
  
    const get_user = await User.findOne({ email }).exec(); // exec() returns a promise
    if (get_user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
    const hashedPassword = await bcrypt.hash(password, salt);
  
    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      const AccessToken = jwt.sign({ user_id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: '15m',
      });
  
      const RefreshToken = jwt.sign({ user_id: user._id }, process.env.REFRESH_TOKEN, {
        expiresIn: '7d',
      });
  
      res.cookie('jwt', RefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(201).json({ AccessToken });

    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Login
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const user = await User.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
  
    const AccessToken = jwt.sign({ user_id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: '15m',
    });
  
    const RefreshToken = jwt.sign({ user_id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: '7d',
    });
  
    res.cookie('jwt', RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  
    res.json({
      AccessToken,
      email: user.email,
      name: user.name,
    });
};

// Logout
const logout = (req, res) => {
    if (!req.cookies.jwt) {
      return res.status(400).json({ message: 'User not logged in' });
    }

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    res.json({ message: 'Logged out' });
};


module.exports = {
    register,
    login,
    logout,
}