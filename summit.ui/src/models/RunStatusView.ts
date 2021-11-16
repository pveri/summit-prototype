import { RunStatus } from '@/enums'

// TODO Move this to DTO, get rid of this class. REV1
export class RunStatusView {
    Id: string;
    PartItemId: string;
    Suite: string;
    PartType: string;
    ProcessStatus: RunStatus;
    Completed: Date
}
