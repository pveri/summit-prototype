<template>
    <v-row>  
        <v-col cols="3">
            <v-row>
                <PartsItemInfo :partId="this.partId"/>
            </v-row>
            <v-row>
                <PartsChildInfo/>
            </v-row>
            <v-row>
                <PartsParentInfo/>
            </v-row>  
        </v-col>
        <v-col cols="8">
            <v-row>
                <v-container fluid>
                    <SummitTable
                        :Title="'Runs'"
                        :DataWrapper="runsModel"
                        :Headers="RunsHeaders"
                        @pagerChanged="OnPagerChange($event)"
                    >
                    <template v-slot:item.id="{item}">
                            <v-btn text @click="navigateTo(`/runs/${item.id}`)">
                                {{ item.id }}
                            </v-btn>
                        </template>
                        <template v-slot:item.partItemId="{item}">
                            <v-btn text @click="navigateTo(`/parts/${item.partNumber}/items/${item.partItemId}`)">
                                {{ item.partItemId }}
                            </v-btn>
                        </template>
                        <template v-slot:item.processStatusId="{ item }">
                            <v-chip
                                dark
                                :color="
                                    item && item.processStatusId && getBadgeClass(item.processStatusId)
                                "
                            >
                                {{ item.processStatusId }}
                            </v-chip>
                        </template>
                        <template v-slot:item.completed="{ item }">
                            {{ friendlyDateString(item.completed) }}
                        </template>
                    </SummitTable>
                </v-container>
            </v-row>
            <v-row>
                <v-container fluid>
                <SummitTable 
                :Title="'Calibrations'"
                :IsLoading="!calibrationsModel.Loaded"
                :DataWrapper="calibrationsModel"
                :Headers="calibsHeaders"
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
            </v-row>
        </v-col>
    </v-row>     
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { httpInstance } from '@/utils/auth'

import { PartsItemInfo, PartsChildInfo, PartsParentInfo } from '@/components/Parts'
import { SummitTable, MetaDataCard } from '@/components/Common'
import { TableModel, SelectModel } from "@/models";
import { PartItemDto } from '@/dto'
import { RunListHeaders, CalibrationHeaders, DataHeader } from '@/resources'
import { WebUtilityMixin } from '@/mixins'


@Component({
    mixins:[
        WebUtilityMixin
    ],
    components: {
        PartsItemInfo,
        PartsChildInfo,
        PartsParentInfo,
        SummitTable,
        MetaDataCard,
    }
})
export default class PartsDetail extends Vue {

private runsModel = new TableModel("Runs");
private RunsHeaders = [...RunListHeaders, new DataHeader("Suite", "suite")];
private tableDataLoading: boolean = false;
private runId: string;
private parentPartNo = this.$route.params.partNo;
private parentPartId = this.$route.params.partId;
private partNo: string = '';
private partId: string = '';
private calibsHeaders = CalibrationHeaders;
private calibsTableDataLoading: boolean = false;
private calibrationsModel = new TableModel("Calibrations");

private defaultFilter = {
		pageIndex: 0,
		pageSize: 10,
		paginateResult: true,
        parentId: ''
    };

@Watch('$route', { immediate: true, deep: true })
   async onUrlChange(newVal: Route) {
      this.partNo = this.$route.params.partNo;
      this.partId = this.$route.params.partId;
      this.defaultFilter.parentId = this.$route.params.partId;
      await this.FetchCalibrationData(this.calibrationsModel);
      await this.FetchRunsData(this.runsModel);
    }

async mounted(): Promise<void> {
    await this.FetchCalibrationData(this.calibrationsModel);
}

async OnPagerChange(pager: any) {
        this.defaultFilter = { ...this.defaultFilter, ...pager };
        await this.FetchRunsData(this.runsModel);
    }
    
async FetchRunsData(runs: TableModel) {
            if (!this.tableDataLoading) {
                this.tableDataLoading = true;
                runs.Loaded = false;    
                await httpInstance.post(`/items/${this.partId}/runs`, this.defaultFilter).then(response => {
                    runs.Items = response.data.response; // response.data.response;
                    runs.TotalRows = response.data.totalRecords;
                    runs.Loaded = true;
                    this.tableDataLoading = false;
                });
            }
}

async FetchCalibrationData(calibrations: TableModel) {
        if (!this.calibsTableDataLoading) {

            this.calibsTableDataLoading = true;
            calibrations.Loaded = false;

            await httpInstance.post("calibrations/filter", this.defaultFilter)
                .then( response => { 
                  calibrations.Items = response.data.response;// response.data.response;
                  calibrations.TotalRows = response.data.totalRecords;
                  calibrations.Loaded = true;
                  this.calibsTableDataLoading = false;
                  }
                );
        }
    }

}

</script>