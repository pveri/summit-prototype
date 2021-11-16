<template>
<v-container fluid>
    <v-card>
        <v-card-title>Module</v-card-title>
        <v-card-text>
              <dl class="row mb-0">
        <dt class="col-sm-4">Serial Number</dt>
        <dd class="col-sm-7">{{ this.partItem.serialNumber }}</dd>

        <dt class="col-sm-4">Part Number</dt>
        <dd class="col-sm-7">{{ this.partItem.partNumber }}</dd>

        <dt class="col-sm-4">Created</dt>
        <dd class="col-sm-7"> {{ this.partItem.createdDate }}</dd>

        <dt class="col-sm-4">Updated</dt>
        <dd class="col-sm-7"> {{ this.partItem.updateDate }}</dd>

        <dt class="col-sm-4">Description</dt>
        <dd class="col-sm-7"> {{ this.partItem.description }}</dd>

    </dl>
        </v-card-text>
        
    </v-card>
</v-container>
</template>
<script lang="ts">
import { PartItemDto } from "@/dto/partItem-dto";
import VueRouter, { Route, RouteConfig } from 'vue-router';
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { httpInstance } from '@/utils/auth'
import PartsChildInfo from "./PartsChildInfo.vue";

@Component({})
export default class PartsItemInfo extends Vue {
@Prop({default:null})
private partItem: PartItemDto;
private partsChild = PartsChildInfo;

@Prop({})
private partId: string;

@Watch('$route', { immediate: true, deep: true })
   async onUrlChange(newVal: Route) {
      await this.getPartItemInfo();
    }

async getPartItemInfo() {

    await httpInstance.get(`/items/${this.partId}`).then(response => {
    this.partItem = response.data;
    });
}

}
</script>