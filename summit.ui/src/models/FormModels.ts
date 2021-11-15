export class SelectModel {
    Label: string;
    Data: Array<string>;
    SelectedValue: string;
    Required: boolean;
    Enabled: boolean;

    constructor(name: string, required: boolean = false) {
        this.Label = name;
        this.Data = [];
        this.Required = required;
        this.Enabled = true;
        this.SelectedValue = null;
    }

    public errorMessage(): string {
      return this.Label+ " is required.";
    }
}

export class TableModel {
    Loaded: boolean = false;
    Items?: Array<any>;
    Name: string;
    TotalRows: number;
    constructor (name: string) {
      this.Name = name;
      this.Items = [];
      this.Name = "";
      this.TotalRows = 0;
    }
  }