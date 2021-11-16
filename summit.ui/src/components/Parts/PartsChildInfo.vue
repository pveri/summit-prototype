<template>
    <v-container fluid>
        <SummitTable v-if="this.childFlag"
        :Title="'Children'"
        :IsLoading="!partsChildFilterModel.Loaded"
        :DataWrapper="partsChildFilterModel"
        :Headers="headers"
        >
        <template v-slot:item.serialNumber="{item}">
            <v-btn text @click="navigateTo(`/parts/${item.partNumber}/items/${item.serialNumber}`)">
                {{ item.serialNumber }}
            </v-btn>
        </template> 
        </SummitTable>

    </v-container>
</template> 

<script lang="ts">

import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { httpInstance } from '@/utils/auth'
import { SummitTable } from "@/components/Common"
import { TableModel } from "../../models"
import { PartsChildHeaders } from '@/resources/data-tables'
import { WebUtilityMixin } from '@/mixins'

@Component({
    mixins:[
        WebUtilityMixin
    ],
    components: {
        SummitTable,
    }
})

export default class PartsChildInfo extends Vue {

    private headers = PartsChildHeaders
    private PartsChildInfoDataLoading: boolean = false
    private partsChildModel = new TableModel("PartsChildren")
    private partsChildFilterModel = new TableModel("PartsFilterChildren") 
    private partNo: Array<any> = []; 
    private childFlag: boolean = false

    private defaultFilter = {
        pageIndex: 0,
        pageSize: 10,
        paginateResult: true,
        parentId: ''
    }

    @Watch('$route', { immediate: true, deep: true })
    async onUrlChange(newVal: Route) {
        this.defaultFilter.parentId = this.$route.params.partId;
        await this.FetchPartsChildrenData(this.partsChildModel, this.partsChildFilterModel);
    }

    async FetchPartsChildrenData(partsChild: TableModel, partsFilterChild: TableModel) {
            if (!this.PartsChildInfoDataLoading) {

                this.PartsChildInfoDataLoading = true;
                partsChild.Loaded = false;
                this.childFlag = false;

                await httpInstance.post("/parts/items/filter", this.defaultFilter)
                    .then( response => { 
                    partsChild.Items = response.data.response;// response.data.response;
                    partsChild.TotalRows = response.data.totalRecords;
                    partsChild.Loaded = true;
                    this.PartsChildInfoDataLoading = false;
                    }).catch (err => console.log(err));
            }
        if (partsChild.TotalRows > 0) { 
            for(const i in partsChild.Items) {
                partsFilterChild.Items = partsChild.Items.filter(e => e.serialNumber[0].includes("M"))
                partsFilterChild.Loaded = true;
                }
            this.childFlag = true;}
        }

    }
</script>