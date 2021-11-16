<template>
    <v-row>
        <v-col cols="3">
            <v-row>
                <CalibrationInfo />
            </v-row>
            <v-row v-if="calibration">
                <MetaDataCard :JsonData="calibration.metaData"/>
            </v-row>
        </v-col>
        <v-col cols="8">
        </v-col>
    </v-row>
</template>
<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { httpInstance } from '@/utils/auth'

import { SummitTable, MetaDataCard } from '@/components/Common'
import { CalibrationInfo } from '@/components/Calibrations'
import { TableModel } from '@/models';
import { CalibrationHeaders } from '@/resources'
import { CalibrationDto } from '@/dto/calibration-dto';

@Component({
    components: {
        SummitTable,
        CalibrationInfo,
        MetaDataCard
    }
})
export default class CalibrationDetail extends Vue {

    private calibration: CalibrationDto = null;
    private calibrationId: string;

    async mounted (): Promise<void> {
        this.calibrationId = this.$route.params.id;
        this.calibration = await this.getCalibration(parseInt(this.calibrationId));
    }

    private async getCalibration(id: number): Promise<CalibrationDto> {
        const url = `calibrations/${id}`;
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }
}
</script>