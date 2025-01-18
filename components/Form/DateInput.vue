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
    import { computed } from "vue";
    import { useField } from "vee-validate";
    import dayjs from "dayjs";

    interface Props {
        name: string;
        label: string;
        placeholder?: string;
    }

    const props = defineProps<Props>();

    const {
        value: dateValue,
        errorMessage,
        handleBlur,
        setValue,
    } = useField(props.name);

    const error = computed(() => errorMessage.value);
    const validationStatus = computed(() => {
        if (error.value) return "error";
        return dateValue.value ? "success" : "";
    });

    const handleChange = (date: dayjs.Dayjs | null) => {
        setValue(date ? date.format("YYYY-MM-DD") : "");
    };
</script>
