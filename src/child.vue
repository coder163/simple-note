<template>
	
    <ul>
        
        <li>
            <div  @click="ss">
                啊啊啊啊啊啊啊啊{{name}}
            </div>
        </li>
    </ul>

</template>

<script setup lang="ts">

import { onMounted, ref,watch } from 'vue';


const props = defineProps(
{ 
    name: null,
  
 })
	
 const emit=defineEmits(['see'])

function ss(){
    console.log('*******')

    emit("see", 1); 
}
</script>