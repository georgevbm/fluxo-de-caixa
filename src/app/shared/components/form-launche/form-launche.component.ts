import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Launche } from '../../interfaces/launches.interface';

@Component({
  selector: 'app-form-launche',
  templateUrl: './form-launche.component.html',
  styleUrls: ['./form-launche.component.scss'],
})
export class FormLauncheComponent implements OnChanges {
  @Input() showCancelButton = false;
  @Input() resetForm = false;
  @Input() formData!: Launche;
  @Output() formDataEmit = new EventEmitter<Launche>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formData']) {
      this.populateForm();
    }

    if (changes['resetForm']) {
      this.form?.reset();
      this.resetForm = false;
    }
  }

  get descriptionControl() {
    return this.form.controls['description'];
  }

  get valueControl() {
    return this.form.controls['value'];
  }

  get typeControl() {
    return this.form.controls['type'];
  }

  ngOnInit() {
    this.createForm();
    this.populateForm();
  }

  get formErrors() {
    return (
      this.descriptionControl.errors ||
      this.valueControl.errors ||
      this.typeControl.errors
    );
  }

  private createForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  populateForm() {
    this.setControlData('description');
    this.setControlData('value');
    this.setControlData('type');
  }

  private setControlData(control: 'description' | 'value' | 'type') {
    this.formData
      ? this.form?.controls[control].setValue(this.formData[control])
      : this.form?.controls[control].setValue('');
  }
}
