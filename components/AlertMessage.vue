<template>
    <transition name="fade">
        <a-alert
            v-if="isVisible"
            class="custom-alert"
            :message="alertMessage"
            :type="type"
            :closable="closable"
            @close="handleClose"
            show-icon
        />
    </transition>
</template>

<script lang="ts" setup>
    const {
        type = "info",
        duration = 3000,
        closable = true,
        message,
    } = defineProps<{
        message: string;
        type?: "success" | "error" | "info" | "warning";
        duration?: number;
        closable?: boolean;
    }>();

    const emit = defineEmits<{
        (event: "close"): void;
    }>();

    const alertMessage = ref(""); // Local state for the alert message
    const isVisible = ref(false); // Local state for visibility

    let timer: number | undefined;

    const startAutoClearTimer = () => {
        if (duration > 0) {
            clearTimeout(timer as number);
            timer = setTimeout(() => {
                autoClearAlert();
            }, duration) as unknown as number;
        }
    };

    // Watch the `message` prop for changes
    watch(
        () => message,
        (newMessage) => {
            if (newMessage) {
                console.log("message trigger from alert// Wait for the DOM to update", message);
                alertMessage.value = newMessage;
                isVisible.value = true; // Show the alert
                startAutoClearTimer(); // Restart the timer for the new message
            }
        },
        { immediate: true } // Trigger immediately on mount with the initial message
    );

    const autoClearAlert = () => {
        isVisible.value = false;
        alertMessage.value = ""; // Clear the message when the alert disappears
    };

    const handleClose = () => {
        autoClearAlert(); // Handle manual closure
        emit("close"); // Notify parent
    };

    onUnmounted(() => {
        clearTimeout(timer); // Cleanup on component unmount
    });
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
