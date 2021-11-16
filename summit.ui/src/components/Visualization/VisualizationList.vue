<template>
    <!-- <v-virtual-scroll height="800" item-height="100"> -->
        <div>
        <v-card flat :outlined="false" :rounded="false" v-for="testType in getTestTypes" :key="testType">
            <v-card-title>{{testType}}</v-card-title>
            <v-expansion-panels accordion>
            <v-expansion-panel v-for="([plotName, plots], i) in Object.entries(getPlotsByTestType(testType))" :key="i">
                <v-expansion-panel-header>{{plotName}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <VisualizationLoader :Plots="plots"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
        </div>
    <!-- </v-virtual-scroll> -->
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { PlotGroup, Plot } from '@/dto/visualization-dto'

@Component({
    components:{
        VisualizationLoader: () => import('@/components/Visualization/VisualizationLoader.vue')
    }  
})
export default class VisualizationList extends Vue {

    @Prop({})
    private PlotGroups: Array<PlotGroup>;

    private get getTestTypes() {
        return this.PlotGroups.map( x => x.testType);
    }

    private getPlotsByTestType(testType: string): any {
        
        const plotGroup = this.PlotGroups.find( x=> x.testType == testType);
        let plots = {};
        if (plotGroup) {
            plots = plotGroup.plots.reduce( (dict, arr) => {
                dict[arr.plotName] = dict[arr.plotName] || [];
                dict[arr.plotName].push(arr);
                return dict;
            }, {});

        }
        return plots;
    }
}
</script>