
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
    const FileSaver = require('file-saver');



    export default {
        name: "Canvas",
        props: ['canvasId', 'selectedColor', 'toolType', 'backgroundColor'], // create scope and tool in master maybe? then pass the project and layers down here
        emits: ['nothingToUndo', 'nothingToRedo'],
        data: () => ({
            path: null,
            scope: null,
            drawingLayer: null,
            currentTool: null,
            toolMode: null,
            background: null,

            undoHistory: null,
        }),

        methods: {
            reset() {
                this.scope.project.activeLayer.removeChildren();
                var rectangle = new paper.Rectangle(new paper.Point(0,0), new paper.Point(750,500)) ;
                this.background = new paper.Path.Rectangle(rectangle);
                this.background.fillColor = this.backgroundColor;
                console.log("background after reset: " + this.backgroundColor)
            },

            save(fileName, formatNum) {
                var formats = ["svg", "png", "jpg"]
                var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="750" height="500">' + this.drawingLayer.exportSVG({ asString: true}) + "</svg>";

                if (formatNum == 0) {
                    var blob = new Blob([svg]);
                    FileSaver.saveAs(blob, fileName + ".svg", {data: 'data:image/svg+xml;base64,' + btoa(svg),});
                } else if (formatNum == 1 || formatNum == 2){
                    // creating image element
                    var image = new Image();
                    image.src = 'data:image/svg+xml;base64,' + btoa(svg); //Buffer.from(str, 'base64');
                    image.width = 750;
                    image.height = 500;

                    // creating canvas element
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');

                    image.onload = function () {
                        canvas.width = image.width,canvas.height = image.height,
        
                        context.drawImage(image, 0, 0);
                        var a = document.createElement('a');
                        a.download = fileName + "." + formats[formatNum];  // file name
                        a.href = canvas.toDataURL( fileName + "/" + formats[formatNum]); //saving in PNG or JPG
                        a.style = 'display: none;';
                        console.log("hi");
                        a.click();
                    }
                }
               
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
                if (this.drawingLayer.lastChild === this.background){
                    this.$emit("nothingToUndo");
                } else {
                    this.drawingLayer.lastChild.copyTo(this.undoHistory);
                    this.drawingLayer.lastChild.remove();
                }
                
            },

            redoShape() {
                if (this.undoHistory.isEmpty()){
                    this.$emit("nothingToRedo");
                } else {
                    this.undoHistory.lastChild.copyTo(this.drawingLayer);
                    this.undoHistory.lastChild.remove();
                }
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
        watch: {
            backgroundColor: function (){
                var rectangle = new paper.Rectangle(new paper.Point(0,0), new paper.Point(750,500)) ;
                this.background = new paper.Path.Rectangle(rectangle);
                this.background.fillColor = this.backgroundColor;
                console.log("background after watch: " + this.backgroundColor)
            }
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

            var rectangle = new paper.Rectangle(new paper.Point(0,0), new paper.Point(750,500)) ;
            this.background = new paper.Path.Rectangle(rectangle);
            this.background.fillColor = this.backgroundColor;
            console.log("background: " + this.backgroundColor)

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
    }
</style>