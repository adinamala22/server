// UserLogIn.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserLogInSchema = new mongoose.Schema({
    userId: { type: Number , required: true },
    accountType: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    aadhaarId: { type: String },
    age: { type: Number },
    emailId: { type: String },
    contact: { type: String },
    name: { type: String },
    address: { type: String },
    doctorCertificate: { type: String },
    medicalReport: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String }
});

UserLogInSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
  
    // we should not save pwd confirm in db
    this.passwordConfirm = undefined;
    next();
  });
  
  // to check whether pwd is correct or not
  
UserLogInSchema.methods.correctPassword = async function (
candidatePassword,
userPassword
) {
return await bcrypt.compare(candidatePassword, userPassword);
};

const UserLogIn = mongoose.model('UserLogIn', UserLogInSchema);

module.exports = UserLogIn;
