import { Component, Vue } from 'vue-property-decorator'
import { ModuleWrapper, PlotGroup, Plot } from '@/dto/visualization-dto'
@Component({})

export default class VisualizationsMixin extends Vue {

    public parseApiResponse(plotDtoList: Array<Plot>): Array<ModuleWrapper> {
        const modules = plotDtoList.map( x=> x.moduleSerialNumber)
                                   .reduce((modArr, plotSerialNumber) => {
                                        const mod = new ModuleWrapper();
                                        mod.serialNumber = plotSerialNumber;
                                        if (!modArr.find( x=> x.serialNumber == plotSerialNumber))
                                            modArr.push(mod);
                                        return modArr;
                                   }, new Array<ModuleWrapper>());
        this.addPlotGroups(modules, plotDtoList);
        return modules;
    }

    private addPlotGroups(modules: Array<ModuleWrapper>, plotData: Array<Plot>) {
        for (let i = 0; i < modules.length; i++){
            const module = modules[i];
            const plotGroups = plotData.filter( x=> x.moduleSerialNumber == module.serialNumber)
                                       .map( x=> {
                                            const group = new PlotGroup();
                                            // TODO move to method
                                            if (!module.plotGroups.find(x => x.testType == x.testType)) {
                                                group.testType = x.testType;
                                                group.sensors = [module.serialNumber+"-A0", module.serialNumber+"-A1"]; //TODO V1 hardcode for now
                                                module.plotGroups.push(group);
                                            }
                                            return group;
                                       });
            this.addPlots(plotGroups, plotData);
        }
    }

    private addPlots(plotGroups: Array<PlotGroup>, plotData: Array<Plot>) {
        plotGroups.forEach( x=> 
            {
                const plotsToAdd = plotData.filter( y => y.testType == x.testType
                                                    && x.sensors[0].indexOf(y.moduleSerialNumber) >= 0
                                                    && !x.plots.some(z => z.identifier == y.identifier) //is this needed?
                                                );
                x.plots = plotsToAdd;
            })
    }

}