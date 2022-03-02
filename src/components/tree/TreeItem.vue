<template>
	<li
		class="item"
		v-for="(item, index) in nodes"
		:class="{ 'item-active': item.expand }"
		@click="expandNode(item)"
	>
		<div class="mode">
			<font-awesome-icon :icon="getIcon(item)" />
			<span class="item-name">{{ item.label }}</span>
		</div>
	</li>
</template>

<script lang="ts" setup>
	
//子组件向父组件事件传递
const emit = defineEmits(["expandNode"]);

const props = defineProps(
{ 
    nodes: null
 })



function expandNode(item:any){

	emit("expandNode", item);
}

function getIcon(item: any) {

    if (item.child) {
        if (item.expand) {
            return ['far', 'folder-open'];
        }
        return ['fas', 'folder-plus'];
    }
    return ['far', 'file-lines'];
}
</script>