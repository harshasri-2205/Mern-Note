import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes)
})

const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        res.status(400)
        throw new Error("Please fill all the fields")
    } else {
        const note = new Note({ user: req.user._id, title, category, content })
        const createNote = await note.save();
        res.status(201).json(createNote)
    }
    

})
 
const getNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findNote = await Note.findOne({ _id: id });
    if (!findNote) {
        res.status(404)
        throw new Error("Note not Found")
    }
    else {
        res.status(200).json(findNote)
    }
})

const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findOne({ _id: req.params.id });
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action")
    } 
    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;
        const updatedNote = await note.save();
        res.json(updatedNote)

    } else {
        throw new Error("Notes not  find")
    }
    
    
})

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id });
    if (!note) {
        res.status(404)
        throw new Error("Note not FOund")

    }
     if (note.user.toString() !== req.user._id.toString()) {
       res.status(401);
       throw new Error("You can't perform this action");
     } 
    if (note) {
        await note.deleteOne({_id:id});
        res.status(200).json({message:"Note delete"})
    }
})

export { getNotes, createNote, getNote, updateNote, deleteNote };