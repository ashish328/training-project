<template>
  <v-app>
    <nav-bar :isLoggedIn="isLoggedIn" />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    isLoggedIn: false,
  }),
  mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      this.$store.commit("user/setUserCred", user);
      if (user) {
        this.isLoggedIn = true;
        // if (this.$route.name === "signin") {
        //   this.$router.push({ name: "home" });
        // }
      } else {
        this.isLoggedIn = false;
      }
    });
  },
};
</script>

<style lang="scss">
* {
  font-family: "Nunito", sans-serif;
}
.border-3 {
  border-width: 3px !important;
  border-style: solid !important;
}
.border-2 {
  border-width: 2px !important;
  border-style: solid !important;
}
.border-black {
  border-color: #000 !important;
}
.bg-light-orange {
  background-color: #ffae5a !important;
  color: #000 !important;
}
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
