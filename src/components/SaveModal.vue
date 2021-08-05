<template>
    <div class="backdrop">
        <div class="saveModal">
            <strong>
            <label for="title">name your drawing: </label> <br>
            </strong>
            <input v-model="fileName" type="text" id="title" name="title"> <br>
            
            <br>
            <strong>
            <label for="fileformat"> choose a format: </label> <br>
            </strong>
            <input type="radio" id="svg" value="0" v-model="fileFormat">
            <label for="svg">.svg</label> &emsp;

            <input type="radio" id="png" value="1" v-model="fileFormat">
            <label for="png">.png</label> &emsp;

            <input type="radio" id="jpg" value="2" v-model="fileFormat">
            <label for="jpg">.jpg</label>

            <br>
            <br>
            <p><strong>file name preview:</strong><br>{{fileName}}.{{formats[fileFormat]}}</p>
            <br>


            <button class="btn" @click="download"> download </button> 
            <button class="btn" @click="close"> close </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SaveModal",
        emits: ['clickDownload', 'close'],

        data: function() {
            return {
                formats: ["svg", "png", "jpg"],
                fileName: String,
                fileFormat: Number // 0 for svg, 1 for png, 2 for jpg
            }
        },

        methods: {
            download(){
                var fileName = this.fileName
                var fileFormat = this.fileFormat
                console.log(fileFormat);
                console.log(fileName);

                this.$emit("clickDownload", {fileName, fileFormat});
            },

            close(){
                this.$emit("close");
            }
        },

        mounted(){
            this.fileName = "my-drawing";
            this.fileFormat = 0;
        }


    }
</script>

<style scoped>
.saveModal {
    width:400px;
    padding: 20px;
    margin: 150px auto;
    background: white;
    border-radius: 10px;
}
.backdrop {
    top:0;
    left:0;
    position:fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}

</style>