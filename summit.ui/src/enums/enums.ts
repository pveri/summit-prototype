
export enum PartTypes {
    MODULE = "Module",
    SENSOR = "Sensor",
    DETECTOR = "Detector"
}

export enum RunStatus {
    INITIALIZED = 'Initialized',
    RUNNING = 'Running',
    WAITING = 'Waiting',
    COMPLETED = 'COMPLETED',
    FAILED = 'Failed',
    ABORTED = 'Aborted',
    SKIPPED ='Skipped'
}