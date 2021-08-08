<template>
    <SaveModal 
        v-if = "showSaveModal" 
        @clickDownload="save" 
        @close="toggleSaveModal"/>
    <SettingsModal 
        v-if = "showSettingsModal" 
        :aspectRatio="aspectRatio" 
        :numValues="numValues" 
        :bgColorNum="listValues.indexOf(backgroundColor) + 1" 
        @close="toggleSettingsModal" 
        @increaseValues="increaseValues" 
        @decreaseValues="decreaseValues" 
        @increaseBg="increaseBg" 
        @decreaseBg="decreaseBg"/>

    <!-- the menu bar -->
    <div>
        <h1> <b> {{ numToWord(numValues) }} value study </b>  </h1>

        <div style="display:inline">TOOL:</div>
        <button class="btn" 
            @click.prevent="toggleTool" 
            v-if="shapeFinished">{{tools[toolMode]}}</button> 
        <button class="btn urgent-btn" 
            @click.prevent="finishedShape" 
            v-else> FINISH </button> 
        &nbsp;

        <div style="display:inline">VALUE:</div>
        <ValueButton 
            v-for = "value in listValues" 
            :key="value.id" 
            :value ="value" 
            :isSelected="checkSelected(value)" 
            @selectValue="changeColor(value)" />
        &nbsp;

        <br class="hidden-ss">

        <button class="btn" @click="undo">UNDO</button>
        <button class="btn" @click="redo">REDO</button>
        <button class="btn" @click="toggleSaveModal">SAVE</button>
        <button class="btn" @click.prevent="reset">CLEAR</button>
        <button class="btn" @click.prevent="toggleSettingsModal">SETTINGS</button>
    </div>

    <!-- the canvas -->
    <div class="row mt-4">
        <Canvas 
            :canvas-id="'canvas-one'" 
            ref="childCanvas" 
            :selectedColor="color" 
            :backgroundColor="backgroundColor" 
            :toolMode="toolMode" 
            @shapeFinished="finishedShape" 
            @shapeStarted="startedShape"/>

    </div>      
    
    
    <div>.</div>
    <p> <a href="/tips.html">tips</a> / <a href="/guestbook.html">guestbook</a> / <a href="/about.html">about</a> </p>
</template>

<script>
    import Canvas from "./Canvas.vue";
    import ValueButton from "./buttons/ValueButton.vue";
    import SaveModal from "./SaveModal.vue";
    import SettingsModal from "./SettingsModal.vue";

    export default {
        name: "Interface",
        components: {
            Canvas,
            ValueButton,
            SaveModal,
            SettingsModal
        },

        data: () => ({
            numValues: 3,
            listValues: [],
            color: null,
            backgroundColor: null,
            aspectRatio: [3,2],

            showSaveModal: false,
            showSettingsModal: false,
            tools: ["FREEHAND", "POLYGON"],
            toolMode: null,
            shapeFinished: null,

        }),



        mounted(){
            var self = this;
            window.addEventListener("keydown", function(e){
                if(e.key >= '1' && e.key <= self.numValues.toString()){
                    self.changeColor(self.listValues[e.key-1]);
                } else if (e.key == 'z' && e.ctrlKey || e.key == 'z' && e.metaKey){
                    if (e.shiftKey){ // doesn't work  for some reason??
                        self.redo();
                    } else {
                        self.undo();
                    }
                } 
            })

            this.listValues = this.generateValues(self.numValues);
            this.color = this.listValues[0];

            console.log(this.color)
            this.toolMode = 0;
            this.shapeFinished = true;

    },

        methods: {
            reset() {
                this.$refs.childCanvas.reset();
            },
            
            generateValues(numValues){
                var listValues = [];
                for (let i =0; i < numValues; i++){
                    let num = Math.round(255 / (numValues-1) * i);
                    let rgbString = `rgb(${num}, ${num}, ${num})`
                    listValues.push(rgbString);
                }
                console.log(listValues);

                // reset stroke color to darkest value
                this.color = 'black';

                // reset bg color halfway value
                this.backgroundColor = listValues[Math.floor((numValues)/2)];
                console.log("generated values, new background color:" + this.backgroundColor);

                return listValues
            },

            increaseValues(){
                if (this.numValues < 9) {
                    this.reset();
                    this.numValues++;
                }
                this.listValues = this.generateValues(this.numValues);
            },

            decreaseValues(){
                if (this.numValues > 2) {
                    this.reset();
                    this.numValues--;
                }
                this.listValues = this.generateValues(this.numValues);
            },

            numToWord(num){
                let words = ["two", "three", "four", "five", "six", "seven", "eight", "nine"]; 
                return words[num-2];
            },

            changeColor(newColor) {
                this.finishedShape();
                console.log("changing to " + newColor);
                this.color = newColor;
            },
            
            checkSelected(value){
                return value == this.color;
            },

            increaseBg(){
                var bgIndex = this.listValues.indexOf(this.backgroundColor);
                if (bgIndex < this.numValues - 1){
                    this.backgroundColor = this.listValues[bgIndex + 1];
                } 
            },

            decreaseBg(){
                var bgIndex = this.listValues.indexOf(this.backgroundColor);
                if (bgIndex > 0){
                    this.backgroundColor = this.listValues[bgIndex - 1];
                } 
            },

            toggleSaveModal(){
                this.showSaveModal = !this.showSaveModal;
            },

            toggleSettingsModal(){
                this.showSettingsModal = !this.showSettingsModal;
            },

            toggleTool(){
                if (this.toolMode == 0){
                    this.toolMode = 1;
                } else {
                    this.finishedShape();
                    this.toolMode = 0;
                }
            },

            startedShape(){
                this.shapeFinished = false;
            },

            finishedShape(){
                this.shapeFinished = true;
                this.$refs.childCanvas.finish();
            },

            undo() {
                this.finishedShape();
                console.log(this.$refs.childCanvas);
                this.$refs.childCanvas.undoShape();
            },
            
            redo() {
                this.finishedShape();
                console.log(this.$refs.childCanvas);
                this.$refs.childCanvas.redoShape();
            },
            
            save({fileName, fileFormat}) {
                // pop up component option to name picture 
                // save as svg or png?
                this.showSaveModal = true;
                this.$refs.childCanvas.save(fileName, fileFormat);

            }
            
        },

    }
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 800px) {
  .hidden-ss {
    display: none !important;
  }
}

</style>