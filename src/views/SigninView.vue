<template>
  <v-row justify="center">
    <v-col cols="12" sm="6" md="6">
      <v-card variant="outlined" class="border-2">
        <v-card-content>
          <form @submit.prevent="handleSubmit">
            <v-text-field
              v-if="!isSignin"
              label="Name*"
              variant="outlined"
              color="black"
              v-model="userDetails.name"
              type="text"
              required
            ></v-text-field>

            <v-text-field
              label="Email*"
              variant="outlined"
              color="black"
              v-model="userDetails.email"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              label="Passowrd*"
              variant="outlined"
              color="black"
              v-model="userDetails.password"
              type="password"
              required
            ></v-text-field>

            <v-btn
              variant="outlined"
              color="black"
              class="border-2 bg-light-orange"
              type="submit"
              block
              size="large"
            >
              {{ isSignin ? "Login" : "Signup" }}</v-btn
            >
            <div v-if="isSignin">
              dont have an account ?
              <v-btn variant="link" @click="isSignin = false"
                >signup here</v-btn
              >
            </div>
            <div v-if="!isSignin">
              have an account ?
              <v-btn variant="link" @click="isSignin = true">signin here</v-btn>
            </div>
          </form>
          <div class="my-3">
            <v-row no-gutters justify="center">
              <v-col cols="5" justify="center" align="center">
                <v-divider class="my-3" thickness="2" color="black" />
              </v-col>
              <v-col justify="center" align="center" cols="2"> OR </v-col>
              <v-col cols="5" justify="center" align="center">
                <v-divider class="my-3" thickness="2" color="black" />
              </v-col>
            </v-row>
          </div>
          <v-btn
            variant="outlined"
            color="black"
            block
            size="large"
            class="border-2 border-black bg-red-darken-3"
            @click="signInWithGoogle"
          >
            signin With Google
          </v-btn>
        </v-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { reactive, ref } from "vue";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const userDetails = reactive({
      name: "",
      email: "",
      password: "",
    });
    const isSignin = ref(true);

    const store = useStore();
    const router = useRouter();
    console.log(getAuth().currentUser);
    if (getAuth().currentUser) {
      console.log("ashish");
      router.push({ name: "home" });
    }

    const registerUser = () => {
      store.dispatch("user/registerUser", userDetails).then(() => {
        router.push({
          name: "home",
        });
      });
    };

    const signinUser = () => {
      store.dispatch("user/signinUser", userDetails).then(() => {
        router.push({
          name: "home",
        });
      });
    };

    function handleSubmit() {
      if (isSignin.value) {
        signinUser();
      } else {
        registerUser();
      }
    }

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then(() => {
          router.push({ name: "home" });
        })
        .catch((error) => {
          alert(error.message);
        });
    };

    return {
      userDetails,
      isSignin,
      handleSubmit,
      signInWithGoogle,
    };
  },
};
</script>
