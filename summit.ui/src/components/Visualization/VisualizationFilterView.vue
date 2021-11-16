<template>
<v-form ref="visualizationForm">
  <div>
    <CascadingFilter  :Title="'Filters'"
                      :Items="[this.moduleOptions, this.partNumberOptions, this.serialNumberOptions, 
                      this.testTypeOptions, this.sensorOptions]"
                      @doReset="onReset()"
                      @doSearch="onSearch()"
                      :DataLoading="this.IsDataLoading"
                      :FilterLoading="this.dropdownLoading"/>
  </div>
</v-form>
</template>

<script lang="ts">

import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { CascadingFilter } from '../Common'
import { SelectModel }  from '../../models'
import { PartItemDto, PartType, Part } from '@/dto';
import { httpInstance } from "@/utils";

@Component({
  components: {
    CascadingFilter
  }
})
export default class VisualizationFilter extends Vue {

@Getter getPartTypes
@Getter getPartItems;
@Getter getParts: Array<Part>;

private dropdownLoading: boolean = false;

@Prop({})
private IsDataLoading: boolean;

private moduleOptions = new SelectModel("Modules", true);
private partNumberOptions = new SelectModel("Part Number", true);
private serialNumberOptions = new SelectModel("Serial Number", true);
private testTypeOptions = new SelectModel("Test Type", false);
private sensorOptions = new SelectModel("Sensor", false);

async created () {
  this.resetDropDowns([
    this.partNumberOptions,
    this.serialNumberOptions,
    this.testTypeOptions,
    this.sensorOptions
  ]);
  this.moduleOptions.Data = this.getModuleOptions(this.getPartTypes);
  //this.sensorOptions.Data = await this.getSensors();
  
}
//Move to Mixin
async getTests(): Promise<Array<string>> {
    let testTypes: Array<string> = [];
    await httpInstance.get(`runs/tests`).then(response => {
    testTypes = response.data;
    });
     return testTypes;
}
//Move to Mixin
async getSensors(): Promise<Array<string>> {
    let sensors: Array<string> = [];
    const moduleId = this.serialNumberOptions.SelectedValue;
    const partNo = this.partNumberOptions.SelectedValue;
    await httpInstance.get(`parts/${partNo}/items/${moduleId}/sensors`).then(response => {
      sensors = response.data;
    });
    return sensors;
}
//Move to Mixin
private getModuleOptions (partTypes: Array<PartType>): Array<string> {
    return partTypes.filter(x => x?.description != null).map( x => x?.description )
}

private resetDropDowns(dropDowns: Array<SelectModel>) {
  for (let i = 0; i< dropDowns.length; i++) {
    dropDowns[i].Data = [];
    // dropDowns[i].SelectedValue = null;
    dropDowns[i].Enabled = false;
  }
}

@Emit('Reset')
public onReset(): void {
  const form = this.$refs.visualizationForm as any;
  this.partNumberOptions.SelectedValue = null;
  this.moduleOptions.SelectedValue = null;
  this.serialNumberOptions.SelectedValue = null;
  this.testTypeOptions.SelectedValue = null;
  this.sensorOptions.SelectedValue = null;
  form.reset();
}

@Emit('Search')
public onSearch() {
  const form = this.$refs.visualizationForm as any;
  form.validate()
  if (this.partNumberOptions?.SelectedValue
      && this.moduleOptions?.SelectedValue
      && this.serialNumberOptions?.SelectedValue)
      {
        return this.createFilterDto();
      }
  return null;
}

@Watch("moduleOptions",{deep: true})
public onModuleSelected() {
  console.log("module changed!");
  if (this.moduleOptions.SelectedValue) {
    this.partNumberOptions.Data = this.getParts.filter( 
                                    x=> x?.partType?.toLowerCase() == this.moduleOptions.SelectedValue.toLowerCase()
                                    ).map( y=> y.partNumber);
    this.partNumberOptions.Enabled = true;
    return;
  }
  this.resetDropDowns([
                      this.partNumberOptions,
                    ]);
}

@Watch("partNumberOptions",{deep: true})
public onPartNumberSelected() {
  console.log("partNumber changed!");
  if (this.partNumberOptions?.Data?.length > 0 && this.partNumberOptions?.SelectedValue?.length > 0) {
    this.serialNumberOptions.Data = this.getPartItems.filter( 
                                    x=> x?.partNumber?.toLowerCase() == this.partNumberOptions.SelectedValue.toLowerCase()
                                    ).map( y=> y.serialNumber);
    this.serialNumberOptions.Enabled = true;
    return;
  }

  this.resetDropDowns([
                      this.serialNumberOptions,
                    ]);
}

@Watch("serialNumberOptions",{deep: true}) 
public async onSerialNumberSelected() {
console.log("serialNumber changed!");
  if (this.serialNumberOptions?.Data?.length > 0 && this.serialNumberOptions?.SelectedValue?.length > 0) {
    this.dropdownLoading = true;
    this.testTypeOptions.Data = await this.getTests();
    this.sensorOptions.Data = await this.getSensors();
    this.testTypeOptions.Enabled = true;
    this.sensorOptions.Enabled = true;
    this.dropdownLoading = false;
    return;
  }
  this.resetDropDowns([
                      this.testTypeOptions,
                      this.sensorOptions
                    ]);
}

private createFilterDto (): any {
  const dto = {
    partNumber: this.partNumberOptions.SelectedValue,
    partType: this.moduleOptions.SelectedValue,
    serialNumber: this.serialNumberOptions.SelectedValue,
    testType: this.testTypeOptions.SelectedValue,
    sensor: this.sensorOptions.SelectedValue
  }
  return dto;
}

}
</script>