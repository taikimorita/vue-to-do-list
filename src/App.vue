<template>
  <div>
    <div class="tabs">
      <router-link to="/" exact-active-class="active-tab">To-Do List</router-link>
      <router-link to="/history" exact-active-class="active-tab">Item History</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
}
</style>
