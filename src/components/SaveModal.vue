<template>
    <div class="backdrop">
        <div class="saveModal">
            <form>
                <label for="title">name your drawing: </label> <br>
                <input type="text" id="title" name="title"> <br>
                
                <br>
                <label for="fileformat"> choose a file format: </label> <br>
                <select id="fileformat" name="fileformat">
                    <option value="svg"> .svg </option>
                    <option value="png"> .png </option>
                    <option value="jpg"> .jpg </option>
                </select>

            </form>
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
        methods: {
            download(){
                this.$emit("clickDownload");
            },

            close(){
                this.$emit("close");
            }
        },


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