import { ContactListState } from './../domain/model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contact-row',
  template: `
    <div class="grid grid-cols-2 px-2 py-4 md:grid-cols-3 md:px-4 md:py-6">
      <div class="flex flex-row items-center space-x-4">
        <input
          [id]="contact.id"
          [checked]="contact.selected"
          (change)="markAsSelected.emit(contact.id)"
          class="rounded border-gray-400 text-black focus:ring-gray-400"
          type="checkbox"
          name="check"
          id="check"
        />
        <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
          <img
            [src]="
              'https://ui-avatars.com/api/?background=random&name=' +
              contact.firstName +
              '+' +
              contact.lastName
            "
            alt="Contact Avatar"
            class="object-cover object-center"
          />
        </div>
        <p
          (click)="viewDetails.emit(contact.id)"
          class="underline cursor-pointer hover:text-blue-500"
        >
          {{ contact.firstName }} {{ contact.lastName }}
        </p>
      </div>
      <div
        class="flex flex-col space-y-1 md:flex-row md:space-x-2 md:flex-wrap md:space-y-0"
      >
        <pill>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-3 h-3"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clip-rule="evenodd"
            />
          </svg>

          <span>{{ contact.phoneNumber }}</span>
        </pill>
        <ng-container *ngIf="contact.email">
          <pill>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-3 h-3"
            >
              <path
                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
              />
              <path
                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
              />
            </svg>
            <span>{{ contact.email }}</span>
          </pill>
        </ng-container>
      </div>
      <div
        class="hidden flex-col space-y-1 text-sm text-gray-500 md:flex md:items-end"
      >
        <span>{{ contact.createdAt | date : 'longDate' }}</span>
        <span>{{ contact.createdAt | date : 'shortTime' }}</span>
      </div>
    </div>
  `,
})
export class ContactRowComponent {
  @Input() contact!: ContactListState;
  @Output() markAsSelected = new EventEmitter<string>();
  @Output() viewDetails = new EventEmitter<string>();
}
