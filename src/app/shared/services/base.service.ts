import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private BASE_URL = environment.baseUrl;
  constructor(private http: HttpClient) {}

  get<T>(url: string, version: string = 'v1'): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${version}/${url}`);
  }

  getByParams<T>(url: string, params: HttpParams, version: string = 'v1'): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${version}/${url}`, { params });
  }

  getMock(fileName: string): Observable<any> {
    return this.http.get(`assets/data/${fileName}.json`);
  }

  post<T>(url: string, body: any, version: string = 'v1'): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}/${version}/${url}`, body);
  }

  put<T>(url: string, body: any, version: string = 'v1'): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${version}/${url}`, body);
  }

  patch<T>(url: string, body: any, version: string = 'v1'): Observable<T> {
    return this.http.patch<T>(`${this.BASE_URL}/${version}/${url}`, body);
  }

  delete<T>(url: string, version: string = 'v1'): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}/${version}/${url}`);
  }

  deleteWithBody(url: string, body, version: string = 'v1'): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.delete(`${this.BASE_URL}/${version}/${url}`, {
      body: `"${body}"`,
      headers,
    });
  }
}
