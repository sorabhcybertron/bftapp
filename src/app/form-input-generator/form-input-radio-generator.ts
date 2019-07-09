import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputRadioGenerator extends FormInputGeneratorBase<string> {
  controlType = 'radioinput';
  type: string;

  options: {key: string, value: string, selected:boolean, label:string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
