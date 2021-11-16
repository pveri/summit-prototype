<template>
    <v-row>
        <v-col cols="3">
            <v-row>
                <RunInfo />
            </v-row>
            <v-row v-if="run">
                <MetaDataCard :JsonData="run.metaData"/>
            </v-row>
        </v-col>
        <v-col cols="8">
            <v-container fluid>
            <SummitTable
                :Title="'Procedures'"
                :DataWrapper="procedures"
                :Headers="headers">

                <template v-slot:item.id="{item}">
                        <v-btn text @click="navigateTo(`${runId}/procedures/${item.id}`)">
                            {{ item.id }}
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

import { SummitTable, MetaDataCard } from '@/components/Common'
import { RunInfo } from '@/components/Runs'
import { TableModel } from '@/models';
import { ProcedureListHeaders } from '@/resources'
import { RunDto } from '@/dto/run-dto';
import { WebUtilityMixin } from '@/mixins'
@Component({
    mixins:[
        WebUtilityMixin
    ],
    components: {
        SummitTable,
        RunInfo,
        MetaDataCard
    }
})
export default class RunDetail extends Mixins(Vue, WebUtilityMixin) {

    private run: RunDto = null;
    private runId: string = '';
    private tableLoading: boolean = false;
    private procedures = new TableModel("Procedures");
    private headers = ProcedureListHeaders;

    async mounted (): Promise<void> {
        this.runId = this.$route.params.id;
        this.run = await this.getRunInfo(parseInt(this.runId));
        await this.getProcedures(this.procedures);
    }

    private async getRunInfo(id: number): Promise<RunDto> {
        const url = `runs/${id}`;
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }

    private defaultFilter = {
		pageIndex: 0,
		pageSize: 10,
		paginateResult: true,
        RunId: ''
    };

    private async getProcedures(procedures: TableModel) {
	if (!this.tableLoading) {
			this.tableLoading = true;
			procedures.Loaded = false;
            this.defaultFilter.RunId = this.runId;
			await httpInstance.post(`/runs/runAllProcedures/filter`, this.defaultFilter).then(response => {
				procedures.Items = response.data.response; // response.data.response;
				procedures.TotalRows = response.data.length;
				procedures.Loaded = true;
				this.tableLoading = false;
			});
		}
    }
}
</script>