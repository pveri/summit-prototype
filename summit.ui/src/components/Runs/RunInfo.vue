<template>
<v-container fluid>
    <v-card>
        <v-card-title>Run</v-card-title>
        <v-card-text>
              <dl class="row mb-0">
        <dt class="col-sm-4">DUT</dt>
        <dd class="col-sm-7">{{run.partItemId}}</dd>

        <dt class="col-sm-4">Status</dt>
        <dd class="col-sm-7"><span class="badge badge- run.status_badge_class "> {{run.processStatusId}} </span></dd>

        <dt class="col-sm-4">User</dt>
        <dd class="col-sm-7"> run.user </dd>

        <dt class="col-sm-4">Suite</dt>
        <dd class="col-sm-7"> {{run.suite}} </dd>

        <dt class="col-sm-4">Started</dt>
        <dd class="col-sm-7"> {{run.createdDate}} </dd>

        <dt class="col-sm-4">Updated</dt>
        <dd class="col-sm-7"> {{run.updateDate}} </dd>

        <dt class="col-sm-4">Completed</dt>
        <dd class="col-sm-7"> {{run.completed}} </dd>
    </dl>
        </v-card-text>
        
    </v-card>
</v-container>
</template>
<script lang="ts">
import { RunDto } from "@/dto/run-dto";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { httpInstance } from '@/utils/auth'

@Component({})
export default class RunInfo extends Vue {
@Prop({default:null})
private run: RunDto;
private runId: any;

@Watch('$route', { immediate: true, deep: true })
   async onUrlChange(newVal: Route) {
      await this.getRunInfo();
    }

async getRunInfo() {

    this.runId = this.$route.params.id;
    await httpInstance.get(`/runs/${this.runId}`).then(response => {
    this.run = response.data;
    });
}

}

</script>