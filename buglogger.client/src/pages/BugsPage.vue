<template>
  <div class="BugsPage">
    <Bug v-for="bug in bugs" :key="bug._id" :bug="bug" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'BugsPage',
  setup(props) {
    onMounted(() => {
      bugsService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs)

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
