export class FormInputGeneratorBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  selected:boolean;
  conditions:{onElement:'', value:''}[] = []
  
  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      required?: boolean,
      order?: number,
      controlType?: string,
      selected?: boolean,
      multiple?: boolean,
      conditions?:{onElement:'', value:''}[],
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.selected = options.selected || false;
    this.conditions = options.conditions || null;
  }
}
