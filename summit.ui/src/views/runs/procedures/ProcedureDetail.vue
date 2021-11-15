<template>
     <v-row v-if="procedure">
        <v-col cols="3">
            <v-row>
                <RunInfo />
            </v-row>
            <v-row>
                <ProcedureInfo :runProcedureInfo="{procedurInfo}"/>
            </v-row>
            <v-row>
                <MetaDataCard :JsonData="procedurInfo.metaData"/>
            </v-row>
        </v-col>
        <v-col cols="8">
            <SummitTable
                :Title="'Data'"
                :DataWrapper="procedureDataTable"
                :Headers="headers"
                @pagerChanged="OnPagerChange($event)">

                <template v-slot:item.id="{item}">
                        <v-btn text @click="navigateTo(`${runId}/procedures/${item.id}`)">
                            {{ item.id }}
                        </v-btn>
                    </template>
            </SummitTable>
        </v-col>
     </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { httpInstance } from '@/utils/auth'

import { RunInfo } from '@/components/Runs'
import { ProcedureInfo } from '@/components/Runs'
import { SummitTable, MetaDataCard } from '@/components/Common'
import { TableModel } from "@/models";
import { ProcedureDto } from '@/dto'
import { ProcedureDataHeaders } from '@/resources'

@Component({
    components: {
        RunInfo,
        ProcedureInfo,
        SummitTable,
        MetaDataCard
    }
})
export default class ProcedureDetail extends Vue {

private procedureId:  string = "";
private runId: string = "";
private procedureDataTable: TableModel = new TableModel("Data");
private procedure: ProcedureDto = null;
private procedurInfo: ProcedureDto = null;
private headers  = ProcedureDataHeaders;
async mounted(): Promise<void> {
    await this.getProcedureData(this.procedureDataTable);
    await this.getProcedureInfo();
}

private defaultFilter = {
		pageIndex: 0,
		pageSize: 1000,
		paginateResult: true,
        runId: '',
        procedureId: ''
	};

async getProcedureData(procedureDataTable: TableModel) {
    this.procedureDataTable.Loaded = false; 
    this.defaultFilter.runId = this.$route.params.id;
    this.defaultFilter.procedureId = this.$route.params.procedureId;

    const url = `runs/runProcedures/filter`;
    return httpInstance.post(url, this.defaultFilter).then(response => {
        if (response.data) {
            this.procedure = response.data.response;
            this.procedureDataTable.Loaded = true;
            this.procedureDataTable.Items = response.data.response;
            this.procedureDataTable.TotalRows = response.data.totalRecords;
        }
    }).catch (err => console.log(err));  
}

async getProcedureInfo() {
    this.runId = this.$route.params.id;
    this.procedureId = this.$route.params.procedureId;
    const url = `runs/${this.runId}/procedures/${this.procedureId}`;
    return httpInstance.get(url).then(response => {
        if (response.data) {
            this.procedurInfo = response.data;
        }
    }).catch (err => console.log(err));  
}

async OnPagerChange(pager: any) {
		this.defaultFilter = { ...this.defaultFilter, ...pager };
		await this.getProcedureData(this.procedureDataTable);
	}

}

</script>
