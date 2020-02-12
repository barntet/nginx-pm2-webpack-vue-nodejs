<template>
    <div id="app">
        <div>
            <input type="text" v-model="username">
            <input type="password" v-model="password">
        </div>
        <button @click="submit">提交</button>
        <div>{{msg}}</div>    
       
    </div>
</template>
<script>
import axios from 'axios'
export default  {
    data(){
        return {
            username:'',
            password:'',
            msg:""
        }
    },
    methods:{
        submit(){
            axios.post('/api/coding/login',{
                username:this.username,
                password:this.password
            }).then((res)=>{
                if(res.status == 200){
                    this.msg = res.data
                }
            })
        }
    }
}
</script>

<style>
</style>