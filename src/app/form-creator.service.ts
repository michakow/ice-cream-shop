import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormCreatorService {
  constructor(private formBuilder: FormBuilder) {}

  public createUnitForm(): FormGroup {
    const form = this.formBuilder.group({
      unitValue: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }

  public createLoginForm(): FormGroup {
    const form = this.formBuilder.group({
      login: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }

  public createFlavorForm(): FormGroup {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }

  public createOrderForm(): FormGroup {
    const form = this.formBuilder.group({
      order: this.formBuilder.array([]),
    });

    return form;
  }

  public createClientForm(): FormGroup {
    const form = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
