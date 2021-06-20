<template>
  <div class="BugsPage m-3">
    <div class="dropdown">
      <button class="btn btn-success dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
      >
        Add Bug
      </button>
      <form class="dropdown-menu p-4" @submit.prevent="createBug">
        <div class="form-group">
          <label class="sr-only" for="title">Bug Title</label>
          <input type="text" class="form-control" v-model="state.newBug.title" placeholder="Bug Title" required>
        </div>
        <div class="form-group">
          <label class="sr-only" for="description">Description</label>
          <input type="text" class="form-control" v-model="state.newBug.description" placeholder="Description" required>
        </div>
        <button type="submit" class="btn btn-primary">
          Add This Bug!
        </button>
      </form>
    </div>
    <table style="width: 90vw">
      <tr>
        <th>Title</th>
        <th>Reported by</th>
        <th class="mdi mdi-sort">
          Status
        </th>
        <th>Last reported on</th>
      </tr>
      <Bug v-for="bug in bugs" :key="bug._id" :bug="bug" />
    </table>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugsPage',
  setup() {
    const state = reactive({
      newBug: {
        title: '',
        description: ''
      }
    })
    watchEffect(async() => {
      await bugsService.getBugs()
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      async createBug() {
        await bugsService.createBug(state.newBug)
      }

    }
  },
  components: {}
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
