import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    logger.log(AppState.bugs)
  }
}
export const bugsService = new BugsService()
