<template>
    <a-form-item
        class="w-full"
        :label="label"
        :validate-status="error ? 'error' : ''"
        :help="error"
    >
        <a-input
            :value="value"
            class="w-full"
            :placeholder="placeholder"
            @input="handleInput"
            @blur="handleBlur"
        />
    </a-form-item>
</template>

<script setup lang="ts">
    import { useField } from "vee-validate";
    import { computed, watch } from "vue";

    interface Props {
        name: string;
        label: string;
        placeholder?: string;
        initialValue?: string; // Accept initial value for the field
    }

    const props = defineProps<Props>();
    const emit = defineEmits(["update:modelValue"]);

    // Register field with useField
    const { value, errorMessage, handleBlur, setValue } = useField(
        props.name,
        undefined,
        {
            initialValue: props.initialValue, // Initialize field value from prop
        }
    );

    // Watch `initialValue` for changes (optional, in case parent updates it dynamically)
    watch(
        () => props.initialValue,
        (newValue) => {
            if (newValue !== undefined && newValue !== value.value) {
                setValue(newValue);
            }
        }
    );

    // Emit input changes back to the parent
    const handleInput = (event: Event) => {
        const inputValue = (event.target as HTMLInputElement).value;
        setValue(inputValue); // Update vee-validate field value
        emit("update:modelValue", inputValue); // Notify parent about changes
    };

    // Computed properties for validation state
    const error = computed(() => errorMessage.value);
</script>
