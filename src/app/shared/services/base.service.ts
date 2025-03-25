import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private BASE_URL = environment.baseUrl;
  private v1 = 'v1';
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${this.v1}/${url}`);
  }

  getMock(fileName: string): Observable<any> {
    return this.http.get(`assets/data/${fileName}.json`);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${this.v1}/${url}`, body);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${this.v1}/${url}`, body);
  }

  patch(url: string, body: any, version: string = 'v1'): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/${this.v1}/${url}`, body);
  }

  delete(url: string, version: string = 'v1'): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${this.v1}/${url}`);
  }

  deleteWithBody(url: string, version: string = 'v1', body): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(`${this.BASE_URL}/${this.v1}/${url}`, {
      body: `"${body}"`,
      headers,
    });
  }
}
