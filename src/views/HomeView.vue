<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" sm="8" md="6" align-self="center" class="mb-10">
      <base-input
        prependIcon="mdi-magnify"
        label="search"
        @input="updateSearch"
        :value="searchTerm"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col
      v-for="training in availableTrainings"
      :key="training.id"
      cols="12"
      sm="6"
      md="3"
    >
      <training-component :training="training" />
    </v-col>
  </v-row>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import TrainingComponent from "../components/TrainingCard.vue";
import BaseInput from "../components/BaseInput.vue";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase.js";
import { useStore } from "vuex";
import useSearch from "../hooks/search.js";
// Components

export default defineComponent({
  name: "HomeView",
  components: {
    TrainingComponent,
    BaseInput,
  },
  // data() {
  //   return {
  //     trainings: [],
  //     searchTerm: "",
  //     activeSearchTerm: "",
  //   };
  // },
  // methods: {
  //   async fetchTrainings() {
  //     try {
  //       const snapshot = await getDocs(collection(db, "trainings"));
  //       const data = [];
  //       snapshot.forEach((doc) => {
  //         data.push({ ...doc.data(), id: doc.id });
  //       });
  //       this.trainings = data;

  //       this.$store.dispatch("user/fetchUsers");
  //     } catch (error) {
  //       console.error(error);
  //       alert(error.message);
  //     }
  //   },
  //   updateSearch(val) {
  //     console.log(val);
  //     this.searchTerm = val;
  //   },
  // },
  // computed: {
  //   availableTrainings() {
  //     let trainings = [];
  //     if (this.activeSearchTerm) {
  //       trainings = this.trainings.filter((tr) =>
  //         tr.title
  //           .toLocaleLowerCase()
  //           .includes(this.activeSearchTerm.toLocaleLowerCase())
  //       );
  //     } else if (this.trainings) {
  //       trainings = this.trainings;
  //     }
  //     return trainings;
  //   },
  // },
  // mounted() {
  //   this.fetchTrainings();
  // },
  // watch: {
  //   searchTerm(val) {
  //     setTimeout(() => {
  //       if (val === this.searchTerm) {
  //         this.activeSearchTerm = val;
  //       }
  //     }, 300);
  //   },
  // },

  setup() {
    const store = useStore();

    const trainings = ref([]);
    const fetchTrainings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "trainings"));
        console.log(snapshot);
        const data = [];
        snapshot.forEach((doc) => {
          console.log(doc.data());
          data.push({ ...doc.data(), id: doc.id });
        });
        trainings.value = data;

        store.dispatch("user/fetchUsers");
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    const {
      searchTerm,
      updateSearch,
      availableItems: availableTrainings,
    } = useSearch(trainings, "title");

    onMounted(() => {
      fetchTrainings();
    });

    return {
      updateSearch,
      searchTerm,
      availableTrainings,
    };
  },
});
</script>
