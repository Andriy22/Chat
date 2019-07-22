<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.text">{{m.text}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  middleware: ["AuthGuard"],
  head() {
    return {
      title: `Room ${this.user.room}`
    };
  },
  computed: mapState(["user", "messages"])
};
</script>

