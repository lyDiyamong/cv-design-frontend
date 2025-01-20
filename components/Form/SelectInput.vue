<template>
    <a-form-item
        class="full-width"
        :label="label"
        :validate-status="validationStatus"
        :help="error"
    >
        <a-select
            class="full-width"
            :placeholder="placeholder"
            :options="options"
            v-model="selectedValue"
            @blur="handleBlur"
            @change="handleChange"
        />
    </a-form-item>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import { useField } from "vee-validate";

    interface SelectOption {
        value: string;
        label: string;
    }

    interface SelectInputProps {
        name: string;
        label: string;
        placeholder?: string;
        options: SelectOption[];
        initialValue?: string; // New prop for initial value
    }

    const props = defineProps<SelectInputProps>();

    // Pass initialValue from props to useField
    const {
        value: selectedValue,
        errorMessage,
        handleBlur,
        setValue,
    } = useField(props.name, undefined, { initialValue: props.initialValue });


    const error = computed(() => errorMessage.value);
    const validationStatus = computed(() => {
        if (error.value) return "error";
        return selectedValue.value ? "success" : "";
    });

    // Update the value in vee-validate when the select changes
    const handleChange = (value: string) => {
        setValue(value);
    };
</script>
