import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormAddClientService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm(): FormGroup {
    const form = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
