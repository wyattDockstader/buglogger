import { AppState } from '../AppState'
import { router } from '../router'
import Notification from '../utils/Notification'
import { api } from './AxiosService'
import { notesService } from './NotesService'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      Notification.toast(error, 'couldnt get bugs')
    }
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      await router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
    } catch (error) {
      Notification.toast(error, 'couldnt submit your bug')
    }
  }

  async getBugById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
      await notesService.getNotesByBugId(id)
      await router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
    } catch (error) {
      Notification.toast(error, 'couldnt get your bugs')
    }
  }

  async editBug(id, editedBug) {
    AppState.activeBug = null
    await api.put('api/bugs/' + id, editedBug)
    this.getBugById(id)
  }

  async closeBug(id) {
    const res = await api.delete('api/bugs/' + id)
    AppState.activeBug = null
    AppState.activeBug = res.data
  }
}

export const bugsService = new BugsService()
