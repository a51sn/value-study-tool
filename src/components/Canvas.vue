
<template>
    <div>
        <canvas :id="canvasId" class="canvas-style" 
        v-on:mousedown="mouseDown" v-on:mouseMove="mouseMove"
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
        props: ['canvasId', 'selectedColor', 'backgroundColor', 'toolMode'], // create scope and tool in master maybe? then pass the project and layers down here
        emits: ['nothingToUndo', 'nothingToRedo', 'shapeStarted', 'shapeFinished'],
        data: () => ({
            path: null,
            scope: null,
            drawingLayer: null,
            currentTool: null,
            background: null,

            undoHistory: null,

            lastPathFinished: null,
            closingPoint: null,
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

            finish(){
                this.lastPathFinished = true;
            },

            mouseMove() {
                // in order to access functions in nested tool
                let self = this; 
                this.scope.activate();
                this.drawingLayer.activate();


                if (this.toolMode) {
                    this.currentTool.onMouseMove = (event) => {
                        self.scope.project.activeLayer.selected = false;
                        if (!self.lastPathFinished && event.point == self.closingPoint)
                            self.closingPoint.selected = true;

                        self.path.add(event.point);
                        self.path.lastChild.remove();
                    }
                }

            },

            mouseDown() {
                // in order to access functions in nested tool
                let self = this; 
                this.scope.activate();
                this.drawingLayer.activate();
                console.log(this.toolMode);

                // POLYGON TOOL
                if(this.toolMode){
                    this.currentTool.onMouseDown = (event) => {
                        console.log("hey");
                        // init path
                        if (self.lastPathFinished){
                            self.path = self.pathCreate(self.scope);
                            self.lastPathFinished = false;
                            this.$emit("shapeStarted");
                            self.path.add(event.point);
                            self.path.fillColor = this.selectedColor;


                        } else {
                            self.path.add(event.point);
                        }
                    };

                    this.currentTool.onMouseUp = (event) => {
                        console.log("mouse uppp")

                        var hitResult = self.drawingLayer.hitTest(event.point, 
                            {
                                segments: true,
                                stroke: true,
                                fill: true,
                                tolerance: 5
                            });
                            
                        if (!self.closingPoint){
                            self.closingPoint = event.point;
                            self.path.add(event.point);
                            console.log("here at " + event.point);

                        } else if (!hitResult) {
                            self.path.add(event.point);

                        }  else if (hitResult.point == self.closingPoint) {
                            self.path.fillColor = this.selectedColor;
                        }
                        
                    }

                // FREEHAND TOOL
                } else {
                    self.lastPathFinished = true;
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

            this.lastPathFinished = true;
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