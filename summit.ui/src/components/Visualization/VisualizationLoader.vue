<template>
    <v-sheet elevation="0">
        <v-row>
            <v-col v-for="i in Plots" :key="i.identifier" cols="12" :sm="12/Plots.length">
                <v-skeleton-loader class="mx-auto" type="image" v-if="isPending(i)"/>
                <span v-else v-html="formatPngData(i)"/>   
            </v-col>
        </v-row>
    </v-sheet>
</template>
<style type="text/css">

img {
    max-width: 100%;
    max-height: 100%;
}

.lightbox {
 display: none;
 position: fixed;
 z-index: 999;
 max-width: 100%;
 max-height: 100%;
 text-align: center;
 left: 0;
 bottom: 0;
 top: 0;
 right: 0;
 top:0;
 margin: 5% auto;
 margin-bottom: 1em;
 background: rgba(0,0,0,0.8);
 overflow: scroll;
}

.lightbox img {
    max-width: none;
    margin-top: 2%;
    overflow-y: visible; 
    height: auto;  
}  

.lightbox:target {
 outline: none;
 display: block;
}

</style>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { Plot } from '@/dto/visualization-dto'
@Component({})
export default class VisualizationLoader extends Vue {

@Prop({})
private Plots: Array<Plot>;

private isPending(i: Plot) {
    return !(i && i.svgData && i.svgData.length>0);
}

private formatPngData(i: Plot, k: Plot) {
    return `<a href="#${i.identifier}">
            <img src="data:image/png;base64,${i.svgData}">
            </a>
            <a href="#_" class="lightbox" id="${i.identifier}">
            <img src="data:image/png;base64,${i.svgData}">
            </a>`
}

}
</script>
