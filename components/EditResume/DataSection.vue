<template>
    <div>
        <!-- Dropdown Header -->
        <a-card class="dropdown-card border-style" hoverable>
            <div class="dropdown-header" @click="toggleDropdown">
                <div>
                    <h3>Software Manager at Salatech</h3>
                    <p>Feb 2025 - Apr 2025</p>
                </div>
                <div class="dropdown-arrow">
                    <UpOutlined v-if="isOpen" />
                    <DownOutlined v-else />
                </div>
            </div>

            <!-- Collapsible Slot Area -->
            <div
                ref="collapsible"
                class="slot-container"
                :style="{ height: contentHeight }"
            >
                <div ref="content" class="slot-content">
                    <slot name="form"></slot>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
    import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    export default {
        data() {
            return {
                isOpen: false,
                contentHeight: "0px", // Initial height for collapsible container
            };
        },
        methods: {
            toggleDropdown() {
                this.isOpen = !this.isOpen;
                this.updateHeight();
            },
            updateHeight() {
                const content = this.$refs.content;
                this.contentHeight = this.isOpen
                    ? `${content.scrollHeight}px`
                    : "0px";
            },
        },
        mounted() {
            // Ensure height is recalculated if content changes dynamically
            window.addEventListener("resize", this.updateHeight);
        },
        beforeDestroy() {
            window.removeEventListener("resize", this.updateHeight);
        },
    };
</script>

<style scoped>
    .dropdown-card {
        margin-bottom: 10px;
        cursor: pointer;
    }

    .dropdown-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .dropdown-arrow {
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #888;
        transition: transform 0.3s;
    }

    .slot-container {
        overflow: hidden;
        transition: height 0.3s ease, opacity 0.3s ease;
        opacity: 0;
    }

    .slot-container[style*="height: 0px"] {
        opacity: 0;
    }

    .slot-container[style*="height:"] {
        opacity: 1;
    }

    .slot-content {
        padding: 16px;
        border: 1px solid #f0f0f0;
        border-radius: 4px;
        margin-top: 8px;
    }
</style>
