<template>
    <a-form-item
        class="full-width"
        :label="label"
        :validate-status="error ? 'error' : ''"
        :help="error"
    >
        <a-textarea
            :value="value"
            :auto-size="{ minRows: 3, maxRows: 5 }"
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
        initialValue?: string;
    }

    const props = defineProps<Props>();
    const emit = defineEmits(["update:modelValue"]);

    // Use vee-validate's useField
    const { value, errorMessage, handleBlur, setValue } = useField(
        props.name,
        undefined,
        { initialValue: props.initialValue }
    );

    // Watch for prop updates to initialValue
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
        const inputValue = (event.target as HTMLTextAreaElement).value;
        setValue(inputValue);
        emit("update:modelValue", inputValue);
    };

    // Computed validation error
    const error = computed(() => errorMessage.value);
</script>
