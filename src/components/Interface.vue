<template>
    <SaveModal v-if = "showSaveModal" />
    <SettingsModal v-if = "showSettingsModal" />


    <div>
        <h1> 
            <!-- <div style="display:inline; cursor:pointer; font-size: large" @click="decreaseValues">▼ </div> -->
            <b> {{ numToWord(numValues) }} </b>
            <!--<div style="display:inline; cursor:pointer; font-size: large" @click="increaseValues"> ▲ </div> -->
            <b> value study </b>  
                
        </h1>
        <!-- button toggles -->
                <div style="display:inline">TOOL:</div>

                <button class="btn" @click.prevent="toggleTool">{{toolMode}}</button> &nbsp;
                
                <div style="display:inline">VALUE:</div>

               <ValueButton v-for = "value in listValues" :key="value.id" :value ="value" :selected="false" @selectValue="changeColor(value)" />
                &nbsp;
                
                <!-- try a v-for thing here with numValues perhaps?-->
                <!-- look up how to make icon buttons-->


                <button class="btn" @click="undo">UNDO</button>
                <button class="btn" @click="redo">REDO</button>
                <button class="btn" @click="save">SAVE</button>
                <button class="btn" @click.prevent="reset">CLEAR</button>
                <button class="btn" @click.prevent="settings">SETTINGS</button>




       
        <!-- canvas single -->
        <div class="row mt-4">
            <div class="col-2"/>
            <div class="col-8">
                <Canvas :canvas-id="'canvas-one'" ref="childCanvas" :selectedColor="color" :backgroundColor="backgroundColor"/>
            </div>
            <div class="col-2"/>
        </div>      
    </div>
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
            showSaveModal: false,
            showSettingsModal: false,
            toolMode: "FREE"

        }),



        mounted(){
            var self = this;
            window.addEventListener("keypress", function(e){
                if(e.key >= '1' && e.key <= self.numValues.toString()){
                    self.changeColor(self.listValues[e.key-1]);
                }
            })

            this.listValues = this.generateValues(self.numValues);
            this.color = this.listValues[0];

            console.log(this.color)

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
                let words = ["two", "three", "tour", "five", "six", "seven", "eight", "nine"]; 
                return words[num-2];
            },

            changeColor(newColor) {
                console.log("changing to " + newColor);
                this.color = newColor;
            },
            
            undo() {
                this.$refs.childCanvas.undoShape();
            },
            
            redo() {
                this.$refs.childCanvas.redoShape();
            },
            
            save() {
                // pop up component option to name picture 
                // save as svg or png?
                this.showSaveModal = true;
                this.$refs.childCanvas.save();

            }
            
        },

    }
</script>

<style scoped>
.btn{
    border-width: 1px;
    border-color: black;
    margin: 2px;
    transition-duration: 0.1s;
}

.btn:hover{
    background-color: thistle;
}

</style>