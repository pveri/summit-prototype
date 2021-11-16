<template>
  <div>
    <CascadingFilter  
                      :Items="[this.calibrationOptions, this.partNumberOptions, this.serialNumberOptions]"
                      :DataLoading="dataLoading"
                      @doReset="onReset()"
                      @doSearch="onSearch()"
                      />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { CascadingFilter } from '../Common'
import { SelectModel }  from '../../models'
import { PartItemDto } from '@/dto';

@Component({
  components: {
    CascadingFilter
  }
})
export default class CalibrationFilter extends Vue {

@Getter getCalibrationTypes
@Getter getPartItems;

private isFiltered: boolean;
private isDataLoading: boolean;

private calibrationOptions = new SelectModel("Calibrations");
private partNumberOptions = new SelectModel("Part Number");
private serialNumberOptions = new SelectModel("Serial Number");

@Prop({default: false})
private dataLoading: boolean;

created () {
  this.calibrationOptions.Data = this.getCalibrationTypes;
  this.partNumberOptions.Data = this.getPartNumbers(this.getPartItems);
  this.serialNumberOptions.Data = this.getSerialNumbers(this.getPartItems);
}

private getSerialNumbers(partItems: Array<PartItemDto>): Array<string> {
  return partItems.map(x=> x.serialNumber);
}

private getPartNumbers(partItems: Array<PartItemDto>): Array<string> {
  return partItems.map(x=> x.partNumber);
}

private onReset(): void {
  console.log('in onreset');
  this.partNumberOptions.SelectedValue = null;
  this.calibrationOptions.SelectedValue = null;
  this.serialNumberOptions.SelectedValue = null;
  this.onSearch();
}

@Emit('Search')
private onSearch (): object {
  return this.createFilterDTO();
}

private createFilterDTO(): object {
  const dto = {
    partNumber: this.partNumberOptions.SelectedValue,
    serialNumber: this.serialNumberOptions.SelectedValue,
    name: this.calibrationOptions.SelectedValue
  }
  return dto;
}

}
</script>