import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankAccountService {
  constructor(private http: HttpClient) {}

  addBankAccount(bankAccountInfo: any) {
    bankAccountInfo.bankId = +bankAccountInfo.bankId;

    return this.http.post(
      environment.apiBaseUrl + 'BankAccounts',
      bankAccountInfo
    );
  }

  getBankAccountList() {
    return this.http.get(environment.apiBaseUrl + 'BankAccounts');
  }

  updateBankAccount(bankAccountInfo: any) {
    bankAccountInfo.bankId = +bankAccountInfo.bankId;

    return this.http.put(
      environment.apiBaseUrl + `BankAccounts/${bankAccountInfo.bankId}`,
      bankAccountInfo
    );
  }

  deleteBankAccount(bankAccountId: number) {
    return this.http.delete(
      environment.apiBaseUrl + `BankAccounts/${bankAccountId}`
    );
  }
}
