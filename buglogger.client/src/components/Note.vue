<template>
  <tr>
    <th>
      {{ note.id }}
    </th>
    <th>
      {{ note.body }}
    </th>
    <th class="mdi mdi-trash-can-outline text-danger">
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    note: { type: Object, required: true }
  },
  name: 'Note',
  setup(props) {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>

</style>
