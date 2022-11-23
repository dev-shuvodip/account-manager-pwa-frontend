import { Component, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import CommonConstants from '../../common-constants';
import { SharedService } from '../../service/shared.service';
import { QuickLinksSidenavComponent } from './quick-links-sidenav/quick-links-sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild(QuickLinksSidenavComponent, { static: true }) quickLinksSidenav!: QuickLinksSidenavComponent;

  constructor(private router: Router, private zone: NgZone) { }

  Navigate(e: any) {
    debugger;
    this.zone.run(() => {
      this.router.navigate([e.currentTarget.dataset.link]);
    })
  }
}
