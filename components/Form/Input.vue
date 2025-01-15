<template>
    <a-form-item
    class="full-width"
        :label="label"
        :validate-status="validationStatus"
        :help="error"
    >
        <a-input
        class="full-width"
            :value="inputValue"
            @input="handleInput"
            :placeholder="placeholder"
            @blur="handleBlur"
        />
    </a-form-item>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import { useField } from "vee-validate";

    interface Props {
        name: string;
        label: string;
        placeholder?: string;
    }

    const props = defineProps<Props>();

    const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
    } = useField(props.name);

    const error = computed(() => errorMessage.value);
    const validationStatus = computed(() => {
        if (error.value) return "error";
        return inputValue.value ? "success" : "";
    });

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        handleChange(target.value);
    };
</script>
