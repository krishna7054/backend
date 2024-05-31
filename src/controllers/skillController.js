// src/controllers/skillController.js

const Skill = require('../models/Skill');
const User = require('../models/User');

exports.addSkill = async (req, res) => {
  const { name, userId } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let skill = await Skill.findOne({ name });
    if (!skill) {
      skill = new Skill({ name });
      await skill.save();
    }

    if (!user.skills.includes(skill._id)) {
      user.skills.push(skill._id);
    }

    await user.save();

    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('skills');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
