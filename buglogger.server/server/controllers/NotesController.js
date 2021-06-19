import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('/:id/notes', this.getNotesByBugId)
      .post('', this.createNote)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async editNote(req, res, next) {
    if (req.body.closed) {
      return res.send('Bug is closed,you cant edit')
    } else {
      try {
        const note = await notesService.editNote(req.params.id, req.body)
        return res.send(note)
      } catch (error) {
        next(error)
      }
    }
  }

  async createNote(req, res, next) {
    req.body.creatorId = req.account.id
    try {
      const note = await notesService.createNote(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.getNotesByBugId(req.params.id)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
