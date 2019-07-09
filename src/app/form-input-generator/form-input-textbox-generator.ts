import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputTextboxGenerator extends FormInputGeneratorBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}