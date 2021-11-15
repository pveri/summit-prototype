<template>
<v-row>
    <v-col cols="3">
        <v-container fluid>
            <CalibrationFilter
             @DropDownChanged="this.onFilterChange($event)"
             @Search="onSearch($event)"
             @Reset="this.onReset()"/>
        </v-container>
    </v-col>
    <v-col cols="7">
        <v-container fluid>
        <SummitTable 
        :Title="'Calibrations'"
        :IsLoading="!calibrationsModel.Loaded"
        :DataWrapper="calibrationsModel"
        :Headers="headers"
        @pagerChanged="OnPagerChange($event)"
        >
            <template v-slot:item.id="{item}">
                <v-btn text @click="navigateTo(`calibrations/${item.id}`)">
                    {{ item.id }}
                </v-btn>
            </template>
            <template v-slot:item.partItemId="{item}">
                <v-btn text @click="navigateTo(`parts/${item.partNumber}/items/${item.partItemId}`)">
                    {{ item.partItemId }}
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

import { CalibrationFilter } from '@/components/Calibrations'
import { SummitTable } from '@/components/Common/'
import { TableModel } from '@/models';
import { CalibrationHeaders } from '@/resources'
import { WebUtilityMixin } from '@/mixins'

@Component({
    mixins: [
        WebUtilityMixin
    ],
    components: {
        CalibrationFilter,
        SummitTable
    }
})
export default class CalibrationList extends Mixins(Vue, WebUtilityMixin) {

    // Two separate components may have two 
    private filterDataLoading: boolean = false;
    private tableDataLoading: boolean = false;

    private headers = CalibrationHeaders;
    private calibrationsModel = new TableModel("Calibrations");
    private filterDto = {} as any;
    
    private defaultFilter = {
        pageIndex: 0,
        pageSize:10,
        paginateResult: true
    }

    async mounted () {
        await this.FetchData(this.calibrationsModel);
    }

    async FetchData(calibrations: TableModel) {
        if (!this.tableDataLoading) {

            this.tableDataLoading = true;
            calibrations.Loaded = false;

            await httpInstance.post("calibrations/filter", this.defaultFilter)
                .then( response => { 
                  calibrations.Items = response.data.response;// response.data.response;
                  calibrations.TotalRows = response.data.totalRecords;
                  calibrations.Loaded = true;
                  this.tableDataLoading = false;
                  }
                );
        }
    }

    onItemClick() {
        return;
    }
    /* eslint-disable*/
    async onFilterChange(filter: any) {
        // decide if this is needed before implementing REV1
        return;
    }
    /* eslint-enable*/
    async onSearch(filterOptions: any) {
        this.defaultFilter = {...this.defaultFilter, ...filterOptions};
        await this.FetchData(this.calibrationsModel);
    }

    async OnPagerChange(pager: any) {
        this.defaultFilter = {...this.defaultFilter, ...pager};
        await this.FetchData(this.calibrationsModel);
    }

    // Don't know if this is needed yet...not enough data in db REV1
    private resetPager (tableData: any) { //Todo: create paginatedResponseDTO
        const page = tableData.totalRecords/this.defaultFilter.pageSize;
        if (page > this.defaultFilter.pageIndex) {
            this.defaultFilter.pageIndex = 0; //sync required?
        }
    }
  
}
</script>