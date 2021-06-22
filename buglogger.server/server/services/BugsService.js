import { dbContext } from '../db/DbContext'

class BugsService {
  async getAllBugs() {
    const bugs = await dbContext.Bug.find({}).populate('creator', 'name picture')
    return bugs
  }

  async getBugById(id) {
    const bug = await dbContext.Bug.findById(id)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async createBug(newBug) {
    delete newBug.closed
    const bug = await dbContext.Bug.create(newBug)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async filterBug(id) {
    const bug = await dbContext.Bug.findById(id)
    return bug
  }

  async editBug(id, newBug) {
    delete newBug.closed
    const bug = await dbContext.Bug.findByIdAndUpdate(id, newBug)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async changeStatus(id) {
    const bug = await dbContext.Bug.findByIdAndUpdate(id, { closed: true }, { new: true, runValidators: true })
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }
}

export const bugsService = new BugsService()
