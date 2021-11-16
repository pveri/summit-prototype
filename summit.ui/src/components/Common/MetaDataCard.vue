<template>
<v-container fluid>
    <v-card  max-height="400">
        <v-card-title>Metadata</v-card-title>
        <v-btn-toggle v-model="selectedOption"
        mandatory>
            <v-btn>
                Show Raw
            </v-btn>
            <v-btn>
                Collapse All
            </v-btn>
            <v-btn>
                Expand All
            </v-btn>
        </v-btn-toggle>
        <v-container scrollable>
        <json-viewer
        :value="getJson"
        copyable
        boxed
        sort=true
        expanded=true
        >
        </json-viewer>
        </v-container>
    </v-card>
</v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import JsonViewer from 'vue-json-viewer'

@Component({
    components: {
        JsonViewer
    }
})
export default class MetaDataCard extends Vue {

    @Prop({default:null})
    private JsonData: any;

    private selectedOption: string = '';

    private get getJson() {
        return this.JsonData;
    }

    @Watch('selectedOption')
    private onToggle() {
        console.log(this.selectedOption);
    }
}
</script>
<style type="scss" scoped>
    .v-card {
        overflow-y:scroll;
    }
</style>