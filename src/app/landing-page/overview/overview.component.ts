import { A11yModule } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import CommonConstants from 'src/app/shared/common-constants';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [MaterialModule, A11yModule]
})
export class OverviewComponent {

  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Landing)?.displayText;

}
