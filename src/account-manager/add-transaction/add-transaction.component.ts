import { Component } from '@angular/core';
import CommonConstants from '../shared/common-constants';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.TransactionManagement)?.displayText;

}
