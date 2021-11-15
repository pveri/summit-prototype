<template>
<!-- TODO: Styling Rev1 -->
    <v-card max-width="400" :loading="FilterLoading">
        <v-card-title>{{Title}}</v-card-title>
        <v-list>
 <v-list-item v-for="item in Items" :key="item.Label">
            <DynamicSelect :ItemData="item" />
        </v-list-item> 
        </v-list>
        <v-row>
            <v-col>
                <v-card-actions class="justify-center"> 
                <v-btn color="primary" :loading="DataLoading" :disabled="DataLoading" @click="onSearch()">Search</v-btn>
                <v-btn color="yellow" :Disabled="DataLoading" @click="resetSelections()">Reset</v-btn>
                </v-card-actions>
            </v-col>
            </v-row>
    </v-card>
</template> 
<script lang="ts">

import {
	Component,
    Vue,
    Prop,
    Emit,
    Watch
} from "vue-property-decorator";

import  DynamicSelect  from './DynamicSelect.vue'
import { SelectModel } from "../../models";

@Component({ 
    components: { 
        DynamicSelect
    }
})
export default class CascadingFilter extends Vue {

    @Prop({default : "Filter"})
    private Title: string;

    @Prop({})
    readonly Items!: Array<SelectModel>;

    @Prop({default: false})
    private DataLoading: boolean;

    @Prop({default:false})
    private FilterLoading: boolean;

    private get getItems(): Array<SelectModel> {
        return this.Items;
    }
/* eslint-disable */
    @Watch('Items', {deep:true})
    private watchItems(val) {
        // Discuss if dynamic filtering wanted/needed REV1
    }
/* eslint-enable */
    @Emit('doReset')
    private resetSelections(): void {
        return;
    }

    @Emit('doSearch')
    private onSearch(): void {

        return;
    }

}
// List of DynamicSelect components
// Each DynamicSelect has a title, a default value,
// a listener for data-loaded event, and a emitter for data selected
// There is also a listener on the DynamicSelect for a "Reset" event
// This Cascading select has an emit for a search button

// FUTURE: Bookmarkable selections
</script>