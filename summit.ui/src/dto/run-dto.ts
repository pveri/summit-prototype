import { RunStatusView } from '@/models'

export class RunObject {
    Loaded: boolean = false;
    Items?: Array<RunStatusView>;
    Name: string;
    TotalRows: number;
    constructor (name: string) {
      this.Name = name;
    }
  }

  export interface ProcessStatus {
    processEnum: number;
    status: string;
    displayName: string;
    order: number;
  }

  // TODO: Replace
  export class RunDto {
    id: number;
    partItemId: string;
    // public virtual PartItem PartItem { get; set; }
    partType: string;
    suite: string;
    processStatusId: string;
    completed: Date;
  }