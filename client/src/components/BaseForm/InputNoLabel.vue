<script setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number, Date, URL, Array],
        default: ''
    }
})
</script>

<template>
    <input v-bind="$attrs" :placeholder="label" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<style scoped>
input {
    margin-top: 1rem;
    margin-bottom: 1rem
}
</style>