import { Component } from '@angular/core';
import CommonConstants from '../../common-constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  FullYear: number = new Date().getFullYear();
  Author: string = CommonConstants.Author;
  CopyrightMessage: string = CommonConstants.CopyrightMessage;
}
