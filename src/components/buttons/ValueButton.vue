<template>
    <button v-bind:style="{backgroundColor: value}" @click="select">
    </button>
</template>

<script>
    export default {
        name: "ValueButton",
        props: {
            value: String, 
            selected: Boolean
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

button:hover{
    padding:13px;
    margin: 4px;
}

/* double border if active */


</style>