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


            <button > download </button> 
            <button> close </button>
        </div>
    </div>
</template>

<script>
    export default {

        
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