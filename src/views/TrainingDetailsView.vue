<template>
  <v-container>
    <h2>{{ training.title }}</h2>
    <base-input
      prependIcon="mdi-magnify"
      label="search"
      class="mb-10"
      @input="updateSearch"
      :value="searchTerm"
    />
    <div class="training-details mb-10">
      <v-card
        variant="outlined"
        class="mb-3 border-2 rounded-lg"
        v-for="topic in availableTopics"
        :key="topic.id"
      >
        <v-card-title>
          <v-checkbox
            color="success"
            :label="topic.name"
            v-model="topic.completed"
            density="compact"
            hide-details
          ></v-checkbox>
        </v-card-title>
      </v-card>
      <router-view></router-view>
    </div>
    <add-training-topic v-if="isTrainer" :trainingId="id" />
  </v-container>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import AddTrainingTopic from "../components/AddTrainingTopic.vue";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
export default {
  components: { BaseInput, AddTrainingTopic },
  props: ["id"],
  data() {
    return {
      training: {},
      topics: [],
      searchTerm: "",
      activeSearchTerm: "",
    };
  },
  computed: {
    user: function () {
      return this.$store.state.user.userCred;
    },
    isTrainer: function () {
      if (!this.user) return false;
      return this.training.trainer === this.user.uid;
    },
    availableTopics() {
      let filteredTopics = [];
      if (this.activeSearchTerm) {
        filteredTopics = this.topics.filter((topic) =>
          topic.name
            .toLocaleLowerCase()
            .includes(this.activeSearchTerm.toLocaleLowerCase())
        );
      } else if (this.topics) {
        filteredTopics = this.topics;
      }
      return filteredTopics;
    },
  },
  watch: {
    searchTerm(val) {
      setTimeout(() => {
        if (val === this.searchTerm) {
          this.activeSearchTerm = val;
        }
      }, 300);
    },
  },
  methods: {
    updateSearch(val) {
      console.log(val);
      this.searchTerm = val;
    },
  },
  async beforeMount() {
    const trainingSnap = await getDoc(doc(db, "trainings", this.id));
    this.training = trainingSnap.data();

    const collectionRef = collection(
      doc(collection(db, "trainings"), this.id),
      "topics"
    );
    const topicSnapshot = await getDocs(collectionRef);
    const topicsData = [];
    topicSnapshot.forEach((snap) => {
      topicsData.push({ ...snap.data(), id: snap.id });
    });
    this.topics = topicsData;
  },
};
</script>

<style lang="scss" scoped>
.training-details {
  ::v-deep .v-input__control {
    .v-label {
      color: black;
      line-height: 2rem;
      font-size: 1.25rem;
      font-weight: 500;
      margin-left: 1rem;
      opacity: 1;
    }
  }
}
</style>
