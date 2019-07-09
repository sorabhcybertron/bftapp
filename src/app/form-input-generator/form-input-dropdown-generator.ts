import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputDropdownGenerator extends FormInputGeneratorBase<string> {
  controlType = 'dropdown';
  // options: {key: string, value: string}[] = [];
  options: {key: string, value: string, selected:boolean, label:string}[] = [];

  multiple : boolean;

  constructor(options: {} = {},multiple:boolean) {
    super(options);
    this.options = options['options'] || [];
    this.multiple = multiple || false; 
  }
}