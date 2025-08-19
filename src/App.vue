<template>
  <div>
    <!-- Navigation tabs for routing between pages -->
    <header class="tabs">
      <router-link to="/" exact-active-class="active-tab">To-Do List</router-link>
      <router-link to="/history" exact-active-class="active-tab">Task History</router-link>
      <router-link to="/upload" exact-active-class="active-tab">Image Upload</router-link>
    </header>

    <!-- Display routed component here -->
    <router-view />
  </div>
</template>

<style>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
}

header {
  background: #ebebeb;
  border-radius: 5px;
  padding: 0 1rem;
}
</style>
