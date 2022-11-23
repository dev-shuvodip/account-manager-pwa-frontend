import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  public async GetRoutes(): Promise<{ key ?: string, value ?: string } []> {
    let moduleRoutes: any;
    await import('../common-constants').then(response => moduleRoutes = response.default.ModulesRoutes);
    return moduleRoutes;
  }
}
