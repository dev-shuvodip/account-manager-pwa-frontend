import { Component, OnInit } from '@angular/core';
import CommonConstants from '../shared/common-constants';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Reports)?.displayText;

  constructor() { }

  ngOnInit(): void {
  }

}
