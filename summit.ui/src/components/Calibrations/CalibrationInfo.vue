<template>
<v-container fluid>
    <v-card>
        <v-card-title>Calibration</v-card-title>
        <v-card-text>
             <dl class="row mb-0">
              <dt class="col-sm-4">Serial Number</dt>
              <dd class="col-sm-7"><a href="#">calibration.part_item</a></dd>

              <dt class="col-sm-4">Calibration</dt>
              <dd class="col-sm-7">calibration.name</dd>

              <dt class="col-sm-4">Baseline</dt>
              <dd class="col-sm-7">calibration.baseline.upper</dd>

              <dt class="col-sm-4">Version</dt>
              <dd class="col-sm-7">calibration.version_str</dd>

              <dt class="col-sm-4">Created</dt>
              <dd class="col-sm-7">calibration.created</dd>

              <dt class="col-sm-4">Updated</dt>
              <dd class="col-sm-7">calibration.modified</dd>
          </dl>
        </v-card-text>
        
    </v-card>
</v-container>
</template>
<script lang="ts">
import { CalibrationDto } from "@/dto/calibration-dto";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CalibrationInfo extends Vue {
@Prop({default:null})
private calibration: CalibrationDto;

}
</script>