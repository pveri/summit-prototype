export class PartItemDto {
    serialNumber: string;
    partNumber: string;
    parentId: string;
    parent: PartItemDto;
    description: string;
    position?: number;
}

export class Part {
    partNumber: string;
    partType: string;
    partName: string;
}

export class PartType {
    name: string;
    description: string;
}