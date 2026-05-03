import Account from "../models/Account.js";


// CREATE (REGISTER)
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Account.create({ username, email, password });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await Account.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await Account.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Account.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
