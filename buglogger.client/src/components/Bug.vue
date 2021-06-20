<template>
  <tr @click="$router.push({ name: 'BugDetailsPage', params: { id: bug._id }})">
    <th class="text-center">
      {{ bug.title }}
    </th>
    <th class="text-center">
      {{ bug.creator.name }}
    </th>
    <th class="text-center"
        :class="{'closed': bug.closed === true}"
    >
      {{ isClosed(bug.closed) }}
    </th>
    <th class="
        text-center"
    >
      {{ dateFormat(bug.updatedAt) }}
    </th>
  </tr>
</template>

<script>
import { router } from '../router'

export default {
  name: 'Bug',
  props: { bug: { type: Object, required: true } },
  setup() {
    return {
      router,
      isClosed(val) {
        return val ? 'closed' : 'open'
      },
      dateFormat(date) {
        const timeBreak = date.split('T', 1).join().split('-').sort().join('/')
        return timeBreak
      }
    }
  }
}
</script>
// "2021-06-19T05:31:13.422Z"
<style lang="scss" scoped>
.closed {
  text-decoration: line-through ;
  color: red;
}
</style>
