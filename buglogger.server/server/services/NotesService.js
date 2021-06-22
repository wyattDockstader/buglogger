import { dbContext } from '../db/DbContext'

class NotesService {
  async getNotesByBugId(id) {
    const notes = await dbContext.Note.find({ bug: id }).populate('creator', 'name picture')
    return notes
  }

  async getNoteById(id) {
    const note = await dbContext.Note.findById(id)
    return note
  }

  async createNote(newNote) {
    const note = await dbContext.Note.create(newNote)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async editNote(id, newNote) {
    const note = await dbContext.Note.findByIdAndUpdate(id, newNote)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async deleteNote(id) {
    const note = await dbContext.Note.findByIdAndDelete(id)
    return note
  }
}
export const notesService = new NotesService()
