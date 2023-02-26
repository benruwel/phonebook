import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { ModalComponent } from './modal/modal.component';
import { ContactDetailsModalComponent } from './modal/contact-details-modal.component';
import { CreateContactModalComponent } from './modal/create-contact-modal.component';
import { ContactCardComponent } from './components/contact-card.component';
import { ContactRowComponent } from './components/contact-row.component';
import { PillComponent } from './components/pill.component';
import { SearchComponent } from './components/search.component';
import { LocalStorageService } from './domain/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactCardComponent,
    ContactRowComponent,
    CreateContactModalComponent,
    ContactDetailsModalComponent,
    ModalComponent,
    PillComponent,
    SearchComponent,
  ],
  imports: [BrowserModule, RouterModule, ReactiveFormsModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
