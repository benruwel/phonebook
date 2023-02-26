import { BehaviorSubject } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Contact,
  ContactListState,
  CreateContact,
  CreateContactForm,
  UpdateContact,
} from './../domain/model';
import { ContactListService } from './../domain/contact-list.service';

@Component({
  selector: 'contact-details-modal',
  template: `
    <modal modalTitle="Contact Details" (exit)="exit.emit()">
      <div class="flex flex-col space-y-6">
        <ng-container
          *ngIf="selectedContactView.asObservable() | async as selectedContact"
        >
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
              <img
                [src]="
                  'https://ui-avatars.com/api/?background=random&name=' +
                  selectedContact.firstName +
                  '+' +
                  selectedContact.lastName
                "
                alt="Contact Avatar"
                class="object-cover object-center h-full w-full"
              />
            </div>
          </div>
        </ng-container>

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
              (click)="onUpdate()"
              class="px-6 py-2 rounded-lg bg-black text-white text-sm btn-scaling disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:scale-100 focus:ring focus:ring-gray-400 focus:ring-offset-4"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </modal>
  `,
})
export class ContactDetailsModalComponent implements OnInit {
  private router = inject(Router);
  private viewModel = inject(ContactListService);

  selectedContactView = new BehaviorSubject<Contact | null>(null);

  @Output() exit = new EventEmitter<void>();
  @Output() updated = new EventEmitter<UpdateContact>();

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

  ngOnInit() {
    const contactId = this.router.routerState.snapshot.url.split('=')[1];
    if (contactId) {
      const selectedContact = this.viewModel.findContact(contactId);
      if (selectedContact == undefined) {
        this.exit.emit();
      } else {
        this.selectedContactView.next(selectedContact);
        this.form.patchValue({
          firstName: selectedContact.firstName,
          lastName: selectedContact.lastName,
          email: selectedContact.email || '',
          phoneNumber: selectedContact.phoneNumber,
        });
      }
    }
  }

  onUpdate() {
    const selectedContact = this.selectedContactView.value;
    if (this.form.valid && selectedContact) {
      const formValue = this.form.value as CreateContact;
      const payload: UpdateContact = {
        id: selectedContact.id,
        ...formValue,
      };
      this.updated.emit(payload);
    }
  }
}
