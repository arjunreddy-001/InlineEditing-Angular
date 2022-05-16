import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { BankService } from './shared/bank.service';
import { BankAccountService } from './shared/bank-account.service';

@NgModule({
  declarations: [AppComponent, BankAccountComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [BankService, BankAccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
