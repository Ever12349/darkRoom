<template>
    <div class='my_bg'>
        <!-- {{ message }} -->
        <div class='my_header'>
            
        </div>
        <div class='my_body'>

        </div>
    </div>
</template>

<script>
export default {
    name:'my',
    data(){
        return {
            message:'呵呵呵'
        }
    }
};
</script>

<style scoped>
.my_bg {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("../../assets/我的/my_background_2.jpg");
  background-size:100%;
  background-repeat: no-repeat;
}
.my_header{
    width:100vw;
    height:60vw;
    
}
.my_body{
    /* margin-top:50vw; */
    width:100vw;
    min-height:100vw;
    background-color:#fff;
    border-top-left-radius: 5vw;
    border-top-right-radius: 5vw;
}
</style>



<style>
</style>
