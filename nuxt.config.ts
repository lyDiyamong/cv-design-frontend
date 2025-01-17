// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    plugins: [
        "~/plugins/ant-design-vue.ts",
        "~/plugins/vee-validate.ts",
        "~/plugins/axios.ts",
        "~/plugins/vue-query.ts",
        // "~/plugins/auth.ts",
    ],
    modules: ["@nuxt/image", "@pinia/nuxt"],
    pinia: {
        storesDirs: ["./stores/**"],
    },
    //  Ant Design Vue styles
    css: ["ant-design-vue/dist/reset.css", "@/assets/styles/global.css"],
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: {
                        // Custom Less variables for Ant Design (example)
                        "primary-color": "#ff9d3d",
                        "link-color": "#1890ff",
                        "border-radius-base": "4px",
                    },
                },
            },
        },
    },

    components: [
        { path: "~/components/Dashboard/", pathPrefix: false },
        { path: "~/components/Form/", pathPrefix: false },
        { path: "~/components/Resume/", pathPrefix: false },
        { path: "~/components/EditResume/", pathPrefix: false },
        { path: "~/components/", pathPrefix: false },
    ],

    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
                },
            ],
        },
    },
    build: {
        transpile: ["vee-validate/dist/rules"],
    },
    // typescript: {
    //     strict: true,
    // },

    // Environment variables
    runtimeConfig: {
        public: {
            myApiUrl: process.env.NUXT_SERVER_BASE_URL,
        },
        // private: {
        //     mySecretKey: process.env.NUXT_SECRET_KEY, // Accessible server-side only
        // },
    },
});
