import { Component } from '@angular/core';
import CommonConstants from '../shared/common-constants';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;
  user: User;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.TransactionManagement)?.displayText;

}
