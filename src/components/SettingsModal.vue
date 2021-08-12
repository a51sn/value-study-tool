<template>
    <div class="backdrop">
        <div class="settingsModal">
            <h3> settings </h3> 
            <div v-if="!showingAspectRatioOptions">
            <p> aspect ratio:<span style="display:inline; color:red">*</span> 
                &emsp;&emsp;&emsp; &hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;
                <strong>
                {{aspectRatio[0]}}:{{aspectRatio[1]}}  
                </strong>
                &hairsp;
                <button class="btn smallBtn" @click="toggleAspectRatioOptions"> edit </button>
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
            <p> accent color: &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp; <strong>{{thisAccentColor}}</strong> </p>
            <br>
            <p style="color:red"> *WARNING: changing these will reset your canvas</p>

            <br>


            <button class="btn" @click="close"> close </button>
            </div>
            <div v-else>
                <p style="color:red; text-align:center"> WARNING: clicking apply selections will reset your canvas!**</p>
                
                <p>&nbsp; orientation: &nbsp;<strong> {{orientations[orientation]}}</strong>&nbsp;<button class="btn" @click="toggleOrientation"> switch</button> 
                </p> 
                <br>
                <button class="btn aspectOption"> 1:&nbsp;1 </button>
                <button class="btn aspectOption"> 4:&nbsp;3 </button>
                <button class="btn aspectOption"> 3:&nbsp;2 </button>
                <button class="btn aspectOption"> 16:9 </button>

                <button class="btn aspectOption"> 5:&nbsp;3</button>

                <button class="btn aspectOption"> 21:9</button>
                <br>

                <br>

                <p style="color:red; "> **jk i haven't implemented this yet</p>

                <button class="btn" @click="close"> apply selections </button>
                <button class="btn" @click="toggleAspectRatioOptions"> back </button>
                <button class="btn" @click="close"> close </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingsModal",
        data: () => ({
            thisAccentColor: null,
            showingAspectRatioOptions: null,
            newAspectRatio: null,
            orientations: null,
            orientation: null
        }),
        props: ['numValues', 'darkMode', 'aspectRatio', 'bgColorNum', 'accentColor'],
        emits: ['close', 'increaseValues', 'decreaseValues', 'increaseBg', 'decreaseBg', 'changeAspectRatio'],
        methods: {
            close(){
                this.$emit("close");
            },     

            toggleAspectRatioOptions () {
                this.showingAspectRatioOptions = !this.showingAspectRatioOptions;
            },
            
            toggleOrientation() {
                this.orientation = Math.abs(this.orientation - 1);
            },

            applyAspectRatio(){
                this.$emit("changeAspectRatio")
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
            this.thisAccentColor = "thistle";
            this.showingAspectRatioOptions = false;
            this.orientations = ["landscape", "portrait "]
            this.orientation = 0;
        }

    }
</script>

<style scoped>
.settingsModal {
    width:400px;
    padding: 20px;
    margin: 8% auto;
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

.aspectOption {
    font-weight: bold;
    display:inline-block;
    padding: 30px;
    margin: 2px;
    border-style:solid;
    border-color: black;
    border-width: 1px;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 0.1s;
}

.aspectOption:hover {
    background-color: thistle;
}

.activeOption {
    background-color: thistle;
}

</style>