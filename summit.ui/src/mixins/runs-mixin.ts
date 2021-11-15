import { RunStatus, PartTypes } from '@/enums'  // eslint-disable-line
import { RunStatusView } from '@/models'
import { Component, Vue } from 'vue-property-decorator'
import WebUtilityMixin from './web-utilities'
import { Part, PartItemDto, PartType, ProcessStatus } from '@/dto'
import { httpInstance } from '@/utils/auth'

@Component({
    mixins: [WebUtilityMixin]
})

export default class RunsMixin extends Vue{

    /*

    */
   // Needs Typing
    loadRunItems(responseData: any): Array<RunStatusView> {   // eslint-disable-line
        // Needs Typing
        let runs = responseData?.response;
        if (responseData && responseData.totalRecords > 0 ) {
        runs = runs.map((run) => { 
            const status = run?.processStatusId?.toUpperCase();
            return { processStatusId: status,...run};
        })
    }
        return runs;
    }

    async getAllParts(): Promise<Array<PartItemDto>> { //REV1
        const url = "items";
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }

    async getAllCalibrationTypes(): Promise<Array<string>> { //REV1
        const url = "calibrations/types";
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }

    async getAllPartTypes(): Promise<Array<PartType>> {
        const url = "parts/types";
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }

    async getAllProcessStatuses(): Promise<Array<ProcessStatus>> {
        const url = "runs/statuses";
        return httpInstance.get(url).then(response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));  
    }

    async getAllPartNumbers(): Promise<Array<Part>> {
        const url = "parts";
        return httpInstance.get(url).then( response => {
            if (response.data) {
                return response.data;
            }
        }).catch (err => console.log(err));
    }
} 