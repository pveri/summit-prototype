import { Part, PartItemDto, PartType, ProcessStatus } from '@/dto'

export default {
    setIdentityToken( {commit}, identityToken) {
        commit('identityToken', identityToken);
    },
    setCurrentUser( {commit}, currentUser) {
        commit('currentUser', currentUser);
    },
    setPartItems( {commit}, partItems: Array<PartItemDto>) {
        commit('partItems', partItems);
    },
    setCalibrationTypes( {commit}, calibrationTypes: Array<string>) {
        commit('calibrationTypes', calibrationTypes)
    },
    setPartTypes( {commit}, partTypes: Array<PartType>) {
        commit('partTypes', partTypes)
    },
    setProcessStatuses ( {commit}, processStatuses: Array<ProcessStatus>) {
        commit('processStatuses', processStatuses);
    },
    setParts ( {commit}, parts: Array<Part>) {
        commit('parts', parts);
    }
}