<template>
    <div class="backdrop">
        <div class="settingsModal">
            <h3> settings </h3> 

            <p> aspect ratio:<span style="display:inline; color:red">*</span> 
                &emsp;&emsp;&emsp; &hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;
                <strong>
                {{aspectRatio[0]}}:{{aspectRatio[1]}}  
                </strong>
                &hairsp;
                <button class="btn smallBtn" @click="decreaseValues"> edit </button>
                </p> 


            <p> # of values:<span style="display:inline; color:red">*</span>
                &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;
                <button class="btn smallBtn" @click="decreaseValues"> - </button>
                &hairsp;&hairsp;&hairsp;&hairsp;&hairsp;<strong>{{ numValues }}</strong>&hairsp;&hairsp;&hairsp;&hairsp;
                <button class="btn smallBtn" @click="increaseValues"> + </button>
            </p>

            <p> canvas bg: &emsp; &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;
                <button class="btn smallBtn" @click="decreaseBg"> - </button>
                <strong> #{{bgColorNum}}</strong> <button class="btn smallBtn" @click="increaseBg"> + </button>
                </p>

            <p> interface bg: &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp; <strong>white</strong></p>
            <p> accent color: &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp; <strong>{{accentColor}}</strong> </p>
            <br>
            <p style="color:red"> *WARNING: changing these will reset your canvas</p>

            <br>


            <button class="btn" @click="close"> close </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingsModal",
        data: () => ({
            accentColor: null
        }),
        props: ['numValues', 'darkMode', 'aspectRatio', 'bgColorNum'],
        emits: ['close', 'increaseValues', 'decreaseValues', 'increaseBg', 'decreaseBg'],
        methods: {
            close(){
                this.$emit("close");
            },             
            
            increaseValues(){
                this.$emit("increaseValues");
            },

            decreaseValues(){
                this.$emit("decreaseValues");
            },
            
            increaseBg(){
                this.$emit("increaseBg");
            },
            
            decreaseBg(){
                this.$emit("decreaseBg");
            }
        },
        mounted() {
            this.accentColor = "thistle"
        }

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