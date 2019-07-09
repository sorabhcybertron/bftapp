import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputCheckboxGenerator extends FormInputGeneratorBase<string> {
  controlType = 'checkbox';
  type: string;

  options: {key: string, value: string, selected:boolean, label:string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
