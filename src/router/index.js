import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TrainingDetailsView from "../views/TrainingDetailsView.vue";
import AboutView from "../views/AboutView.vue";
import SigninView from "../views/SigninView.vue";
import RouterSampleView from "../views/RouterSampleView.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListner();
        resolve(user);
      },
      reject
    );
  });
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: SigninView,
    beforeEnter: async (to, from, next) => {
      if (await getCurrentUser()) {
        next({ name: "home" });
      } else {
        next();
      }
    },
  },
  {
    path: "/training",
    redirect: {
      name: "home",
    },
  },
  {
    path: "/training/:id",
    name: "training-details",
    component: TrainingDetailsView,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    children: [
      {
        path: "wow",
        name: "wow",
        component: RouterSampleView,
        props: {
          comp: "wow",
        },
        children: [
          {
            path: "eoe",
            name: "eoe",
            component: RouterSampleView,
            props: {
              comp: "eoe",
            },
          },
        ],
      },
      {
        path: "wow/ror",
        name: "ror",
        component: RouterSampleView,
        props: {
          comp: "wow/ror",
        },
      },
    ],
  },
  {
    path: "/add-training",
    name: "add-training",
    component: () => import("../views/AddTrainingView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const a = await getCurrentUser();
//   console.log(a, "aaaaa");
//   console.log(to, to.meta);
//   if (to.meta.redirectIfSignedIn) {
//     if (await getCurrentUser()) {
//       next("/");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
