import { NodeKey, TreeNodeOptions } from "vue-virtual-tree";


export default class TNodeOption implements TreeNodeOptions {

    nodeKey: NodeKey = '';
    name: string = 'a';
    level?: number | undefined;
    loading?: boolean | undefined;
    hasChildren?: boolean | undefined;
    children?: TreeNodeOptions[] | undefined;
    parentKey?: NodeKey | null | undefined;
    path?: string = '';
}