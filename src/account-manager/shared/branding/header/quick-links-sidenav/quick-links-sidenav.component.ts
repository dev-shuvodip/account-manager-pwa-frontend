import {
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SharedService } from 'src/account-manager/shared/services/shared.service';

@Component({
  selector: 'app-quick-links-sidenav',
  templateUrl: './quick-links-sidenav.component.html',
  styleUrls: ['./quick-links-sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuickLinksSidenavComponent implements OnInit {
  routesModule!: { key?: string, value?: string, displayText?: string }[];

  constructor(
    private router: Router,
    private zone: NgZone,
    private sharedService: SharedService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routesModule = await this.sharedService.GetRoutes().then(routes => routes);
  }

  @ViewChild('sidenav') sideNav!: MatSidenav;

  Navigate(e: any) {
    this.zone.run(() => {
      this.router.navigate([e.currentTarget.dataset.link]);
      this.sideNav.toggle()
    })
  }
}
