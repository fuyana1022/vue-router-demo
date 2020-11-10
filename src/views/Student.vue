<template>
    <div class="student">
        学员展示
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next){
        next((vm) => {
            console.log(vm.name);
        })
    },
    data(){
        return {
            name: "student",
        }
    }
}
</script>