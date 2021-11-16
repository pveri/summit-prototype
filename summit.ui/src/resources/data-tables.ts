export class DataHeader {
    text: string;
    value: string;

    constructor (DisplayText: string, FieldName: string) {
        this.text = DisplayText;
        this.value = FieldName;
    }
}

export const RunListHeaders = [
    new DataHeader("ID", "id"),
    new DataHeader("DUT", "partItemId"),
    new DataHeader("Type", "partType"),
    new DataHeader("Status", "processStatusId"),
    new DataHeader("Completed", "completed")
]

export const CalibrationHeaders = [
    new DataHeader("ID", "id"),
    new DataHeader("Serial Number", "partItemId"),
    new DataHeader("Calibration", "name"),
    new DataHeader("Created", "createdDate"),
    new DataHeader("Modified", "updatedDate"),
    new DataHeader("Run", "runId"),
]

export const PartsChildHeaders = [
    new DataHeader("#", "position"),
    new DataHeader("Serial Number", "serialNumber"),
    new DataHeader("PartNumber", "partNumber"),
    new DataHeader("Type", "description"),
]

export const PartsParentHeaders = [
    new DataHeader("#", "position"),
    new DataHeader("Serial Number", "serialNumber"),
    new DataHeader("PartNumber", "partNumber"),
    new DataHeader("Type", "description"),
]

export const PartListHeaders = [
    new DataHeader("Serial Number", "serialNumber"),
    new DataHeader("Part Number", "partNumber"),
    new DataHeader("Parent", "parentId"),
    new DataHeader("Position", "position"),
    new DataHeader("Part Type", "partType"),
    new DataHeader("Created", "createdDate"),
    new DataHeader("Modified", "updateDate"),
    new DataHeader("Description", "description"),
]

export const ProcedureListHeaders = [
    new DataHeader("Id", "id"),
    new DataHeader("Status", "status"),
    new DataHeader("Procedure", "procedure"),
    new DataHeader("Started", "createdDate"),
    new DataHeader("Updated", "updateDate"),
    new DataHeader("Completed", "completed") 
]

export const ProcedureDataHeaders = [
    new DataHeader("ID", "id"),
    new DataHeader("Name", "name"),
    new DataHeader("Sensor", "sensor"),
    new DataHeader("Position", "position")
]