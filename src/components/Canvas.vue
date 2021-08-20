
<template>
    <div>
        <canvas :id="canvasId" 
        class="canvas-style" 
        v-on:mousedown="mouseDown"
        :style="'--canvas-height: ' + height + 'px;' +
        '--canvas-width: ' + width + 'px; ' "

        />
    </div>
</template>

<script>
    // packages
    const paper = require('paper');
    const FileSaver = require('file-saver');

    export default {
        name: "Canvas",
        props: ['canvasId', 'selectedColor', 'aspectRatio', 'backgroundColor', 'toolMode'], 
        emits: ['nothingToUndo', 'nothingToRedo', 'shapeStarted', 'shapeFinished'],
        data: () => ({
            path: null,
            scope: null,
            drawingLayer: null,
            currentTool: null,
            background: null,
            undoHistory: null,
            recoverCleared: null,
            lastPathFinished: null,
        }),

        computed: {
            width: function() {
                return this.aspectRatio[0] * 250;
            },

            height: function() {
                return this.aspectRatio[1] * 250;
            }
        },

        methods: {
            drawBackground(){
                var rectangle = new paper.Rectangle(new paper.Point(0,0), new paper.Point(this.width,this.height)) ;
                this.background = new paper.Path.Rectangle(rectangle);
                this.background.fillColor = this.backgroundColor;
            },

            reset() {
                this.finish();
                this.scope.project.activeLayer.copyTo(this.recoverCleared);
                this.scope.project.activeLayer.removeChildren();
                this.drawBackground();
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
                    if (this.recoverCleared.isEmpty()){
                        this.$emit("nothingToUndo");
                    } else {
                        for (const child of this.recoverCleared.children){
                            child.copyTo(this.drawingLayer);
                        }
                        this.recoverCleared.removeChildren();
                    }
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

            mouseDown() {
                // in order to access functions in nested tool
                let self = this; 
                this.scope.activate();
                this.drawingLayer.activate();
                console.log(this.toolMode);
                this.undoHistory.removeChildren();

                // POLYGON TOOL
                if(this.toolMode){
                    this.currentTool.onMouseDown = (event) => {
                        console.log("hey");
                        
                        // last path is finished, so start a new path
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

                    this.currentTool.onMouseDrag = (event)=>{
                        self.path.lastSegment.remove();
                        self.path.add(event.point);
                    };


                // FREEHAND TOOL
                } else {
                    this.finish();
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
                this.background.fillColor = this.backgroundColor;
                console.log("background after watch: " + this.backgroundColor);
            },
            
            width(){
                this.scope.view.viewSize.width = this.aspectRatio[0] * 250;
                this.reset();
            },

            height(){
                this.scope.view.viewSize.height = this.aspectRatio[1] * 250;
                this.reset();
            }
        },

        mounted() {
            this.scope = new paper.PaperScope();
            this.scope.setup(this.canvasId);

            this.currentTool = this.createTool(this.scope);

            this.undoHistory = new paper.Layer({
                visible: false,
                locked: true
            });

            this.recoverCleared = new paper.Layer({
                visible: false,
                locked: true
            })

            this.drawingLayer = new paper.Layer();

            this.drawBackground();
            console.log("background: " + this.backgroundColor)

            console.log(this.scope.project.layers);

            this.lastPathFinished = true;
        }
    }
</script>

<style scoped>
    .canvas-style {
        width: var(--canvas-width); 
        height: var(--canvas-height);
        display: block;
        margin: auto;
    }

</style>