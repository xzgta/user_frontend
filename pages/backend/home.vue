<template>
  <div>
    <sidebars />
  </div>
</template>

<script>
import sidebars from "~/components/sidebars.vue";

export default {
  auth: true,
  components: {
    sidebars
  }
};
</script>