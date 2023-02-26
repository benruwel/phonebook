import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

import {
  Contact,
  ContactListState,
  ContactListType,
  CreateContact,
  UpdateContact,
} from './model';

@Injectable({ providedIn: 'root' })
export class ContactListService {
  private contacts = new BehaviorSubject<ContactListState[]>([]);
  contacts$ = this.contacts.asObservable();

  private listType = new BehaviorSubject<ContactListType>('list');
  lisType$ = this.listType.asObservable();

  private localStorageService = inject(LocalStorageService);

  constructor() {
    const allContacts = this.localStorageService.getContacts();
    if (allContacts.length) {
      const sortedContacts = allContacts.sort(this.sortAlphabetically);
      this.contacts.next(this.toViewModel(sortedContacts));
    } else {
      this.contacts.next(this.toViewModel(allContacts));
    }

    const listType = this.localStorageService.getListType();
    this.listType.next(listType);
  }

  searchQuery(query: string) {
    if (!query) {
      this.resetSearch();
      return;
    }
    const allContacts = this.localStorageService.getContacts();
    if (allContacts.length) {
      const filteredContacts = allContacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`;
        return fullName.toLowerCase().includes(query.toLowerCase());
      });
      const sortedContacts = filteredContacts.sort(this.sortAlphabetically);
      this.contacts.next(this.toViewModel(sortedContacts));
    }
  }

  resetSearch() {
    const allContacts = this.localStorageService.getContacts();
    if (allContacts.length) {
      const sortedContacts = allContacts.sort(this.sortAlphabetically);
      this.contacts.next(this.toViewModel(sortedContacts));
    } else {
      this.contacts.next(this.toViewModel(allContacts));
    }
  }

  markSelected(id: string) {
    const currentContacts = this.contacts.getValue();
    const subjIndex = currentContacts.findIndex((contact) => contact.id === id);
    if (subjIndex === -1) {
      return;
    }
    currentContacts[subjIndex].selected = !currentContacts[subjIndex].selected;
    this.contacts.next(currentContacts);
  }

  deleteSelected(): void {
    const currentContacts = this.contacts.getValue();
    const contactsToBeDeleted = currentContacts.filter(
      (contact) => contact.selected
    );
    contactsToBeDeleted.forEach((contact) =>
      this.localStorageService.deleteContact(contact.id)
    );
    const updatedContacts = currentContacts.filter((contact) => {
      return !contact.selected;
    });
    this.contacts.next(updatedContacts);
  }

  toggleView(type: ContactListType) {
    this.listType.next(type);
    this.localStorageService.setListType(type);
  }

  createContact(payload: CreateContact) {
    const updatedContacts = this.localStorageService.createContact(payload);
    const updatedState = this.toViewModel(updatedContacts);
    this.contacts.next(updatedState.sort(this.sortAlphabetically));
  }

  findContact(id: string): Contact | undefined {
    return this.localStorageService.findContactById(id);
  }

  updateContact(payload: UpdateContact) {
    const updatedContacts = this.localStorageService.updateContact(payload);
    const updatedState = this.toViewModel(updatedContacts);
    this.contacts.next(updatedState.sort(this.sortAlphabetically));
  }

  deleteContact(id: string) {
    const updatedContacts = this.localStorageService.deleteContact(id);
    const updatedState = this.toViewModel(updatedContacts);
    this.contacts.next(updatedState.sort(this.sortAlphabetically));
  }

  private toViewModel(contacts: Contact[]): ContactListState[] {
    return contacts.map((contact) => {
      return {
        ...contact,
        selected: false,
      };
    });
  }

  private sortAlphabetically(
    a: ContactListState | Contact,
    b: ContactListState | Contact
  ) {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  }
}
