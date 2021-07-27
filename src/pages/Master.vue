<template>
    <div>
        <!-- button toggles -->
                <button class="btn" @click="setDark">DARK</button>
                <button class="btn" @click="setMid">MID</button>
                <button class="btn" @click="setLight">LIGHT</button>


                <button class="btn" @click="undo">UNDO</button>
                <button class="btn" @click="redo">REDO</button>
                <button class="btn" @click="save">SAVE</button>
                <button class="btn" @click.prevent="reset">CLEAR</button>



        <!-- canvas single -->
        <div class="row mt-5">
            <div class="col-2"/>
            <div class="col-8">
                <Canvas :canvas-id="'canvas-one'" ref="childCanvas"/>
            </div>
            <div class="col-2"/>
        </div>      
    </div>
</template>

<script>
    import Canvas from "../components/Canvas";
    export default {
        name: "Master",
        data: () => ({
            buttons: ['Simple', 'Separate', 'Replicated'],
            single: true
        }),
        methods: {
            reset() {
                this.$refs.childCanvas.reset();
            },
            
            setDark() {
                this.$refs.childCanvas.changeColor("black");
            },
            
            setMid() {
                this.$refs.childCanvas.changeColor("grey");
            },
            
            setLight() {
                this.$refs.childCanvas.changeColor("white");
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