const express = require('express');
const UserLogInService = require('../services/userLoginService');
const UserLogIn = require('../models/UserLogIn');
const jwt = require("jsonwebtoken");
const { promisify } = require("util");


const router = express.Router();
const userLogInService = new UserLogInService();

router.get('/allusers', async (req, res) => {
  try {
    const logins = await userLogInService.getAllLogins();
    res.json(logins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/donors', async (req, res) => {
  try {
    const donors = await userLogInService.getDonors();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: "hi" });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const login = await userLogInService.getLoginById(userId);
    if (!login) {
      return res.status(404).json({ message: 'User login not found' });
    }
    res.json(login);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

router.post('/create', async (req, res) => {
  const loginData = req.body;
  try {
    const newLogin = await userLogInService.insertLogin(loginData);
    res.status(201).json(newLogin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;
  try {
    const updatedLogin = await userLogInService.updateProfile(userId, updatedData);
    res.json(updatedLogin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await userLogInService.deleteLogin(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/donors/address', async (req, res) => {
  const { address } = req.query;
  try {
    const donorsByAddress = await userLogInService.getDonorsByAddress(address);
    res.json(donorsByAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/recipients', async (req, res) => {
  try {
    const recipients = await userLogInService.getRecipients();
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.post('/authenticate', async (req, res) => {
//   const { userName, password } = req.body;
//   try {
//     const authResult = await userLogInService.authenticate(userName, password);
//     if (authResult === 'success') {
//       res.json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid login credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.post('/signup',  async (req, res, next) => {
    try {
      console.log(req.body);
      const newUser = await UserLogIn.create(req.body);
      const token = jwt.sign(
        { id: newUser._id },
        "my_aditya_created_the_secure_and_ultra_long_secret",
        {
          expiresIn: "90d",
        }
      );
      const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), //after th data we mentioned the client will delete it
        // secure: true, //by setting this cookie will only be sent over encryped connection
        httpOnly: true, //cookie cannnot be accessed or modified in any way by the browser
      };
      // first para - name, second - data, third - options
      res.cookie("jwt", token, cookieOptions);
  
      newUser.password = undefined;
      res.status(201).json({
        status: "success",
        token,
        data: {
          newUser,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "error",
        message: err,
      });
    }
  });

  router.post('/login', async (req, res, next) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please Provide emailId and password",
            });
        }

        // Fetch user by email
        const user = await UserLogIn.findOne({ emailId }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "error",
                message: "Incorrect password or emailId",
            });
        }

        console.log(user);
        const token = jwt.sign(
            { id: user._id },
            "my_anish_created_the_secure_and_ultra_long_secret",
            {
                expiresIn: "90d",
            }
        );
        const cookieOptions = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
          status: "success",
          jwt,
          data: user
      });
        // // Redirect based on user role
        // if (user.accountType === 'donor') {
        //     res.status(200).redirect('/donor/dashboard');
        // } else if (user.accountType === 'recipient') {
        //     res.status(200).redirect('/recipient/dashboard');0
        // } else {
        //     // Handle other roles or scenarios
        //     res.status(200).redirect('/default/dashboard');
        // }

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
});

router.post('/donor/authenticate', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const authResult = await userLogInService.authenticateDonor(userName, password);
    if (authResult === 'success') {
      res.json({ message: 'Donor login successful' });
    } else {
      res.status(401).json({ message: 'Invalid donor login credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/recipient/authenticate', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const authResult = await userLogInService.authenticateRecipient(userName, password);
    if (authResult === 'success') {
      res.json({ message: 'Recipient login successful' });
    } else {
      res.status(401).json({ message: 'Invalid recipient login credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
