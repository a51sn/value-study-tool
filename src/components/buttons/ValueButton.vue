<template>
    <button v-bind:style="{backgroundColor: value}" @click="select">
    </button>
</template>

<script>
    // TODO: move all of this logic to master
    // packages
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
    padding: 20px;
    margin: 2px;
    border-radius: 30px;
}


</style>