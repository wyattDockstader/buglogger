import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
      logger.log(res.data, 'these are the notes')
    } catch (error) {
      Notification.toast(error, 'couldnt get notes')
    }
  }

  async createNote(newNote) {
    const res = await api.post('api/notes', newNote)
    logger.log(res.data)
  }

  async deleteNote(id) {
    await api.delete('api/notes', id)
  }
}
export const notesService = new NotesService()
