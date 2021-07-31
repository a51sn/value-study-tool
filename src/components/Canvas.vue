
<template>
    <div>
        <canvas :id="canvasId" class="canvas-style" 
        v-on:mousedown="mouseDown" 
        v-on:keydown="keyDown"
        />
    </div>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
    const paper = require('paper');
    export default {
        name: "Canvas",
        props: ['canvasId', 'selectedColor', 'toolType'], // create scope and tool in master maybe? then pass the project and layers down here
        data: () => ({
            path: null,
            scope: null,
            drawingLayer: null,
            currentTool: null,
            toolMode: null,

            undoHistory: null,
        }),

        methods: {
            reset() {
                this.scope.project.activeLayer.removeChildren();
            },

            save() {
                this.drawingLayer.exportSVG([]);
            },

            pathCreate(scope) {
                scope.activate();
                return new paper.Path({
                    strokeColor: this.selectedColor,
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
                this.drawingLayer.lastChild.copyTo(this.undoHistory);
                this.drawingLayer.lastChild.remove();
            },

            redoShape() {
                this.undoHistory.lastChild.copyTo(this.drawingLayer);
                this.undoHistory.lastChild.remove();
            },

            mouseDown() {

                // in order to access functions in nested tool
                let self = this; // QUESTION what does 'this' mean?
                // create drawing tool
                this.scope.activate();
                this.drawingLayer.activate();

                this.currentTool.onMouseDown = (event) => {
                    // init path
                    self.path = self.pathCreate(self.scope);
                    // add point to path
                    
                    self.path.add(event.point);
                };
                this.currentTool.onMouseDrag = (event) => {
                    self.path.add(event);
                };
                this.currentTool.onMouseUp = (event) => {
                    // line completed
                    self.path.add(event.point);
                    self.path.fillColor = this.selectedColor;
                }
            },

        },

        mounted() {
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasId);

            this.currentTool = this.createTool(this.scope);

            this.undoHistory = new paper.Layer({
                visible: false,
                locked: true
            })

            this.drawingLayer = new paper.Layer();

            console.log(this.scope.project.layers);


        }
    }
</script>

<style scoped>
    .canvas-style {
        width: 750px !important;
        height: 500px !important;
        display: block;
        margin: auto;
        background-color: grey;
    }
</style>