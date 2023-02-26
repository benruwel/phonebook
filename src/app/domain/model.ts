import { FormControl } from '@angular/forms';

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContact = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};

export type UpdateContact = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
};

export interface CreateContactForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
}

export type ContactListType = 'grid' | 'list';

export type ContactListState = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  selected: boolean;
};
