<template>
<v-row>
    <v-col cols="3">
        <v-container fluid>
    <PartsFilterView 
            @DropDownChanged="this.onFilterChange($event)"
            @Search="onSearch($event)"
            @Reset="this.onReset()"/>
     </v-container>
    </v-col>
     <v-col cols="7">
        <v-container fluid>
        <SummitTable 
        :Title="'Parts'"
        :IsLoading="!partsModel.Loaded"
        :DataWrapper="partsModel"
        :Headers="headers"
        @pagerChanged="OnPagerChange($event)"
        >
            <template v-slot:item.serialNumber="{item}">
                <v-btn text @click="navigateTo(`parts/${item.partNumber}/items/${item.serialNumber}`)">
                    {{ item.serialNumber }}
                </v-btn>
            </template>
        </SummitTable>
        </v-container>
    </v-col>
</v-row>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { httpInstance } from '@/utils/auth'

import { PartsFilterView } from '@/components/Parts'
import { SummitTable } from '@/components/Common/'
import { TableModel, SelectModel } from '@/models';
import { PartListHeaders } from '@/resources'
import { WebUtilityMixin } from '@/mixins'
import { Getter } from 'vuex-class'
import { PartItemDto, PartType } from '@/dto'

@Component({
    mixins: [
        WebUtilityMixin
    ],
    components: {
        PartsFilterView,
        SummitTable
    }
})

export default class PartsList extends Mixins (Vue, WebUtilityMixin) {

    @Getter getPartTypes
    private partTypeOptions = new SelectModel("Part Type");

    created () {
    this.partTypeOptions.Data = this.getPartTypeOptions(this.getPartTypes);
    }

    private getPartTypeOptions (partTypes: Array<PartType>) {
    return partTypes.map( x => { return x.description } )
    }

    // Two separate components may have two 
    private filterDataLoading: boolean = false;
    private tableDataLoading: boolean = false;

    private headers = PartListHeaders;
    private partsModel = new TableModel("Parts");
    private filterDto = {} as any;
    
    private defaultFilter = {
        pageIndex: 0,
        pageSize:10,
        paginateResult: true
    }

    async mounted () {
        await this.FetchData(this.partsModel);
    }

    async FetchData(parts: TableModel) {
        if (!this.tableDataLoading) {

            this.tableDataLoading = true;
            parts.Loaded = false;

            await httpInstance.post("parts/items/filter", this.defaultFilter)
                .then( response => { 
                  parts.Items = response.data.response;// response.data.response;
                  parts.TotalRows = response.data.totalRecords;
                  parts.Loaded = true;
                  this.tableDataLoading = false;
                  }
                );
        }
    }
/* eslint-disable*/
    onItemClick() {
        return;
    }

    async onFilterChange(filter: any) {
        return;
    }
/* eslint-enable*/
    async onSearch(filterOptions: any) {
        this.defaultFilter = {...this.defaultFilter, ...filterOptions};
        await this.FetchData(this.partsModel);
    }

    async OnPagerChange(pager: any) {
        this.defaultFilter = {...this.defaultFilter, ...pager};
        await this.FetchData(this.partsModel);
    }

    // Don't know if this is needed yet...not enough data in db REV1
    private resetPager (tableData: any) { //Todo: create paginatedResponseDTO
        const page = tableData.totalRecords/this.defaultFilter.pageSize;
        if (page > this.defaultFilter.pageIndex) {
            this.defaultFilter.pageIndex = 0;
        }
    }
  
}
</script>
