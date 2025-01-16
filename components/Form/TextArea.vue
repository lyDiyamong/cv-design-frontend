<template>
    <a-form-item
        class="full-width"
        :label="label"
        :validate-status="validationStatus"
        :help="error"
    >
        <a-textarea
            class="full-width"
            v-model="inputValue"
            @input="handleInput"
            :placeholder="placeholder"
            @blur="handleBlur"
            :auto-size="{ minRows: 3, maxRows: 5 }"
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
        setValue,
        meta,
    } = useField(props.name);

    const error = computed(() => errorMessage.value);
    const validationStatus = computed(() => {
        if (error.value) return "error";
        return inputValue.value ? "success" : "";
    });

    const handleInput = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        setValue(target.value);
    };
</script>

