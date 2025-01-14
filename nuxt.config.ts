// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },

    plugins: ["~/plugins/ant-design-vue.ts"],
    modules: ["@nuxt/image"],
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
});
