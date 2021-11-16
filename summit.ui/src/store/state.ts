import { PartItemDto, PartType, ProcessStatus, Part } from '@/dto'
export default {
    identityToken: null as string,
    currentUser: null as any,
    partItems:null as Array<PartItemDto>,
    calibrationTypes: [] as Array<string>,
    partTypes: [] as Array<PartType>,
    processStatuses: [] as Array<ProcessStatus>,
    parts: [] as Array<Part>
}