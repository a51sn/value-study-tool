<template>
    <button v-bind:style="{backgroundColor: value}">
        {{ value }}
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
        data: () => ({
            
        })
    }
</script>

<style scoped>

button {
    padding: 10px;
    border-radius: 15px;
}


</style>