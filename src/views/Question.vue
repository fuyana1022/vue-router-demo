<template>
    <div class="question" v-if='question'>
        <div class="main"> 问题：{{ question.title }} </div>
        <div class="other">
            <div 
                v-for="other in otherQuestionList" 
                :key="other.id"
                :class="other.type"
                @click="handleClick(other.id)">
                    {{ other.title }}
            </div>
            <!-- <div class="prev" :title="question.prev"> {{ question.prev }} </div>
            <div class="next" :title="question.next"> {{ question.next }} </div> -->
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteLeave(to, from, next){
        console.log('beforeRouteLeave');
        const isGo = window.confirm('真的要走吗');
        isGo ? next() : next(false);
    },
    props: {
        id: {
            type: [String, Number],
        },
        name: {
            type: String,
            default: 'question',
        }
    },
    data(){
        return{
            question: null
        }
    },
    computed: {
        otherQuestionList(){
            const arr = []; 
            if(this.question.prev){
                const {prevId, prev} = this.question;
                arr.push({
                    type: 'prev',
                    title: prev,
                    id: prevId
                })
            }

            if(this.question.next){
                const {nextId, next} = this.question;
                arr.push({
                    type: 'next',
                    title: next,
                    id: nextId
                })
            }
            
            return arr;
        }
    },
    mounted(){
        //    this.getData();
        // console.log(`"name:"${this.name}", id:"${this.id}`);
    },
    methods: {
        handleClick(id) {
            const {name} = this;
            this.$router.push({
                name,
                params: {
                    id
                }
            })
        },
        getData(){
            // const {id} = this.$route.params;
            const {id} = this;

            this.$axios.get(`/question/${id}`).then(res => {
            this.question = res;
        })   
        }
    },
    watch: {
        '$route': {
            handler(){
                this.getData();
            },
            immediate: true
        }
    }
}
</script>


<style scoped>
.main {
    margin-bottom: 200px;
}

.prev {
    float: left;
}

.next {
    float: right;
}

.prev, .next {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #3385ff;
    text-decoration: underline;
    cursor: pointer;
}
</style>