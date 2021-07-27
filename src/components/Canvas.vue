
<template>
    <div>
        <canvas :id="canvasId" class="canvas-style" v-on:mousedown="mouseDown" 
        />
    </div>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
    const paper = require('paper');
    export default {
        name: "Canvas",
        props: ['canvasId'],
        data: () => ({
            path: null,
            scope: null,
            color: "black"
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

            changeColor(newColor) {
                this.color = newColor;
            },


            createTool(scope) {
                scope.activate();
                return new paper.Tool();
            },


            undoShape() {
                return;
            },


            mouseDown() {
                console.log("yes")
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

            keyDown() {
                console.log("hi");
                let self = this; // just copying the above method

                this.tool = this.createTool(this.scope);


                // maybe change this to switch case 
                this.tool.onKeyDown = (event) => {
                    if (event.key =='3'){
                        self.changeColor("black");
                    } else if (event.key =='2'){
                        self.changeColor("grey");
                    } else if (event.key =='1'){
                        self.changeColor("white");
                    } else if ((event.modifiers.command && event.key == "z")){
                        self.undoShape();
                    }
                };
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
    .canvas-style {
        width: 100% !important;
        height: 500px !important;
        display: block;
        margin: auto;
        background-color: grey;
    }
</style>