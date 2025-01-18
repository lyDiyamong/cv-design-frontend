<template>
    <a-form-item
        class="full-width"
        :label="label"
        :validate-status="validationStatus"
        :help="error"
    >
        <a-date-picker
            class="full-width"
            v-model="dateValue"
            @change="handleChange"
            :placeholder="placeholder"
            @blur="handleBlur"
        />
    </a-form-item>
</template>

<script lang="ts" setup>
    import { computed, watch } from "vue";
    import { useField } from "vee-validate";
    import dayjs from "dayjs";

    interface Props {
        name: string;
        label: string;
        placeholder?: string;
        initialValue?: string; // Accept initial value for the date field
    }

    const props = defineProps<Props>();
    const emit = defineEmits(["update:modelValue"]);

    // Register field with useField
    const {
        value: dateValue,
        errorMessage,
        handleBlur,
        setValue,
    } = useField(props.name, undefined, {
        initialValue: props.initialValue, // Initialize field value from prop
    });

    // Watch `initialValue` for changes (optional, in case parent updates it dynamically)
    watch(
        () => props.initialValue,
        (newValue) => {
            if (newValue !== undefined && newValue !== dateValue.value) {
                setValue(dayjs(newValue).format("YYYY-MM-DD"));
            }
        }
    );

    // Emit input changes back to the parent
    const handleChange = (date: dayjs.Dayjs | null) => {
        const formattedDate = date ? date.format("YYYY-MM-DD") : "";
        setValue(formattedDate); // Update vee-validate field value
        emit("update:modelValue", formattedDate); // Notify parent about changes
    };

    // Computed properties for validation state
    const error = computed(() => errorMessage.value);
    const validationStatus = computed(() => {
        if (error.value) return "error";
        return dateValue.value ? "success" : "";
    });
</script>
