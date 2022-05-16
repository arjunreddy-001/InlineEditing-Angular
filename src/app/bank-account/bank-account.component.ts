import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../shared/bank-account.service';
import { BankService } from '../shared/bank.service';

@Component({
  selector: 'bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent implements OnInit {
  bankAccountForms: FormArray = this.fb.array([]);
  bankList = [];
  notification: any = null;

  constructor(
    private fb: FormBuilder,
    private bankSvc: BankService,
    private bankAccountSvc: BankAccountService
  ) {}

  ngOnInit(): void {
    this.bankSvc.getBankList().subscribe((res) => {
      this.bankList = res as [];
    });

    this.bankAccountSvc.getBankAccountList().subscribe((res) => {
      if (res == []) {
        this.addBankAccountForm();
      } else {
        // generate FormArray as per the data recieved from API
        (res as []).forEach((bankAccount: any) => {
          this.bankAccountForms.push(
            this.fb.group({
              bankAccountId: [bankAccount.bankAccountId],
              accountNumber: [bankAccount.accountNumber, Validators.required],
              accountHolder: [bankAccount.accountHolder, Validators.required],
              bankId: [bankAccount.bankId, Validators.min(1)],
              IFSC: [bankAccount.ifsc, Validators.required],
            })
          );
        });
      }
    });
  }

  addBankAccountForm() {
    this.bankAccountForms.push(
      this.fb.group({
        bankAccountId: [0],
        accountNumber: ['', Validators.required],
        accountHolder: ['', Validators.required],
        bankId: [0, Validators.min(1)],
        IFSC: ['', Validators.required],
      })
    );
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.bankAccountId == 0) {
      this.bankAccountSvc.addBankAccount(fg.value).subscribe((res: any) => {
        fg.patchValue({
          bankAccountId: res.bankAccountId,
        });
        this.showNotification('insert');
      });
    }

    if (fg.value.bankAccountId != 0) {
      this.bankAccountSvc.updateBankAccount(fg.value).subscribe(() => {
        this.showNotification('update');
      });
    }
  }

  deleteBankAccount(bankAccountId: number, index: number) {
    if (bankAccountId == 0) {
      this.bankAccountForms.removeAt(index);
      this.showNotification('delete');
    }

    if (bankAccountId != 0) {
      if (confirm('Are you sure to delete this record?')) {
        this.bankAccountSvc.deleteBankAccount(bankAccountId).subscribe(() => {
          this.bankAccountForms.removeAt(index);
          this.showNotification('delete');
        });
      }
    }
  }

  showNotification(category: string) {
    switch (category) {
      case 'insert':
        this.notification = {
          class: 'text-success',
          message: 'Saved',
        };
        break;

      case 'update':
        this.notification = {
          class: 'text-primary',
          message: 'Updated',
        };
        break;

      case 'delete':
        this.notification = {
          class: 'text-danger',
          message: 'Deleted',
        };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}
