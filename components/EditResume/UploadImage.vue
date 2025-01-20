<template>
    <div class="flex-between" style="margin-bottom: 16px">
        <a-upload
            name="avatar"
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
        >
            <a-spin :spinning="isPending || imageUploading">
                <div>
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        alt="avatar"
                        style="width: 100%"
                    />
                    <div v-else>
                        <a-icon type="plus" />
                        <div style="margin-top: 8px">Upload</div>
                    </div>
                </div>
            </a-spin>
        </a-upload>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { message } from "ant-design-vue";
    import type { UploadChangeParam, UploadFile } from "ant-design-vue";
    import { useAlertStore } from "../../store/alert";

    interface Props {
        imgUrl?: string;
    }

    const { imgUrl } = defineProps<Props>();
    const imageUrl = ref<string | null>(imgUrl || null);
    const imageUploading = ref(false);
    const fileList = ref<UploadFile[]>([]); // List of uploaded files
    const loading = ref<boolean>(false); // Loading state

    const route = useRoute();

    const resumeId = route.params.id as string;

    const { uploadProfileMutation } = useSection();
    const alertStore = useAlertStore();

    const { isPending } = uploadProfileMutation;

    // Improved getBase64 function using Promise and proper type handling
    const getBase64 = (img: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject("Error converting image to base64");
            reader.readAsDataURL(img);
        });
    };

    watch(
        () => imgUrl,
        (newUrl) => {
            if (newUrl) {
                imageUrl.value = newUrl;
            }
        }
    );
    // Handle file change, such as upload start, success, and error
    const handleChange = async (info: any) => {
        const file = info.file.originFileObj;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl.value = e.target?.result as string;
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append("resume-profile", file);

            imageUploading.value = true;

            try {
                const data = await uploadProfileMutation.mutateAsync({
                    resumeId: resumeId,
                    formData,
                });
                if (data.message) {
                    alertStore.showAlert({
                        message: data.message,
                        type: "success",
                        duration: 5000,
                    });
                }
            } catch (error: any) {
                alertStore.showAlert({
                    message: error.response.data.message,
                    type: "error",
                    duration: 5000,
                });
            } finally {
                imageUploading.value = false;
            }
        }
    };

    // Check before upload: file type and size validation
    const beforeUpload = (file: UploadFile) => {
        if (file.size === undefined) {
            message.error("File size is undefined!");
            return false;
        }

        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG or PNG files!");
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must be smaller than 2MB!");
            return false;
        }
        return isJpgOrPng && isLt2M;
    };
</script>

<style scoped>
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
