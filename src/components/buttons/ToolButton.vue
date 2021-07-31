<template>
    <button>
        
    </button>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
    export default {
        name: "ToolButton",
        props: ['state'],
        data: () => ({
        }),

        methods: {

            mouseDown() {

            },

        },

        mounted() {
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasId);
            this.canvasId
        }
    }
</script>

<style scoped>

</style>