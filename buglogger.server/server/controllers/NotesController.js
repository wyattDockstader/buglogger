import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
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
      const bug = await bugsService.getBugById(req.body.bug)
      if (bug.closed === false) {
        const note = await notesService.createNote(req.body)
        return res.send(note)
      }
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
