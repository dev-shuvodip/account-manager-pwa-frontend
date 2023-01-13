import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth/services/auth.service';
import CommonConstants from '../shared/common-constants';
import { User } from '../shared/models/User.model';
import { SharedService } from '../shared/services/shared.service';

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
  pageTitle?: string = CommonConstants.ModulesRoutes.find(
    e => e.key == CommonConstants.TransactionManagement
  )?.displayText;

  constructor(
    public authService: AuthService,
    public sharedService: SharedService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
}
