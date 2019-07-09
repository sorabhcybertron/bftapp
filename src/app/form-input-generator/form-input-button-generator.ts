import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputButtonGenerator extends FormInputGeneratorBase<string> {
  controlType = 'buttonInput';
  type: string;
  label:string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.label = options['label'] || '';
  }
}