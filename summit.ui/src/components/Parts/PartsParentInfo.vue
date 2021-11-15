<template>
    <v-container fluid>
        <SummitTable v-if="partsParentModel.Loaded"
        :Title="'Parent'"
        :IsLoading="!partsParentModel.Loaded"
        :DataWrapper="partsParentModel"
        :Headers="headers"
        >     
        <template v-slot:item.serialNumber="{item}">
            <v-btn text @click="navigateTo(`/parts/${item.partNumber}/items/${item.serialNumber}`)">
                {{ item.serialNumber }}
            </v-btn>
        </template> 
        </SummitTable>
    </v-container>
</template> 

<script lang="ts">

import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { httpInstance } from '@/utils/auth'
import { SummitTable } from "@/components/Common"
import { TableModel } from "../../models"
import { PartsParentHeaders } from '@/resources/data-tables'
import { WebUtilityMixin } from '@/mixins'

@Component({
    mixins:[
        WebUtilityMixin
    ],
    components: {
        SummitTable,
    }
})

export default class PartsParentInfo extends Vue {

    private headers = PartsParentHeaders
    private PartsParentInfoDataLoading: boolean = false
    private partsParentModel = new TableModel("PartsParent")
    private partsModel = new TableModel("Parts")
    private partId: string = ''; 
    private childFlag: boolean = false
    
    @Watch('$route', { immediate: true, deep: true })
    async onUrlChange(newVal: Route) {
        this.partId = this.$route.params.partId;
        await this.FetchPartsParentData(this.partsModel, this.partsParentModel);
    }

    async FetchPartsParentData(parts: TableModel, partsParent: TableModel) {
        if (!this.PartsParentInfoDataLoading) {
            partsParent.Loaded = false;

           await httpInstance.get(`/items/${this.partId}`).then( response => { 
                    parts.Items = [response.data];
                    }).then(response =>  {if(parts.Items[0].parentId) 
                        httpInstance.get(`/items/${parts.Items[0].parentId}`).then(response => {
                            partsParent.Items = [response.data];
							partsParent.TotalRows = [response.data].length;
                            partsParent.Loaded = true;
							this.PartsParentInfoDataLoading = false;
                            })
                        });
        } 
    }

    }
</script>