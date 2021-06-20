<template>
  <div class="bugDetailsPage container-fluid">
    <div class="row d-flex justify-content-around">
      <div class="col-lg-8 d-flex flex-column">
        <h1>{{ bug.title }}</h1>
        <p>Reported By: {{ bug.creator.name }}</p>
      </div>
      <div class="col-lg-2 d-flex flex-column">
        <button v-if="bug.closed == false" class="btn btn-danger mt-3 mb-3" @click="closeBug">
          Close Bug
        </button>
        <div class="d-flex align-items-center">
          <p>status:</p>
          <h3>{{ isClosed(bug.closed) }}</h3>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-11 border border-primary">
        <p>{{ bug.description }}</p>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-11 d-flex mt-5 mb-2">
        <h2>Notes</h2>
        <div class="dropdown">
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
            <th>Delete</th>
          </tr>
          <Note v-for="note in notes" :key="note.id" :note="note" />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { AppState } from '../AppState'

export default {
  name: 'BugDetailsPage',
  setup() {
    const state = reactive({
      newNote: {
        body: ''
      }
    })
    const route = useRoute()
    watchEffect(async() => {
      await bugsService.getBugById(route.params.id)
      await notesService.getNotesByBugId(route.params.id)
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      isClosed(val) {
        return val ? 'closed' : 'open'
      },
      closeBug() {
        bugsService.closeBug(route.params.id)
      },
      createNote() {
        state.newNote.bug = route.params.id
        notesService.createNote(state.newNote)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
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
