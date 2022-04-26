import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase.js";

// initial state
const state = () => ({
  userCred: null,
  userDetails: null,
  usersList: [],
});

// getters
const getters = {};

// actions
const actions = {
  registerUser(ctx, userDetails) {
    return createUserWithEmailAndPassword(
      getAuth(),
      userDetails.email,
      userDetails.password
    )
      .then((data) => {
        setDoc(doc(db, "users", data.user.uid), {
          name: userDetails.name,
        });
        // commit("setUserCred", data.user);
        return data.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  signinUser(ctx, userDetails) {
    console.log(userDetails);
    return signInWithEmailAndPassword(
      getAuth(),
      userDetails.email,
      userDetails.password
    )
      .then((data) => {
        return data.user;
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  signoutUser({ commit }) {
    signOut(getAuth())
      .then(() => {
        commit("setUserCred", null);
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  async fetchUsers({ commit }) {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    commit("setUsersList", data);
  },
};

// mutations
const mutations = {
  setUserCred(state, data) {
    state.userCred = data;
  },
  setUsersList(state, data) {
    state.usersList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
