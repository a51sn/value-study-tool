<template>
    <button>
        
    </button>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
    export default {
        name: "ValueButton",
        props: ['color', 'selected'],
        data: () => ({
            path: null,
            scope: null,
        }),

        methods: {
            reset() {
                this.scope.project.activeLayer.removeChildren();
            },

            pathCreate(scope) {
                scope.activate();
                return new paper.Path({
                    strokeColor: this.color,
                    strokeJoin: 'round',
                    strokeWidth: 5,
                    closed: true,
                })
            },

            createTool(scope) {
                scope.activate();
                return new paper.Tool();
            },

            undoShape() {
            },

            redoShape() {

            },

            mouseDown() {

                // in order to access functions in nested tool
                let self = this; // QUESTION what does 'this' mean?
                // create drawing tool
                this.tool = this.createTool(this.scope);
                this.tool.onMouseDown = (event) => {
                    // init path
                    self.path = self.pathCreate(self.scope);
                    // add point to path
                    
                    self.path.add(event.point);
                };
                this.tool.onMouseDrag = (event) => {
                    self.path.add(event);
                };
                this.tool.onMouseUp = (event) => {
                    // line completed
                    self.path.add(event.point);
                    self.path.fillColor = this.color;
                }
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