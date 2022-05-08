import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormAddUnitService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    const form = this.formBuilder.group({
      unitValue: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
