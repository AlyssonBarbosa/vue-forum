<template>
  <span :title="humanFriendlyDate">
    {{ diffForHumans }}
  </span>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";
import { computed } from "vue";

dayjs.extend(relativeTime);
dayjs.extend(localizedDate);

const props = defineProps({
  timestamp: {
    required: true,
    type: [Number, Object as () => { seconds: number; nanoseconds: number }],
  },
});

const normalizedTimestamp = computed(() => {
  return typeof props.timestamp === "number"
    ? props.timestamp
    : props.timestamp.seconds;
});

const diffForHumans = computed(() => {
  return dayjs.unix(normalizedTimestamp.value).fromNow();
});

const humanFriendlyDate = computed(() => {
  return dayjs.unix(normalizedTimestamp.value).format("L LT");
});
</script>

<style scoped></style>
