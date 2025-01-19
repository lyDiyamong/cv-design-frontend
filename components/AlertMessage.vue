<template>
    <transition name="fade">
        <a-alert
            v-if="alertStore.isVisible"
            class="custom-alert"
            :type="alertStore.type"
            :message="alertStore.message"
            show-icon
            :closable="true"
            @close="alertStore.clearAlert"
        />
    </transition>
</template>

<script lang="ts" setup>
import { useAlertStore } from "~/store/alert"; // Adjust the path if necessary

const alertStore = useAlertStore();

</script>

<style scoped>
.custom-alert {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    max-width: 90%;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
