<template>
	<v-card 
    max-width="100%"
    >
    <v-card-title>{{Title}}</v-card-title>
		<v-data-table
			:items="LoadedRuns.Items"
			class="elevation-1"
			:loading="!LoadedRuns.Loaded"
			:headers="Headers"
            :options.sync="options"
            :server-items-length="LoadedRuns.TotalRows"
			loading-text="Loading... Please wait"
		>
        <template v-slot:item.id="{item}">
            <v-btn text @click="navigateTo(`runs/${item.id}`)">
                {{ item.id }}
            </v-btn>
        </template>
        <template v-slot:item.partItemId="{item}">
            <v-btn text @click="navigateTo(`parts/${item.partNumber}/items/${item.partItemId}`)">
                {{ item.partItemId }}
            </v-btn>
        </template>
        <template v-slot:item.processStatusId="{ item }">
            <v-chip x-small dark :color="item && item.processStatusId && getBadgeClass(item.processStatusId)">
                {{item.processStatusId}}
            </v-chip>
        </template>
        <template v-slot:item.completed="{ item }">
            {{ friendlyDateString(item.completed) }}
        </template>
        </v-data-table>
	</v-card>
</template>

<style>
.v-data-table__wrapper {
    overflow-x: hidden !important;
    overflow-y: hidden;
}
</style>

<script lang="ts">
import {
	Component,
	Vue,
	Emit,
	Prop,
	Watch,
	Mixins
} from "vue-property-decorator";

import { DataHeader, RunListHeaders } from "@/resources";
import { RunObject } from '@/dto'
import { WebUtilityMixin } from '@/mixins'

@Component({
    mixins: [WebUtilityMixin]
})
export default class extends Mixins(Vue, WebUtilityMixin) {
    public options: any = { itemsPerPage: 5 }; //REV1 // eslint-disable-line
    private Headers: Array<DataHeader> = RunListHeaders;

	@Prop({ default: true })
	private IsLoading: boolean;

	@Prop({ default: "" })
	private Title: string;

	@Prop({})
    private LoadedRuns: RunObject;
    
    @Prop({})
    private ItemCount: number;


    @Watch("options") 
    private OnChangeOptions() {
        const pageSize = this.options.itemsPerPage;
        const pageIndex = this.options.page -1;
        const paginate = pageSize > -1;
        // Needs Typing
        const filter = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            partType: this.LoadedRuns.Name,
            paginateResult: paginate
        }
        
       this.emitPager(filter);
    }

   @Emit('pagerChanged')
   private emitPager(filter: any): any { //REV1
       return filter;
   }

}
</script>
