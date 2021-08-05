<template>
    <div>
        <h1> 
            <div style="display:inline" @click="decreaseValues"> (–) </div> 
            <b>  {{ numToWord(numValues) }} 
            <div style="display:inline" @click="increaseValues"> (+) </div> 
            Value Study </b>  
                
        </h1>
        <!-- button toggles -->
               <ValueButton v-for = "value in listValues" :key="value.id" :value ="value" :selected="false" @selectValue="changeColor(value)" />

                <!-- try a v-for thing here with numValues perhaps?-->
                <!-- look up how to make icon buttons-->


                <button class="btn" @click="undo">UNDO</button>
                <button class="btn" @click="redo">REDO</button>
                <button class="btn" @click="save">SAVE</button>
                <button class="btn" @click.prevent="reset">CLEAR</button>




        <!-- canvas single -->
        <div class="row mt-5">
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

    export default {
        name: "Interface",
        data: () => ({
            numValues: 5,
            listValues: [],
            color: null,
            backgroundColor: null
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
                this.reset();
                if (this.numValues < 9) {
                    this.numValues++;
                }
                this.listValues = this.generateValues(this.numValues);


            },

            decreaseValues(){
                this.reset();
                if (this.numValues > 2) {
                    this.numValues--;
                }
                this.listValues = this.generateValues(this.numValues);


            },

            numToWord(num){
                let words = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]; 
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
                this.$refs.childCanvas.save();

            }
            
        },

        components: {
            Canvas,
            ValueButton
        }
    }
</script>

<style scoped>


</style>