<template>
  <label class="label" :for="name">{{ title }}</label>
</template>

<script>
export default {
  name: "Field",
  props: {
    title: String,
    name: String,
  },
};
</script>
