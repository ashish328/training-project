<template>
  <v-toolbar dense class="mb-4 bg-light-orange border-2 nav-bar">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title class="text-h4">logo</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/">
      <v-btn variant="outlined" class="border-2 mr-2" color="black">
        Home
      </v-btn>
    </router-link>
    <router-link to="/about">
      <v-btn variant="outlined" class="border-2 mr-2" color="black">
        About
      </v-btn>
    </router-link>
    <router-link to="/signin" v-if="!isLoggedIn">
      <v-btn variant="outlined" class="border-2 mr-2" color="black">
        Signin
      </v-btn>
    </router-link>
    <v-btn
      variant="outlined"
      v-if="isLoggedIn"
      class="border-2 mr-2"
      color="black"
      @click="signout"
    >
      Sign out
    </v-btn>
    <router-link to="/add-training">
      <v-btn variant="outlined" class="border-2" color="black">
        Add Training
      </v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "navBar",
  props: ["isLoggedIn"],
  methods: {
    signout() {
      this.$store.dispatch("user/signoutUser");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  ::v-deep .v-toolbar-title {
    flex: unset;
  }
}
</style>
