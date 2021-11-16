<template>
  <div>
    <CascadingFilter  :Title="'Filters'"
                      :Items="[this.partTypeOptions, this.partNumberOptions]"
                      @doReset="onReset()"
                      @doSearch="onSearch()"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Emit } from 'vue-property-decorator';
import { Getter } from 'vuex-class'
import { CascadingFilter } from '../Common'
import { SelectModel }  from '../../models'
import { PartItemDto, PartType } from '@/dto';

@Component({
  components: {
    CascadingFilter
  }
})
export default class PartsFilter extends Vue {

@Getter getPartTypes
@Getter getPartItems;

private isFiltered: boolean;
private isDataLoading: boolean;

private partTypeOptions = new SelectModel("Part Type");
private partNumberOptions = new SelectModel("Part Number");



created () {
  this.partNumberOptions.Data = this.getPartNumbers(this.getPartItems);
  this.partTypeOptions.Data = this.getPartTypeOptions(this.getPartTypes);
}

private getPartTypeOptions (partTypes: Array<PartType>) {
    return partTypes.map( x => { return x.description } )
}

private getPartNumbers(partItems: Array<PartItemDto>): Array<string> {
  return partItems.map(x=> x.partNumber);
}

private onReset(): void {
  console.log('in onreset');
  this.partNumberOptions.SelectedValue = null;
  this.partTypeOptions.SelectedValue = null;
  this.onSearch();
}

@Emit('Search')
public onSearch() {
  return this.createFilterDto();
}

private createFilterDto (): any {
  const dto = {
    partNumber: this.partNumberOptions.SelectedValue,
    partType: this.partTypeOptions.SelectedValue
  }
  return dto;
}
}
</script>