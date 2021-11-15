import { Part, PartItemDto, PartType, ProcessStatus } from '@/dto'

export default {
    identityToken (state, identityToken) {
        state.identityToken = identityToken;
    },
    currentUser (state, currentUser) {
        state.currentUser = currentUser;
    },
    partItems (state, partItems: Array<PartItemDto>) {
        state.partItems = partItems;
    },
    calibrationTypes (state, calibrationTypes: Array<string>) {
        state.calibrationTypes = calibrationTypes;
    },
    partTypes (state, partTypes: Array<PartType>) {
        state.partTypes = partTypes
    },
    processStatuses (state, processStatuses: Array<ProcessStatus>) {
        state.processStatuses = processStatuses;
    },
    parts (state, parts: Array<Part>) {
        state.parts = parts;
    }
}