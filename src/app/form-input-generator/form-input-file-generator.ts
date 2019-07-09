import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputFileGenerator extends FormInputGeneratorBase<string> {
  controlType = 'fileinput';
  type: string;
  label:string;
  multiple : boolean;
  constructor(options: {} = {}, multiple : boolean) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
    this.multiple = multiple || false; 
  }
}