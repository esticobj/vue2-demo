<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>{{$store.state.name}}</h2>
    <h2>{{score}}</h2>
    <el-button @click="add()">+</el-button>
    <el-button @click="sub()">-</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed:{
    ...mapState(['score']),
    
  },
  methods:{
    add(){
      this.addScore({score:2})
      // 等价于
      // this.$store.commit('addScore',{score:2}) 
      // 等价于
      // this.$store.commit({
      //   type: 'addScore',
      //   score: 2
      // })  
      
    },
    sub(){
      this.addScoreAsync({score:-1})
    },
    ...mapMutations(['addScore']),

    ...mapActions(['addScoreAsync'])
  }
}
</script>
