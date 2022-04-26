<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="d-flex">
      <router-link class="mx-3" to="/about/wow">wow</router-link>
      <router-link class="mx-3" to="/about/wow/eoe">eoe</router-link>
      <router-link class="mx-3" to="/about/wow/ror">ror</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
