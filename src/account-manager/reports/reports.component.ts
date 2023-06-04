import { Component, OnInit } from '@angular/core';
import CommonConstants from '../shared/common-constants';
import { User } from '../shared/models/User.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isLoading: boolean = false;
  error: string | null = null;
  isAuthenticated: boolean = false;
  user: User;
  pageTitle?: string = CommonConstants.ModulesRoutes.find(e => e.key == CommonConstants.Reports)?.displayText;

  constructor() { }

  ngOnInit(): void {
  }

}
