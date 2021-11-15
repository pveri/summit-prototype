<template>
    <v-row>
        <!-- TODO: Make this multiple REV1 -->
        <v-select 
        ref="selectList"
        v-model="ItemData.SelectedValue"
        :items="ItemData.Data"
        :title="ItemData.Label"
        :label="ItemData.Label"
        :required="ItemData.Required"
        :rules="ItemData.Required ? [v =>  !!v || ItemData.errorMessage()] : []"
        persistent-hint
        :clearable="true"
        :disabled="!ItemData.Enabled"
        filled
        rounded
        dense
       >
        </v-select>
    </v-row>
</template>
<script lang="ts">

import { SelectModel }  from '../../models'
import {
	Component,
    Vue,
    Prop,
    Watch
} from "vue-property-decorator";

@Component({})
export default class DynamicSelect extends Vue {

    @Prop({default: null}) 
    private ItemData: SelectModel;

    private selectedItem: string = '';

    private get getItems() {
        return this?.ItemData;
    }

    @Watch('ItemData', {deep: true}) 
    private selectedValueSet(val: SelectModel) {
        if (val.SelectedValue == null) {
            this.selectedItem = undefined;
        }
        if (val?.Data?.length == 0) {
            val.SelectedValue = null;
            this.selectedItem = undefined;
        }
    }

}
// -prop for title
// -prop for enabled/disabled
// -prop for loading
// -prop/handler for the method/api call that occurs when enabled
// -emit for data selected
</script>