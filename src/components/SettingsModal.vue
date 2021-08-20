<template>
    <div class="backdrop">
        <div class="settingsModal">
            <h3> settings </h3> 
            <div v-if="!showingAspectRatioOptions">
                <p> aspect ratio:<span style="display:inline; color:red">*</span> 
                    &emsp;&emsp;&emsp; &hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;


                    <span>
                        <strong>{{aspectWidth}}:{{aspectHeight}}  </strong>
                        &hairsp;
                        <button class="btn smallBtn" @click="toggleAspectRatioOptions"> edit </button> 
                    </span>
                </p> 


                <p> # of values:<span style="display:inline; color:red">*</span>
                    &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;

                    <span>
                        <button class="btn smallBtn" @click="decreaseValues"> - </button>
                        &hairsp;&hairsp;&hairsp;&hairsp;&hairsp;<strong>{{ numValues }}</strong>&hairsp;&hairsp;&hairsp;&hairsp;
                        <button class="btn smallBtn" @click="increaseValues"> + </button>
                    </span>
                </p>

                <p> canvas bg: 
                    &emsp; &emsp; &emsp; &emsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;&hairsp;

                    <span>
                        <button class="btn smallBtn" @click="decreaseBg"> - </button>
                        <strong> #{{bgColorNum}}&nbsp;</strong> 
                        <button class="btn smallBtn" @click="increaseBg"> + </button>
                    </span>
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
                <button class="btn aspectOption" @click="chooseAspectRatio(0)" > {{aspectRatioOptions[0][0]}} : {{aspectRatioOptions[0][1]}} </button>
                <button class="btn aspectOption" @click="chooseAspectRatio(1)"> {{aspectRatioOptions[1][0]}} : {{aspectRatioOptions[1][1]}} </button>
                <button class="btn aspectOption" @click="chooseAspectRatio(2)"> {{aspectRatioOptions[2][0]}} : {{aspectRatioOptions[2][1]}}</button>
                <button class="btn aspectOption" @click="chooseAspectRatio(3)"> {{aspectRatioOptions[3][0]}} : {{aspectRatioOptions[3][1]}}</button>
                <button class="btn aspectOption" @click="chooseAspectRatio(4)"> {{aspectRatioOptions[4][0]}} : {{aspectRatioOptions[4][1]}}</button>
                <button class="btn aspectOption" @click="chooseAspectRatio(5)"> {{aspectRatioOptions[5][0]}} : {{aspectRatioOptions[5][1]}}</button>
                <br>

                <br>

                <p style="color:red; "> **also note that some of these result in canvases that are too small or too large, i'm working on resizing it according to the size of window.</p>

                <button class="btn" @click="applyAspectRatio"> apply selections </button>
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
            aspectRatioOptions: null,
            aspectRatioChosen: null,
            orientations: null,
            orientation: null,
        }),
        props: ['numValues', 'darkMode', 'aspectRatio', 'bgColorNum', 'accentColor'],
        emits: ['close', 'increaseValues', 'decreaseValues', 'increaseBg', 'decreaseBg', 'changeAspectRatio'],
        computed: { 
            aspectWidth: function() {
                return this.aspectRatio[0];
            },

            aspectHeight: function() {
                return this.aspectRatio[1];
            }
        },
        methods: {
            close(){
                this.$emit("close");
            },     

            toggleAspectRatioOptions () {
                this.showingAspectRatioOptions = !this.showingAspectRatioOptions;
            },
            
            toggleOrientation() {
                this.orientation = Math.abs(this.orientation - 1);
                for(let i = 0; i < this.aspectRatioOptions.length; i++){
                    let temp = this.aspectRatioOptions[i][0]
                    this.aspectRatioOptions[i][0] = this.aspectRatioOptions[i][1]
                    this.aspectRatioOptions[i][1] = temp
                }
            },

            chooseAspectRatio(index){
                this.aspectRatioChosen = this.aspectRatioOptions[index]
            },

            applyAspectRatio(){
                this.$emit("changeAspectRatio", this.aspectRatioChosen)
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
            this.aspectRatioOptions = [[1,1], [4,3], [3,2], [5,3], [16, 9], [21, 9]] 
            this.aspectRatioChosen = 2
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
    padding: 20px;
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