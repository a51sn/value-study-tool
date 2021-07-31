<template>
    <div>
        <h1> <b> Three Value Study </b> </h1>
        <!-- button toggles -->
                <button class="btn" @click="changeColor('black')">DARK</button>
                <button class="btn" @click="changeColor('grey')">MID</button>
                <button class="btn" @click="changeColor('white')">LIGHT</button>


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
    import Canvas from "../components/Canvas";
    export default {
        name: "Interface",
        data: () => ({
            buttons: ['Simple', 'Separate', 'Replicated'],
            single: true,
            numValues: 3,
            color: "black"
        }),



        mounted(){
            var self = this;
            window.addEventListener("keypress", function(e){
                if(e.key === "1"){
                    self.changeColor("white");
                }else if(e.key === "2"){
                    self.changeColor('grey');
                }else if(e.key === "3"){
                    self.changeColor('black');
                }
        })
    },

        methods: {
            reset() {
                this.$refs.childCanvas.reset();
            },
            
            changeColor(newColor) {
                console.log("yup");
                this.color = newColor;
                console.log(this.selectedColor);
            },
            
            undo() {
                this.$refs.childCanvas.undoShape();
            },
            
            redo() {
                this.$refs.childCanvas.redoShape();
            },
            
            save() {
                // ask if svg or png
            }
            
        },



        components: {
            Canvas
        }
    }
</script>

<style scoped>


</style>