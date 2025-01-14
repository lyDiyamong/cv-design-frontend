import { defineNuxtPlugin } from "#app"; // Import defineNuxtPlugin
import Antd, { ConfigProvider } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(ConfigProvider);
    nuxtApp.vueApp.use(Antd);
});
