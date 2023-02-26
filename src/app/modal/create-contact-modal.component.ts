import { CreateContact, CreateContactForm } from './../domain/model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cerate-contact-modal',
  template: `
    <modal (exit)="exit.emit()" modalTitle="New Contact">
      <div [formGroup]="form" class="flex flex-col space-y-6">
        <div
          class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-0 md:gap-x-4"
        >
          <div class="flex flex-col space-y-2">
            <label for="firstName" class="text-sm font-medium text-gray-600"
              >First Name</label
            >
            <input
              type="text"
              id="firstName"
              formControlName="firstName"
              placeholder="John"
              class="rounded-lg"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <label for="lastName" class="text-sm font-medium text-gray-600"
              >Last Name</label
            >
            <input
              type="text"
              id="lastName"
              formControlName="lastName"
              placeholder="Doe"
              class="rounded-lg"
            />
          </div>
        </div>

        <div
          class="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-0 md:gap-x-4"
        >
          <div class="flex flex-col space-y-2">
            <label for="phoneNumber" class="text-sm font-medium text-gray-600"
              >Phone Number</label
            >
            <input
              type="text"
              id="phoneNumber"
              formControlName="phoneNumber"
              class="rounded-lg"
              placeholder="0721 123 456"
              minlength="10"
              maxlength="10"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <label for="email" class="text-sm font-medium text-gray-600"
              >Email <span class="text-xs">(optional)</span></label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="exaple@gmail.com"
              class="rounded-lg"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            [disabled]="form.invalid"
            (click)="onSave()"
            class="px-6 py-2 rounded-lg bg-black text-white text-sm btn-scaling disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:scale-100 focus:ring focus:ring-gray-400 focus:ring-offset-4"
          >
            Save
          </button>
        </div>
      </div>
      
    </modal>
  `,
})
export class CreateContactModalComponent {
  @Output() saved = new EventEmitter<CreateContact>();
  @Output() exit = new EventEmitter<void>();

  form = new FormGroup<CreateContactForm>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
  });

  onSave() {
    if (this.form.valid) {
      this.saved.emit(this.form.value as CreateContact);
    }
  }
}
