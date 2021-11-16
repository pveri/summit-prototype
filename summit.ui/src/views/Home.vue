<template>
  <div class="home">
    <v-row>
      
      <v-col cols="4">
        <RunsList
        :Title="'Recent Detectors'"
        :IsLoading="!DetectorRuns.Loaded"
        :LoadedRuns="DetectorRuns"
        @pagerChanged="OnPagerChange($event)" />
      </v-col>
    
      <v-col cols="4">
        <RunsList
        :Title="'Recent Modules'"
        :IsLoading="!ModuleRuns.Loaded"
        :LoadedRuns="ModuleRuns"
        @pagerChanged="OnPagerChange($event)" />
      </v-col>
    
      <v-col cols="4">
        <RunsList
          :Title="'Recent Sensors'"
          :LoadedRuns="SensorRuns"
          @pagerChanged="OnPagerChange($event)" />
      </v-col>
    
    </v-row>
  </div>
</template>

<script lang="ts"> 
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { httpInstance } from '@/utils/auth'
import RunsList from '@/components/Home/RunsList.vue'
import { RunObject } from '@/dto'
import { RunsMixin } from '@/mixins'
@Component({
  mixins: [RunsMixin],
  components: {
    RunsList
  },
})
export default class Home extends Mixins(Vue, RunsMixin) {

  private DetectorRuns: RunObject = new RunObject("detector");
  private ModuleRuns: RunObject = new RunObject("module");
  private SensorRuns: RunObject = new RunObject("sensor");

  async created () {
    console.log("In created");
    await this.LoadData();
  }

  async LoadData(): Promise<void> {
    await Promise.all([
      this.FetchData(this.DetectorRuns),
      this.FetchData(this.ModuleRuns),
      this.FetchData(this.SensorRuns)
    ])
  }

  async FetchData(RunType: RunObject, runFilter: any = null) {
    if (runFilter) {
      RunType.Loaded = false;
      const filter = {
        PartType: RunType.Name,
        ...runFilter
      }
      await httpInstance.post("runs/filter", filter)
                  .then( response => { 
                    RunType.Items = this.loadRunItems(response.data);// response.data.response;
                    RunType.TotalRows = response.data.totalRecords;
                    RunType.Loaded = true;
                    }
                  );
    }

  }

async OnPagerChange(e: any) { //TODO Fix this REV1
  //if (e.partType && e.pageIndex && e.pageSize) {
    switch (e.partType) {
      case "module":
        await this.FetchData(this.ModuleRuns, e);
        break;
      case "detector":
        await this.FetchData(this.DetectorRuns, e);
        break;
      case "sensor":
        await this.FetchData(this.SensorRuns, e);
        break;
    }
}

  // Failed to load dialog REV1

}

</script>
