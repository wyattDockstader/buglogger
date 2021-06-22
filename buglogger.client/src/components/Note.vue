<template>
  <tr>
    <th>
      <img :src="note.creator.picture" alt="creator img" class="creator-img m-1">
      {{ note.creator.name }}
    </th>
    <th>
      {{ note.body }}
    </th>
    <th class="d-flex justify-content-center align-items-center">
      <div v-if="bug.closed == false">
        <button v-if="note.creator.id == account.id" class="btn btn-danger mdi mdi-trash-can-outline text-light" @click="deleteNote(note.id)"></button>
        <span v-else>
          Not your note
        </span>
      </div>
    </th>
  </tr>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
export default {
  props: {
    note: { type: Object, required: true }
  },
  name: 'Note',
  setup(props) {
    return {
      account: computed(() => AppState.account),
      bug: computed(() => AppState.activeBug),
      deleteNote(id) {
        if (confirm('Do you really want to delete this Note ??')) { notesService.deleteNote(id) }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.creator-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
</style>
