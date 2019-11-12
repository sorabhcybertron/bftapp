import { FormInputGeneratorBase } from './form-input-generator-base';

export class FormInputTextboxGenerator extends FormInputGeneratorBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormInputEmailGenerator extends FormInputGeneratorBase<string> {
  controlType = 'email';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormInputDateGenerator extends FormInputGeneratorBase<string> {
  controlType = 'dateinput';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormInputTelGenerator extends FormInputGeneratorBase<string> {
  controlType = 'tel';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormInputMFboxGenerator extends FormInputGeneratorBase<string> {
  controlType = 'M/F Toggle';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormInputYNboxGenerator extends FormInputGeneratorBase<string> {
  controlType = 'Y/N Toggle';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormParagraphGenerator extends FormInputGeneratorBase<string> {
  controlType = 'paragraph';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}

export class FormCanvasGenerator extends FormInputGeneratorBase<string> {
  controlType = 'canvas';
  type: string;
  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
