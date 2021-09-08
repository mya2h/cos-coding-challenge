import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  

  constructor(private http: HttpClient) { }
  
  getAuctions(): Observable<any> {
    return this.http.get(API_URL + 'v2/auction/buyer/waiting/pickup');
  }
}
