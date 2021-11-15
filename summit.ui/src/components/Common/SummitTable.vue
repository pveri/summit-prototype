<template>
	<v-card 
    >
    <v-card-title>{{Title}}</v-card-title>
		<v-data-table
			:items="DataWrapper.Items"
			class="elevation-1"
			:loading="!DataWrapper.Loaded"
			:headers="Headers"
            :options.sync="options"
            :disable-pagination="isPagerEnabled"
            :server-items-length="DataWrapper.TotalRows"
			loading-text="Loading... Please wait"
		>
        <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="item">
            <slot :name="slot" v-bind="item" />
        </template>

        </v-data-table>
	</v-card>
</template>

<script lang="ts">
import {
	Component,
	Vue,
	Emit,
	Prop,
	Watch,
	Mixins
} from "vue-property-decorator";

import { DataHeader } from "@/resources";
import { TableModel } from '@/models'
import { WebUtilityMixin } from '@/mixins'

@Component({
    mixins: [WebUtilityMixin]
})
export default class SummitTable extends Mixins(Vue, WebUtilityMixin) {
    public options: any = {}; //REV1 // eslint-disable-line

    @Prop({default: null})
    private Headers: Array<DataHeader>;

	@Prop({ default: true })
	private IsLoading: boolean;

	@Prop({ default: "" })
	private Title: string;

	@Prop({})
    private DataWrapper: TableModel;
    
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
            // partType: this.LoadedRuns.Name, //TODP REV1
            paginateResult: paginate
        }
        
       this.emitPager(filter);
    }

    private get isPagerEnabled () {
        return this.DataWrapper.TotalRows > 10;
    }
   @Emit('pagerChanged')
   private emitPager(filter: any): any { //REV1
       return filter;
   }

}
</script>
