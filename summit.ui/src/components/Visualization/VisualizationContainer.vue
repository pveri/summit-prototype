<!--Tabbed Container -->
<template>
    <v-card>
        <v-progress-linear v-model="plotLoadProgress"/>
         <v-tabs v-model="selectedModule">
            <v-tab v-for="mod in getModules" :key="mod.serialNumber">
                {{ mod.serialNumber }}
            </v-tab>
         </v-tabs>
         <v-tabs-items v-model="selectedModule">
             <v-tab-item v-for="mod in Modules" :key="mod.serialNumber">
                 <VisualizationList :PlotGroups="mod.plotGroups" />
             </v-tab-item>
         </v-tabs-items>
    </v-card>
</template>

<script lang ="ts">

import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { ModuleWrapper, Plot } from '@/dto/visualization-dto'

@Component({
    components: {
        VisualizationList: () => import('@/components/Visualization/VisualizationList.vue') //TODO V1
    }
})
export default class VisualizationContainer extends Vue{
    private selectedModule: any = null;
    private moduleWrapper: Array<any> = [];

    @Prop({})
    private isLoading: boolean;

    @Prop({})
    private Modules: Array<ModuleWrapper>;

    private get getModules() {
        return this.Modules;
    }
    private get plotLoadProgress() {
        return (this.plotsLoaded/ this.totalPlots.length) * 100;
    }

    private get plotsLoaded(): number {
        if (this.totalPlots)
            return this.totalPlots.filter( x=> x.svgData?.length > 0).length;
        return 0;
    }

    private get totalPlots() {
        const plots = this.Modules.map( x=> x.plotGroups)
                               .reduce( (acc, plotGroup) => {
                                            plotGroup.flatMap( y => y.plots).forEach( y=> acc.push(y));
                                            return acc;
                                        }, new Array<Plot>());

        return plots;
    }

}

</script>