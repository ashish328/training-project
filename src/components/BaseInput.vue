<template>
  <div class="base-input">
    <v-text-field
      :prepend-inner-icon="prependIcon"
      :label="label"
      variant="outlined"
      color="black"
      :value="value"
      @input="search"
      hide-details
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["value", "prependIcon", "label"],
  emits: ["input"],
  methods: {
    search(event) {
      console.log(event);
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  ::v-deep .v-field__outline {
    --v-field-border-width: 2px !important;
    --v-field-border-opacity: 1;
    --v-field-border-radius: 10px;
    .v-field__outline {
      &__start {
        border-radius: 14px 0 0 14px;
      }
      &__end {
        border-radius: 0 14px 14px 0;
      }
    }
  }
}
</style>
