import type { AlertOptions, AlertType } from "~/types/alert";

export const useAlertStore = defineStore("alert", () => {
    const isVisible = ref(false);
    const message = ref<string | null>(null);
    const type = ref<AlertType>("info");
    const timer = ref<number | undefined>(undefined);

    const DEFAULT_DURATION = 3000;

    /**
     * Show an alert with customizable options.
     * @param options {AlertOptions} - Alert configuration options.
     */
    const showAlert = (options: AlertOptions) => {
        message.value = options.message;
        type.value = options.type || "info";
        isVisible.value = true;

        clearTimeout(timer.value);
        timer.value = window.setTimeout(() => {
            clearAlert();
        }, options.duration || DEFAULT_DURATION);
    };

    /**
     * Clear the alert manually or after the duration.
     */
    const clearAlert = () => {
        isVisible.value = false;
        message.value = null;
    };

    return {
        isVisible,
        message,
        type,
        showAlert,
        clearAlert,
    };
});
