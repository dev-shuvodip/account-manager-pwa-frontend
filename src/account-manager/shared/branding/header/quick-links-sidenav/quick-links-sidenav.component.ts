import {
  Component,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { IRoute } from 'src/account-manager/shared/models/IRoute';
import { SharedService } from 'src/account-manager/shared/services/shared.service';

@Component({
  selector: 'app-quick-links-sidenav',
  templateUrl: './quick-links-sidenav.component.html',
  styleUrls: ['./quick-links-sidenav.component.css']
})
export class QuickLinksSidenavComponent implements OnInit {
  routesModule!: IRoute[];

  constructor(
    private sharedService: SharedService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routesModule = await this.sharedService.GetRoutes().then(routes => routes);
  }

  @ViewChild('sidenav') sideNav!: MatSidenav;

  trackByFn(index: number, item: IRoute) {
    return index;
  }
}
