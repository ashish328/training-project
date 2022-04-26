<template>
  <v-row justify="space-between" align="center">
    <v-col cols="10">
      <base-input
        label="Add Topic"
        :value="topic"
        @input="updateTopic"
      ></base-input>
    </v-col>
    <v-col cols="2">
      <v-btn
        variant="outlined"
        class="border-2 mr-2 bg-light-orange"
        color="black"
        size="large"
        block
        @click="addTopic"
        >Add</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import { collection, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  components: {
    BaseInput,
  },
  props: ["trainingId"],
  data() {
    return {
      topic: "",
    };
  },
  methods: {
    updateTopic(val) {
      console.log(val);
      this.topic = val;
    },

    async addTopic() {
      const collectionRef = collection(
        doc(collection(db, "trainings"), this.trainingId),
        "topics"
      );
      const addedDoc = await addDoc(collectionRef, {
        name: this.topic,
        completed: false,
      });
      alert(`Document Added: ${addedDoc.id}`);
      this.topic = "";
    },
  },
};
</script>
