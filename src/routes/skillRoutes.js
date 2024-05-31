// src/routes/skillRoutes.js

const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middleware/authMiddleware');
const Skill = require('../models/Skill');

router.post('/add-skill', authMiddleware, skillController.addSkill);
router.get('/users', skillController.getAllUsers);

router.delete('/delete-skill/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
