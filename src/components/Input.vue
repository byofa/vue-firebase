<template>
  <div class="control">
    <input class="input" :type="type" :name="name" :v-model="name" />
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    type: String,
    name: String,
  },
};
</script>
