<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="5">
      <v-card variant="outlined" class="border-2">
        <form class="base-form" @submit.prevent="createTraining">
          <v-card-content>
            <v-text-field
              label="Title"
              variant="outlined"
              color="black"
              v-model="title"
              required
            ></v-text-field>
            <select
              v-model="trainer"
              class="border-2 border-black d-block w-100 rounded-lg pa-3 mb-9"
              style="width: 100%"
            >
              <option selected disabled value="">Select Trainer</option>
              <option v-for="tr in trainers" :key="tr.id" :value="tr.id">
                {{ tr.name }}
              </option>
            </select>
            <v-text-field
              label="From Date"
              variant="outlined"
              color="black"
              type="date"
              v-model="fromDate"
            ></v-text-field>
            <v-text-field
              label="From Time"
              variant="outlined"
              color="black"
              type="time"
              v-model="fromTime"
            ></v-text-field>
            <v-text-field
              label="To Date"
              variant="outlined"
              color="black"
              type="date"
              v-model="toDate"
            ></v-text-field>
            <v-text-field
              label="To Time"
              variant="outlined"
              color="black"
              type="time"
              v-model="toTime"
            ></v-text-field>
            <v-btn
              variant="outlined"
              color="black"
              class="border-2 bg-light-orange"
              type="submit"
              size="large"
              block
            >
              Create Training</v-btn
            >
          </v-card-content>
        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.js";
export default {
  name: "AddTrainingView",
  data() {
    return {
      title: "",
      trainer: "",
      fromDate: new Date(),
      fromTime: "10:00",
      toDate: new Date(),
      toTime: "11:00",
    };
  },
  computed: {
    ...mapState({
      trainers: (state) => state.user.usersList,
    }),
    formatedFromDate() {
      const date = new Date(this.fromDate);
      const hrs = this.fromTime.match(/^(\d+)/)[1];
      const mins = this.fromTime.match(/:(\d+)/)[1];
      date.setHours(hrs);
      date.setMinutes(mins);
      return date;
    },
    formatedToDate() {
      const date = new Date(this.toDate);
      const hrs = this.toTime.match(/^(\d+)/)[1];
      const mins = this.toTime.match(/:(\d+)/)[1];
      date.setHours(hrs);
      date.setMinutes(mins);
      return date;
    },
  },
  methods: {
    async createTraining() {
      const data = {
        title: this.title,
        trainer: this.trainer,
        fromDate: this.formatedFromDate,
        toDate: this.formatedToDate,
      };
      try {
        const docRef = await addDoc(collection(db, "trainings"), data);
        alert(`Document Added: ${docRef.id}`);
        this.clearData();
        this.$router.push({ name: "home" });
      } catch (error) {
        alert(error.message);
      }
    },
    clearData() {
      this.title = "";
      this.trainer = "";
      this.fromDate = new Date();
      this.fromTime = "10:00";
      this.toDate = new Date();
      this.toTime = "11:00";
    },
  },
  mounted() {
    this.$store.dispatch("user/fetchUsers");
  },
};
</script>

<style lang="scss" scoped>
.base-form {
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
