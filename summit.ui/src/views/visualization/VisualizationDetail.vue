<template>
    <v-row>
		<v-col cols="3">
			<v-container fluid>
				<VisualizationFilterView
					@DropDownChanged="this.onFilterChange($event)"
					@Search="onSearch($event)"
					@Reset="onReset()"
					:IsDataLoading="this.isLoading"
				/>
			</v-container>
		</v-col>
        <v-col cols="9">
            <v-container fluid>
				<VisualizationContainer v-if="this.isFiltered"
				:Modules="mockData"/>
            </v-container>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { WebUtilityMixin, VisualizationsMixin } from "@/mixins";
import { VisualizationFilterView, VisualizationContainer } from "@/components/Visualization";
import { SelectModel }  from '../../models'
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { httpInstance } from '@/utils/auth'
import { ModuleWrapper, PlotGroup, Plot } from "@/dto";
import { ConfigHelper } from '@/utils'

@Component({
	mixins: [WebUtilityMixin, VisualizationsMixin],
	components: {
		VisualizationFilterView,
		VisualizationContainer
	}
})

export default class VisualizationDetail extends Vue {
	/*
	POC move to plugin
	*/
	private ConfigHelper: ConfigHelper = new ConfigHelper();
	private connection: HubConnection;
	private preFetchedPlots: Array<Plot> = new Array<Plot>();
	private apiPlotResponse: Array<Plot>;
	private connectionId: string;
	private isLoading: boolean = false;
	private isFiltered: boolean = false;
	private plotData: any;
	async mounted() {
		const config = await this.ConfigHelper.GetConfig();
		const signalrUrl: string = config["VISUALIZATIONS_HUB"];
		this.connection = new HubConnectionBuilder()
							.withUrl(signalrUrl) // TODO v1
							.withAutomaticReconnect()
							.configureLogging(LogLevel.Information)
							.build();
		this.connection.serverTimeoutInMilliseconds = 100000;
		this.connection.onreconnected((connectionId) => this.connectionId = connectionId);
		await this.connection.start();
		this.connection.on("ReceiveReport", (id, report) => this.mergePrefetchPlots(id, report) );
		this.connectionId = this.connection.connectionId;
	}

	async loadReports() {
		return null;
	}

	setLoadingApi(loading: boolean) {
		return null;
		// disable/enable filter
		// enable/disable spinner
		//loading bar on filter
	}

	async onSearch(filter: any): Promise<any> {
		if (filter && !this.isLoading) {
			this.mockData = new Array<ModuleWrapper>();
			this.isFiltered = true;
			this.isLoading = true;
			await httpInstance.post(`visualizations?connectionId=${this.connectionId}`, filter)
			.then(response => {
				console.log("from api" + response); //response.data is array of Guids for now
				this.apiPlotResponse = response.data;
				this.mockData = this.parseApiResponse(this.apiPlotResponse);
				this.isLoading = false;
			})
		}
	}

	public onReset() {
		this.mockData = new Array<ModuleWrapper>();
		this.isFiltered = false;
	}

	mergePrefetchPlots(id: string, str: string) { // TODO V1
		console.log("ID IS: "+id);
		const prefetchedPlot = new Plot();
		prefetchedPlot.svgData = str;
		prefetchedPlot.identifier = id;
		this.preFetchedPlots.push(prefetchedPlot);

		if (this.apiPlotResponse) {
			const filteredPlots = this.apiPlotResponse.filter( x=> !!x.svgData || x.svgData == null);
			for (let i =0; i< filteredPlots.length; i++) {
				const plot = this.preFetchedPlots.find(x => x.identifier == filteredPlots[i].identifier);
				if (plot) {
					filteredPlots[i].svgData = plot.svgData;
					const idx = this.preFetchedPlots.indexOf(plot);
					this.preFetchedPlots.slice(idx, 1);
				}
			}
		}

	}

	private get getMockData() {
		return this.mockData;
	}

	private mockData: Array<ModuleWrapper> = new Array<ModuleWrapper>(); // TODO V1

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
                                            if (!module.plotGroups.some(z => z.testType == x.testType)) {
                                                group.testType = x.testType;
                                                group.sensors = [module.serialNumber+"-A0", module.serialNumber+"-A1"]; //TODO V1 hardcode for now
                                                module.plotGroups.push(group);
                                            }
                                            return group;
                                       });
            this.addPlots(module.plotGroups, plotData);
        }
    }

    private addPlots(plotGroups: Array<PlotGroup>, plotData: Array<Plot>) {
        plotGroups.forEach( x=> 
            {
                const plotsToAdd = plotData.filter( y => y.testType == x.testType
                                                    && x.sensors[0].indexOf(y.moduleSerialNumber) >= 0 //Todo
                                                    && !x.plots.some(z => z.identifier == y.identifier) //is this needed?
                                                );
				// this.mergePrefetchedPlots(plotsToAdd);
                x.plots = plotsToAdd;
            })
    }

}

</script>