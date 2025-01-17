// import { useAuthStore } from "~/store/auth";
// import { useUser } from "~/composables/useUser";
// import { useRouter } from "vue-router"; // Import the router to redirect

// export default defineNuxtRouteMiddleware(async () => {
//     const authStore = useAuthStore();
//     const router = useRouter();

//     if (!authStore.user) {
//         try {
//             const { userQuery } = useUser();
//             const { data } = await userQuery.refetch(); // Fetch user data
//             if (data) {
//                 return router.push("/dashboard");
//             }

//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             authStore.clearAuth(); // Clear auth data on failure
//             return router.push("/"); // Redirect to login or home page
//         }
//     }
// });

import { useAuthStore } from "~/store/auth";
import { useUser } from "~/composables/useUser";

export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();

    // If the user is already authenticated, don't do anything
    if (authStore.user) {
        return; // Allow navigation to proceed
    }

    try {
        const { userQuery } = useUser();
        const { data } = await userQuery.refetch();

        if (data) {
            authStore.setUser(data); // Save user data to the store
        } else {
            // Redirect to login if user data could not be fetched
            if (to.path !== "/") {
                return "/"; // Prevent looping back to itself
            }
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        authStore.clearAuth(); // Clear auth data on error

        if (to.path !== "/") {
            return "/"; // Redirect to login only if not already there
        }
    }
});
