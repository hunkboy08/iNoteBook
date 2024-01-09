const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes.model.js')
const { body, validationResult } = require('express-validator')

// Route 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    // Ensure that req.user is an ObjectId, not an object like { id: '...' }
    const userObjectId = req.user.id || req.user;

    const notes = await Notes.find({ user: userObjectId });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add new notes using post login required
router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure that req.user is an ObjectId, not an object like { id: '...' }
    const userObjectId = req.user.id || req.user;

    const note = new Notes({
      title,
      description,
      tag,
      user: userObjectId,
    });

    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 3: Update an existing notes using put "/api/auth/updatenote" : login required
router.put('/updatenotes/:id', fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a new newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it 
    try {
      let notes = await Notes.findById(req.params.id)
      if (!notes) {
        return res.status(401).send("Not found")
      }
      if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
      }
      notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json(notes)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

//Route 4: delete an existing notes using delete"/api/auth/deletenotes" : login required

router.delete('/deletenotes/:id', fetchuser,
  async (req, res) => {
  // Find the note to be delete and delete it 
    try {
      let notes = await Notes.findById(req.params.id);
      if (!notes) {
        return res.status(404).send("Not found")
      }
      // Allow deletion only if user own this note
      if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
      }
      notes = await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted" });
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })


module.exports = router;
