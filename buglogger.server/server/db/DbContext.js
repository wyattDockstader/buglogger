import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { NoteSchema } from '../models/Note'
import { BugSchema } from '../models/Bug'
import { AccountSchema } from '../models/Account'

class DbContext {
  Note = mongoose.model('Note', NoteSchema);
  Bug = mongoose.model('Bug', BugSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
