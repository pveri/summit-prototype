export class TestType {
    name: string;
    description: string;
}

export class ModuleWrapper {
    public serialNumber: string;
    public plotGroups: Array<PlotGroup>

    constructor() {
        this.serialNumber = '';
        this.plotGroups = [];
    }
}

export class PlotGroup{
    testType: string;
    sensors: Array<string>;
    plots: Array<Plot>;

    constructor() {
        this.testType = '';
        this.sensors = [];
        this.plots = [];
    }
}

export class Plot {
    moduleSerialNumber: string;
    sensorId: string;
    testType: string;
    plotName: string; //may or may not be important
    svgData: string;
    identifier: string;

    constructor() {
        this.moduleSerialNumber = '';
        this.sensorId = '';
        this.testType = '';
        this.plotName = '';
        this.svgData = '';
        this.identifier = '';
    }

}