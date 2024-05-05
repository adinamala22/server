const UserLogIn = require('../models/UserLogIn'); // Import UserLogIn model

class UserLogInService {
  async getAllLogins() {
    try {
      const logins = await UserLogIn.find();
      return logins;
    } catch (error) {
      throw new Error('Error while fetching user logins');
    }
  }

  async getLoginById(userId) {
    try {
      const login = await UserLogIn.find({userId});
      console.log(login);
      return login;
    } catch (error) {
      throw new Error('Error while fetching user login by ID');
    }
  }

  async insertLogin(loginData) {
    try {
        // const user  = new UserLogIn(loginData)
        // const newLogin = await user.save();
      const newLogin = await UserLogIn.create(loginData);
      return newLogin;
    } catch (error) {
      throw new Error('Error while inserting user login');
    }
  }

  async updateProfile(userId, updatedData) {
    // try {
      const updatedLogin = await UserLogIn.findOneAndUpdate({userId}, updatedData, { new: true });
      return updatedLogin;
    // } catch (error) {
    //   throw new Error('Error while updating user profile');
    // }
  }

  async deleteLogin(userId) {
    try {
      await UserLogIn.deleteOne({userId});
    } catch (error) {
      throw new Error('Error while deleting user login');
    }
  }

  async getDonorsByAddress(address) {
    try {
      const donors = await UserLogIn.find({ accountType: 'donor', address: { $regex: new RegExp(address, 'i') } });
      return donors;
    } catch (error) {
      throw new Error('Error while fetching donors by address');
    }
  }

  async authenticate(userName, password) {
    try {
      const user = await UserLogIn.findOne({ userName, password });
      if (user) {
        return 'success';
      } else {
        return 'failure';
      }
    } catch (error) {
      throw new Error('Error while authenticating user');
    }
  }

  async getDonors() {
    try {
      const donors = await UserLogIn.find({ accountType: 'donor' });
      return donors;
    } catch (error) {
      throw new Error('Error while fetching donors');
    }
  }

  async authenticateDonor(userName, password) {
    try {
      const donor = await UserLogIn.findOne({ userName, password, accountType: 'donor' });
      if (donor) {
        return 'success';
      } else {
        return 'failure';
      }
    } catch (error) {
      throw new Error('Error while authenticating donor');
    }
  }

  async authenticateRecipient(userName, password) {
    try {
      const recipient = await UserLogIn.findOne({ userName, password, accountType: 'recipient' });
      if (recipient) {
        return 'success';
      } else {
        return 'failure';
      }
    } catch (error) {
      throw new Error('Error while authenticating recipient');
    }
  }

  async getRecipients() {
    try {
      const recipients = await UserLogIn.find({ accountType: 'recipient' });
      return recipients;
    } catch (error) {
      throw new Error('Error while fetching recipients');
    }
  }
}

module.exports = UserLogInService;
