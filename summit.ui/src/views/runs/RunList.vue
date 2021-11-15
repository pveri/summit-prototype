<template>
	<v-row>
		<v-col cols="3">
			<v-container fluid>
				<RunsFilterView
					@DropDownChanged="this.onFilterChange($event)"
					@Search="onSearch($event)"
					@Reset="this.onReset()"
					:IsDataLoading="this.tableDataLoading"
				/>
			</v-container>
		</v-col>
		<v-col cols="7">
			<v-container fluid>
				<SummitTable
					:Title="'Runs'"
					:DataWrapper="runsModel"
					:Headers="headers"
					@pagerChanged="OnPagerChange($event)"
				>
                    <template v-slot:item.id="{item}">
                        <v-btn text @click="navigateTo(`runs/${item.id}`)">
                            {{ item.id }}
                        </v-btn>
                    </template>
                    <template v-slot:item.partItemId="{item}">
                        <v-btn text @click="navigateTo(`parts/${item.partNumber}/items/${item.partItemId}`)">
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
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import { RunsFilterView } from "@/components/Runs";
import { SummitTable } from "@/components/Common";
import { RunListHeaders, DataHeader } from "@/resources/data-tables";
import { TableModel } from "@/models";
import { WebUtilityMixin } from "@/mixins";
import { httpInstance } from "@/utils";

@Component({
	mixins: [WebUtilityMixin],
	components: {
		RunsFilterView,
		SummitTable
	}
})
export default class RunList extends Mixins(Vue, WebUtilityMixin) {
	private filterDataLoading: boolean = false;
	private tableDataLoading: boolean = false;

	private headers = [...RunListHeaders, new DataHeader("Suite", "suite")];
	private runsModel = new TableModel("Runs");
	private filterDto = {} as any;

	private defaultFilter = {
		pageIndex: 0,
		pageSize: 10,
		paginateResult: true
	};

	async mounted() {
		await this.FetchData(this.runsModel);
	}

	async FetchData(runs: TableModel) {
		if (!this.tableDataLoading) {
			this.tableDataLoading = true;
			runs.Loaded = false;

			await httpInstance.post("runs/filter", this.defaultFilter).then(response => {
				runs.Items = response.data.response; // response.data.response;
				runs.TotalRows = response.data.totalRecords;
				runs.Loaded = true;
				this.tableDataLoading = false;
			});
		}
	}
	/* eslint-disable*/
	onItemClick() {
		return;
	}

	async onFilterChange(filter: any) {
		return;
	}
	/* eslint-enable*/
	async onSearch(filterOptions: any) {
		this.defaultFilter = { ...this.defaultFilter, ...filterOptions };
		await this.FetchData(this.runsModel);
	}

	async OnPagerChange(pager: any) {
		this.defaultFilter = { ...this.defaultFilter, ...pager };
		await this.FetchData(this.runsModel);
	}

	// Don't know if this is needed yet...not enough data in db REV1
	private resetPager(tableData: any) {
		//Todo: create paginatedResponseDTO
		const page = tableData.totalRecords / this.defaultFilter.pageSize;
		if (page > this.defaultFilter.pageIndex) {
			this.defaultFilter.pageIndex = 0;
		}
	}
}
</script>
