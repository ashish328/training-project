<template>
  <div class="text-h2">{{ comp }}</div>
  <router-view></router-view>
</template>

<script>
export default {
  props: ["comp"],
};
</script>
