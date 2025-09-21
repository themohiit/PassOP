const Password = require("../models/password");
const { v4: uuidv4 } = require("uuid");

// Generate a new unique ID
// const userID = uuidv4();
// console.log(id);
// Example output: "a9b1d2c3-4e56-789f-ab12-c34d56e78f90"

// Get passwords of logged-in user
const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ UserId: req.user.id });
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add new password for logged-in user
const addPassword = async (req, res) => {
  try {
    const { website, username, password } = req.body;

    const newPassword = new Password({
      UserId: req.user.id,
      website,
      username,
      password, // Consider encrypting this in production
    });

    await newPassword.save();
    res.status(201).json({ message: req.user.id });
  } catch (error) {
    res.status(500).json({ message: req.user.id, error });
  }
};

const deletepassword = async (req, res) => {
  try {
    const passid = req.params.id;
    const password = await Password.findById(passid);

    if (!password) {
      res.status(404).json({
        success: false,
        message: "password not found",
      });
    }
    await Password.deleteOne({ _id: passid });
    res.status(200).json({
      success: true,
      message: "password deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  getPasswords,
  addPassword,
  deletepassword,
};
