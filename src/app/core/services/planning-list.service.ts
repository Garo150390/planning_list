import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { PlanningDataModel } from '../models';

@Injectable()
export class PlanningListService {

  constructor(private http: HttpClient) { }

  public getPlanningList(): Observable<PlanningDataModel[]> {
    return this.http.get<PlanningDataModel[]>(`${environment.apiEndPoint}/plannings.json`);
  }
}
