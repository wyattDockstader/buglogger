import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getBugById)
      .put('/:id', this.editBug)
      .post('', this.createBug)
      .delete('/:id', this.changeStatus)
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.account.id
      const bug = await bugsService.createBug(req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.filterBug(req.params.id, req.body)
      if (bug.closed === false) {
        const fBug = await bugsService.editBug(req.params.id, req.body)
        return res.send(fBug)
      }
    } catch (error) {
      next(error)
    }
  }

  async changeStatus(req, res, next) {
    try {
      const bug = await bugsService.changeStatus(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
