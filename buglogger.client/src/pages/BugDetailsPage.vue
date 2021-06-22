<template>
  <div v-if="bug == null">
    Loading ....
  </div>
  <div v-else>
    <div class="bugDetailsPage container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="col-lg-8 d-flex flex-column">
          <h1 class="mt-3">
            {{ bug.title }}
          </h1>
          <p>Reported By: {{ bug.creator.name }}</p>
          <div v-if="bug.closed == false" class="dropdown">
            <button v-if="bug.creator.id === account.id"
                    class="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenu3"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
            >
              Edit Bug
            </button>
            <form class="dropdown-menu p-4" @submit.prevent="editBug">
              <div class="form-group">
                <label class="sr-only" for="title">Bug Title</label>
                <input type="text" class="form-control" v-model="state.editedBug.title" placeholder="Bug Title">
              </div>
              <div class="form-group">
                <label class="sr-only" for="description">Description</label>
                <input type="text" class="form-control" v-model="state.editedBug.description" placeholder="Description">
              </div>
              <button type="submit" class="btn btn-primary">
                Edit This Bug!
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-2 d-flex flex-column">
          <div v-if="bug.creator.id === account.id">
            <button v-if="bug.closed == false" class="btn btn-danger mt-3 mb-3" @click="closeBug">
              Close Bug
            </button>
          </div>
          <div class="d-flex align-items-center">
            <p>status:</p>
            <h3>{{ isClosed(bug.closed) }}</h3>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <p class="p-3">
          {{ bug.description }}
        </p>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-11 d-flex mt-5 mb-2">
          <h2>Notes</h2>
          <div v-if="bug.closed == false" class="dropdown">
            <button class="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
            >
              Add Note
            </button>
            <form class="dropdown-menu p-4" @submit.prevent="createNote">
              <div class="form-group">
                <label class="sr-only" for="Note">Message</label>
                <input type="text" class="form-control" v-model="state.newNote.body" placeholder="Note" required>
              </div>
              <button type="submit" class="btn btn-primary">
                Add This Note!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-11">
          <table style="width: 90vw">
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th v-if="bug.closed == false" class="text-center">
                Delete
              </th>
            </tr>
            <Note v-for="note in notes" :key="note.id" :note="note" />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'BugDetailsPage',
  setup() {
    const state = reactive({
      newNote: {},
      editedBug: {}
    })
    const route = useRoute()
    onMounted(() => {
      bugsService.getBugById(route.params.id)
      notesService.getNotesByBugId(route.params.id)
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      isClosed(val) {
        return val ? 'Closed' : 'Open'
      },
      closeBug() {
        if (confirm('Do you really want to close this Bug ??')) { bugsService.closeBug(route.params.id) }
      },
      createNote() {
        state.newNote.bug = route.params.id
        notesService.createNote(state.newNote)
        state.newNote = {}
      },
      editBug() {
        logger.log(route.params.id, state.editedBug)
        bugsService.editBug(route.params.id, state.editedBug)
        state.editedBug = {}
      }
    }
  }

}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #36ec11;
}
tr:nth-child(odd) {
  background-color: #93ee81;
}
</style>
