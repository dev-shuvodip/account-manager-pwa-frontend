import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/account-manager/material/material.module';
import CommonConstants from 'src/account-manager/shared/common-constants';
import { LoadingSpinnerComponent } from 'src/account-manager/shared/loading-spinner/loading-spinner.component';
import { User } from 'src/account-manager/shared/models/User.model';
import { SnackbarComponent } from 'src/account-manager/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, A11yModule, LoadingSpinnerComponent, SnackbarComponent]
})
export class OverviewComponent {
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;
  user: User;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.displayText;

}
