<template>
    <transition name="fade">
        <a-alert
            v-if="isVisible"
            class="custom-alert"
            :message="message"
            :type="type"
            :closable="closable"
            @close="closeAlert"
            show-icon
        />
    </transition>
</template>

<script lang="ts" setup>
    const {
        type = "info",
        duration = 3000,
        closable = true,
    } = defineProps<{
        message: string;
        type?: "success" | "error" | "info" | "warning";
        duration?: number;
        closable?: boolean;
    }>();

    // Define emits in the setup scope
    const emit = defineEmits<{
        (event: "close"): void;
    }>();

    // Local state to manage visibility of the alert
    const isVisible = ref(true);

    // Automatically hide the alert after `duration` milliseconds
    if (duration > 0) {
        const timer = setTimeout(() => {
            isVisible.value = false;
        }, duration);

        // Clear the timer when component is unmounted
        onUnmounted(() => clearTimeout(timer));
    }

    // Function to close the alert
    const closeAlert = () => {
        isVisible.value = false;
        // Notify parent about close
        emit("close");
    };
</script>

<style scoped>
    .custom-alert {
        position: absolute;
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
