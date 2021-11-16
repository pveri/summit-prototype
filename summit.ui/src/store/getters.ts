import { Part, PartItemDto, PartType, ProcessStatus } from '@/dto'

export default {
    getIdentityToken (state): string {
        return state.identityToken;
    },
    getCurrentUser (state): any {
        return state.currentUser;
    },
    getPartItems (state): Array<PartItemDto> {
        return state.partItems;
    },
    getCalibrationTypes (state): Array<string> {
        return state.calibrationTypes;
    },
    getPartTypes (state): Array<PartType> {
        return state.partTypes;
    },
    getProcessStatuses (state): Array<ProcessStatus> {
        return state.processStatuses;
    },
    getParts (state): Array<Part> {
        return state.parts;
    }
}