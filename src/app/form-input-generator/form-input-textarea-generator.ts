import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputTextareaGenerator extends FormInputGeneratorBase<string> {
  controlType = 'textarea';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}