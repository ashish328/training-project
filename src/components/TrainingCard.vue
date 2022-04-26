<template>
  <v-card variant="outlined" class="mx-auto border-2" rounded="xl">
    <div class="pa-3">
      <router-link
        :to="{ name: 'training-details', params: { id: training.id } }"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="150"
          cover
          class="rounded-t-xl"
        >
        </v-img>
      </router-link>
    </div>
    <div
      class="pa-3 pt-0 d-flex flex-no-wrap justify-space-between align-center"
    >
      <v-card-header class="pa-0 pt-0">
        <v-card-header-text>
          <v-card-title class="text-h5">{{ training.title }}</v-card-title>
          <v-card-subtitle class="pb-0 text-grey-darken-5 font-weight-medium">
            {{ trainer.name }}
          </v-card-subtitle>
        </v-card-header-text>
      </v-card-header>
      <v-avatar
        size="large"
        class="border-2 border-black pa-1 bg-light-orange font-weight-bold"
      >
        {{ avatar }}
      </v-avatar>
    </div>
    <v-card-text class="text-start pa-3 pt-0">
      <v-chip
        class="mr-2 border-2"
        color="black"
        size="small"
        variant="outlined"
      >
        <v-icon start icon="mdi-file-document-outline"></v-icon>
        20
      </v-chip>
      <v-chip
        class="mr-2 border-2"
        color="black"
        size="small"
        variant="outlined"
      >
        <v-icon start icon="mdi-account-group"></v-icon>
        20
      </v-chip>
    </v-card-text>
    <v-card-text class="pa-3 pt-0">
      <v-row no-gutters class="align-center text-black">
        <v-icon start icon="mdi-calendar-clock-outline mr-2"></v-icon>
        <div class="font-weight-bold">
          <span v-format:date="fromDate"></span> -
          <span v-format:date="toDate"></span><br />
          <span v-format:time="fromDate"></span> -
          <span v-format:time="toDate"></span>
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed } from "vue";
// import { mapState } from "vuex";
import { useStore } from "vuex";
export default {
  name: "TrainingComponent",
  props: ["training"],
  // computed: {
  //   ...mapState({
  //     trainers: (state) => state.user.usersList,
  //   }),
  //   fromDate() {
  //     return this.training.fromDate.toDate();
  //   },
  //   toDate() {
  //     return this.training.toDate.toDate();
  //   },
  //   trainer() {
  //     return (
  //       this.trainers.find((trainer) => trainer.id === this.training.trainer) ||
  //       {}
  //     );
  //   },
  //   avatar() {
  //     return (
  //       this.trainer.name &&
  //       this.trainer.name.toLocaleUpperCase().substring(0, 2)
  //     );
  //   },
  // },
  setup(props) {
    const store = useStore();

    const trainers = computed(() => store.state.user.usersList);

    const fromDate = computed(() => props.training.fromDate.toDate());

    const toDate = computed(() => props.training.toDate.toDate());

    const trainer = computed(
      () =>
        trainers.value.find(
          (trainer) => trainer.id === props.training.trainer
        ) || {}
    );

    const avatar = computed(
      () =>
        trainer.value.name &&
        trainer.value.name.toLocaleUpperCase().substring(0, 2)
    );

    return {
      fromDate,
      toDate,
      trainer,
      avatar,
    };
  },
};
</script>
