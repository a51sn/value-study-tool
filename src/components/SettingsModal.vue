<template>
    <div class="backdrop">
        <div class="settingsModal">
            <h3> settings </h3> 
            
            <p> # of values*** : {{ numValues }} </p>
            
            <p> interface bg: &emsp; &emsp; &emsp; &emsp; &emsp; white</p>
            <p> canvas bg: &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; grey </p>
            <p> tutorial / help </p>

            <p style="color:red"> ***WARNING: changing this WILL reset your canvas</p>

            <br>


            <button> close </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingsModal",
        props: ['numValues', 'darkMode']
    }
</script>

<style scoped>
.settingsModal {
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

p {
    text-align: left;
}

h3 {
    font-family: 'Rubik';
    font-weight: bold;
}


</style>