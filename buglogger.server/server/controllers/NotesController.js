import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'
import { BadRequest } from '../utils/Errors'

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
    try {
      const bug = await bugsService.filterBug(req.body.bug)
      if (bug.closed === true) {
        throw new BadRequest('Bug is closed,you cant edit note')
      } else {
        const note = await notesService.editNote(req.params.id, req.body)
        return res.send(note)
      }
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    req.body.creatorId = req.account.id
    try {
      const bug = await bugsService.getBugById(req.body.bug)
      if (bug.closed === true) {
        throw new BadRequest('Bug is closed,you cant create a note')
      } else {
        const note = await notesService.createNote(req.body)
        return res.send(note)
      }
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const dNote = await notesService.getNoteById(req.params.id)
      const bug = await bugsService.filterBug(dNote.bug)
      if (bug.closed === true) {
        throw new BadRequest('Bug is closed,you cant create a note')
      } else {
        const note = await notesService.deleteNote(req.params.id)
        return res.send(note)
      }
    } catch (error) {
      next(error)
    }
  }
}
