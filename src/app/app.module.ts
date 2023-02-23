import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ContactCardComponent } from './components/contact-card.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, ContactCardComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
