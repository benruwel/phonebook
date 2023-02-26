import { Contact, CreateContact } from './domain/model';
import { Component, inject } from '@angular/core';

import { ContactListService } from './domain/contact-list.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <main class="relative h-full min-h-screen">
      <!-- tile section -->
      <section
        class="sticky top-0 left-0 z-10 p-4 border-b border-gray-200 backdrop-filter backdrop-blur-lg  md:px-8"
      >
        <span class="font-sans text-lg tracking-widest leading-3 font-black"
          >PHONEBOOK</span
        >

        <div class="flex flex-row space-x-2 items-center justify-between">
          <div class="flex flex-row space-x-2 items-center">
            <h3>Contacts</h3>
            <ng-container *ngIf="contacts$ | async as contacts">
              <div class="inline-flex">
                <span
                  class="px-4 bg-purple-100 rounded-full text-sm text-purple-600 font-medium"
                  >{{ contacts.length }}</span
                >
              </div>
            </ng-container>
          </div>

          <div class="flex flex-row space-x-4">
            <ng-container *ngIf="listType$ | async as listType">
              <button
                [ngClass]="{ 'bg-gray-300': listType === 'grid' }"
                (click)="viewModel.toggleView('grid')"
                title="Toggle Grid View"
                class="btn-scaling p-2 rounded-lg hover:bg-gray-200 focus:bg-gray-300 focus:ring focus:ring-gray-400 focus:ring-offset-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>
              <button
                [ngClass]="{ 'bg-gray-300': listType === 'list' }"
                (click)="viewModel.toggleView('list')"
                title="Toggle List View"
                class="btn-scaling p-2 rounded-lg hover:bg-gray-200 focus:bg-gray-300 focus:ring focus:ring-gray-400 focus:ring-offset-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </ng-container>

            <button
              (click)="showCreateContactModal = true"
              class="hidden px-6 py-2 rounded-lg bg-black text-white text-sm btn-scaling focus:ring focus:ring-gray-400 focus:ring-offset-4 sm:block"
            >
              New
            </button>
            <ng-container *ngIf="selectedContact$ | async as selectedContacts">
              <button
                [disabled]="selectedContacts.length <= 0"
                (click)="viewModel.deleteSelected()"
                title="Delete Selected"
                class="hidden p-2 rounded-lg bg-red-500 text-white text-sm btn-scaling disabled:bg-gray-200 disabled:text-gray-500 focus:ring focus:ring-red-200 focus:bg-red-600 focus:ring-offset-4 sm:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </ng-container>
          </div>
        </div>
      </section>

      <!-- floating button -->
      <div class="fixed bottom-0 left-0 z-10 w-full p-4 sm:hidden">
        <div class="flex flex-row space-x-2 items-center w-full">
          <button
            (click)="showCreateContactModal = true"
            class="flex-1 h-12 px-6 py-4 rounded-lg bg-black text-white text-sm btn-scaling focus:ring focus:ring-purple-200 focus:ring-offset-4"
          >
            New
          </button>
          <ng-container *ngIf="selectedContact$ | async as selectedContacts">
            <button
              [disabled]="selectedContacts.length <= 0"
              (click)="viewModel.deleteSelected()"
              title="Delete Selected"
              class="h-12 w-12 flex justify-center items-center rounded-lg bg-red-500 text-white text-sm btn-scaling disabled:bg-gray-200 disabled:text-gray-500 focus:ring focus:ring-red-200 focus:bg-red-600 focus:ring-offset-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </ng-container>
        </div>
      </div>

      <!-- content -->
      <section class="flex flex-col space-y-6 p-4 pb-28 md:p-8">
        <div class="flex flex-row justify-center w-full">
          <div class="w-full max-w-lg">
            <search
              (search)="viewModel.searchQuery($event)"
              (reset)="viewModel.resetSearch()"
            ></search>
          </div>
        </div>

        <ng-container *ngIf="contacts$ | async as contacts">
          <ng-container *ngIf="!contacts.length">
            <div
              class="flex flex-col w-full p-6 text-center bg-gray-100 border border-gray-100 rounded-lg text-gray-500"
            >
              <span>Your contacts list is empty</span>
              <span>Start by clicking "New"</span>
            </div>
          </ng-container>

          <ng-container *ngIf="contacts.length">
            <ng-container *ngIf="listType$ | async as listType">
              <ng-container *ngIf="listType === 'grid'">
                <div
                  class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
                >
                  <ng-container *ngFor="let contact of contacts">
                    <contact-card
                      [contact]="contact"
                      (viewDetails)="onViewDetails($event)"
                      (markAsSelected)="viewModel.markSelected($event)"
                    ></contact-card>
                  </ng-container>
                </div>
              </ng-container>

              <ng-container *ngIf="listType === 'list'">
                <div
                  class="grid grid-cols-2 gap-x-4 text-sm font-medium text-gray-600 md:grid-cols-3"
                >
                  <div class="px-4"><span>Name</span></div>
                  <div><span>Contact</span></div>
                  <div class="hidden md:block md:text-right">
                    <span>Created On</span>
                  </div>
                </div>

                <div class="flex flex-col divide-y divide-gray-300">
                  <ng-container *ngFor="let contact of contacts">
                    <contact-row
                      [contact]="contact"
                      (viewDetails)="onViewDetails($event)"
                      (markAsSelected)="viewModel.markSelected($event)"
                    ></contact-row>
                  </ng-container>
                </div>
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </section>

      <!-- modals -->
      <ng-container *ngIf="showCreateContactModal">
        <cerate-contact-modal
          (exit)="showCreateContactModal = false"
          (saved)="onContactSaved($event)"
        ></cerate-contact-modal>
      </ng-container>

      <ng-container *ngIf="showContactDetailsModal">
        <contact-details-modal
          (exit)="onViewDetailsModalClosed()"
          (updated)="viewModel.updateContact($event)"
        ></contact-details-modal>
      </ng-container>
    </main>
  `,
})
export class AppComponent {
  viewModel = inject(ContactListService);
  router = inject(Router);

  listType$ = this.viewModel.lisType$;
  contacts$ = this.viewModel.contacts$;
  selectedContact$ = this.viewModel.contacts$.pipe(
    map((contacts) => contacts.filter((contact) => contact.selected))
  );

  showCreateContactModal = false;
  showContactDetailsModal = false;

  onNew() {
    this.showCreateContactModal = true;
  }

  onViewDetails(contactId: string) {
    this.router.navigate(['/'], {
      queryParams: {
        contactId,
      },
    });
    this.showContactDetailsModal = true;
  }

  onViewDetailsModalClosed() {
    this.router.navigate(['/']);
    this.showContactDetailsModal = false;
  }

  onContactSaved(event: CreateContact) {
    this.viewModel.createContact(event);
    this.showCreateContactModal = false;
  }

  onContactDeleted(event: string) {
    this.viewModel.deleteContact(event);
  }
}
