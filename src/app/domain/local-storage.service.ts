import {
  Contact,
  ContactListType,
  CreateContact,
  UpdateContact,
} from './model';
import { Injectable } from '@angular/core';

import { nanoid } from 'nanoid';

@Injectable()
export class LocalStorageService {
  private readonly CONTACTS_KEY = 'contacts';
  private readonly CONTACTS_LIST_TYPE_KEY = 'contactsListType';

  /*
   * during initialization, check if the contacts key and list type key exists in local storage
   * if not, create them
   */
  constructor() {
    const contactsDb = localStorage.getItem(this.CONTACTS_KEY);
    if (!contactsDb) {
      localStorage.setItem(this.CONTACTS_KEY, JSON.stringify([]));
    }
    const listType = localStorage.getItem(this.CONTACTS_LIST_TYPE_KEY);
    if (!listType) {
      localStorage.setItem(this.CONTACTS_LIST_TYPE_KEY, 'grid');
    }
  }

  getListType(): ContactListType {
    return localStorage.getItem(this.CONTACTS_LIST_TYPE_KEY) as ContactListType;
  }

  setListType(listType: ContactListType): void {
    localStorage.setItem(this.CONTACTS_LIST_TYPE_KEY, listType);
  }

  getContacts(): Contact[] {
    const columns = localStorage.getItem(this.CONTACTS_KEY);
    if (!columns) {
      return [];
    }
    try {
      return JSON.parse(columns);
    } catch {
      /*  
          parse error possibly due to corrupted input
          solution: nuke local storage and reset
      */
      localStorage.setItem(this.CONTACTS_KEY, JSON.stringify([]));
      return [];
    }
  }

  findContactById(id: string): Contact | undefined {
    const allContacts = this.getContacts();
    return allContacts.find((c) => c.id === id);
  }

  createContact(payload: CreateContact): Contact[] {
    const id = nanoid(10);
    const newContact: Contact = {
      ...payload,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const allContacts = this.getContacts();
    allContacts.push(newContact);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(allContacts));
    return allContacts;
  }

  updateContact(contact: UpdateContact): Contact[] {
    const allContacts = this.getContacts();
    const index = allContacts.findIndex((c) => c.id === contact.id);
    if (index === -1) {
      return allContacts;
    }
    const previousValue = allContacts[index];
    allContacts[index] = {
      ...previousValue,
      ...contact,
      updatedAt: new Date(),
    };
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(allContacts));
    return allContacts;
  }

  deleteContact(columnId: string): Contact[] {
    const allContacts = this.getContacts();
    const newContacts = allContacts.filter((column) => column.id !== columnId);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(newContacts));
    return newContacts;
  }
}
