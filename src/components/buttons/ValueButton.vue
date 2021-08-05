<template>
    <button v-bind:style="{backgroundColor: value}" :class="{selected : isSelected}" @click="select">
    </button>
</template>

<script>
    export default {
        name: "ValueButton",
        props: {
            value: String, 
            isSelected: Boolean
        },
        emits: ['selectValue'],
        data: () => ({

        }),
        methods: {
            select(){
                this.$emit('selectValue', this.value);
            }
        }
    }
</script>

<style scoped>

button {
    padding: 15px;
    margin: 2px;
    border-radius: 5px;
    transition-duration:0s;
}

button:not(.selected):hover{
    padding:13px;
    margin: 4px;
}

button.selected:hover{
    padding:12px;
    margin: 3px;
}

button:active{
    color: thistle;
}

.selected {
    padding: 13px;
    border: 4px solid thistle;
    border-radius: 5px;
}
/* double border if active */


</style>