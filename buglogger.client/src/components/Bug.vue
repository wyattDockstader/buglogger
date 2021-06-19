<template>
  <div class="bug">
    <h4>{{ bug.title }}</h4>
    <p>{{ bug.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'Bug',
  props: { bug: { type: Object, required: true } },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
