<template>
  <div>
    <CascadingFilter  :Title="'Filters'"
                      :Items="[this.serialNumberOptions, this.partNumberOptions, this.statusOptions]"
                      @doReset="onReset()"
                      @doSearch="onSearch()"
                      :DataLoading="this.IsDataLoading"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { CascadingFilter } from '../Common'
import { SelectModel }  from '../../models'
import { PartItemDto, ProcessStatus } from '@/dto';

@Component({
  components: {
    CascadingFilter
  }
})
export default class RunsFilterView extends Vue {

@Getter getProcessStatuses
@Getter getPartItems;

private isFiltered: boolean;
@Prop({})
private IsDataLoading: boolean;

private statusOptions = new SelectModel("Status");
private partNumberOptions = new SelectModel("Part Number");
private serialNumberOptions = new SelectModel("Serial Number");



created () {
  this.statusOptions.Data = this.getProcessStatusOptions(this.getProcessStatuses);
  this.partNumberOptions.Data = this.getPartNumbers(this.getPartItems);
  this.serialNumberOptions.Data = this.getSerialNumbers(this.getPartItems);
}

// Move to Mixin
private getProcessStatusOptions (processStatuses: Array<ProcessStatus>) {
    return processStatuses.map(x => x.displayName);
}

// Move to Mixin
private getSerialNumbers(partItems: Array<PartItemDto>): Array<string> {
  return partItems.map(x=> x.serialNumber);
}

// Move to Mixin
private getPartNumbers(partItems: Array<PartItemDto>): Array<string> {
  return partItems.map(x=> x.partNumber);
}

private onReset(): void {
  console.log('in onreset');
  this.partNumberOptions.SelectedValue = null;
  this.statusOptions.SelectedValue = null;
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
    name: this.statusOptions.SelectedValue
  }
  return dto;
}
}
</script>