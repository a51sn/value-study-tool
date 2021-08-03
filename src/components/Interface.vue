<template>
    <div>
        <h1> <b> Three Value Study </b> </h1>
        <!-- button toggles -->

                <ValueButton value ="black" :selected="false" />
                <ValueButton value ="grey" :selected="false" />
                <ValueButton value ="white" :selected="false" />



                <button class="btn" @click="changeColor('#000000')">DARK</button>
                <button class="btn" @click="changeColor('#444444')">DARKMID</button>
                <button class="btn" @click="changeColor('#888888')">TRUEMID</button>
                <button class="btn" @click="changeColor('#cccccc')">LIGHTMID</button>
                <button class="btn" @click="changeColor('#ffffff')">LIGHT</button>

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
                <Canvas :canvas-id="'canvas-one'" ref="childCanvas" :selectedColor="color"/>
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
            buttons: ['Simple', 'Separate', 'Replicated'],
            single: true,
            numValues: 3,
            listValues: [],
            color: "black"
        }),



        mounted(){
            var self = this;
            window.addEventListener("keypress", function(e){
                if(e.key === "1"){
                    self.changeColor('#ffffff');
                }else if(e.key === "2"){
                    self.changeColor('#888888');
                }else if(e.key === "3"){
                    self.changeColor('#000000');
                }
            })

            for (let i =0; i < self.numValues; i++){
                self.listValues.push("black");
            }
            console.log(self.listValues);
    },

        methods: {
            reset() {
                this.$refs.childCanvas.reset();
            },
            
            changeColor(newColor) {
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