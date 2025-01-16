<template>
    <div class="flex-between" style="margin-bottom: 16px;">
        <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="beforeUpload"
            @change="handleChange"
        >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
                <loading-outlined v-if="loading" />
                <plus-outlined v-else />
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>

        <a-button style="align-self: flex-end;" type="primary" >Save</a-button>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import type { UploadChangeParam, UploadFile } from "ant-design-vue";

    // Improved getBase64 function using Promise and proper type handling
    const getBase64 = (img: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject("Error converting image to base64");
            reader.readAsDataURL(img);
        });
    };

    const fileList = ref<UploadFile[]>([]); // List of uploaded files
    const loading = ref<boolean>(false); // Loading state
    const imageUrl = ref<string>(""); // To store the base64 image URL

    // Handle file change, such as upload start, success, and error
    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            loading.value = true;
            return;
        }
        if (info.file.status === "done") {
            // Get base64 of the uploaded image file
            if (info.file.originFileObj) {
                getBase64(info.file.originFileObj as Blob)
                    .then((base64Url: string) => {
                        imageUrl.value = base64Url;
                        loading.value = false;
                    })
                    .catch((error) => {
                        message.error(error); // In case of error in base64 conversion
                        loading.value = false;
                    });
            }
        }
        if (info.file.status === "error") {
            loading.value = false;
            message.error("Upload error");
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
