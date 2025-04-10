import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getItem(key): any {
    console.log('getItem', key);
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  public setItem(key, value) {
    console.log('setItem', key, value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  public setItemRaw(key, value) {
    console.log('setItemRaw', key, value);
    localStorage.setItem(key, value);
  }

  public getToken() {
    console.log('getToken');
    return JSON.parse(localStorage.getItem(Constants.TOKEN)) || null;
  }

  public setAccessToken(accessToken) {
    console.log('setAccessToken', accessToken);
    this.setItemRaw(Constants.ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  public getAccessToken() {
    console.log('setAccessToken');
    return JSON.parse(localStorage.getItem(Constants.ACCESS_TOKEN)) || null;
  }

  public setToken(token) {
    console.log('setToken', token);
    this.setItemRaw(Constants.TOKEN, JSON.stringify(token));
  }

  public updateTokens(token: any) {
    console.log('updateTokens', token);
    this.setItemRaw(Constants.TOKEN, JSON.stringify(token));
    this.setItemRaw(Constants.ACCESS_TOKEN, JSON.stringify(token.access_token));
  }

  public clearLocalStorage() {
    console.log('clearLocalStorage');
    localStorage.clear();
  }

  public setObject(key, value) {
    console.log('setObject', key, value);
    this.setItem(key, JSON.stringify(value));
  }

  public clearItem(key: string): void {
    console.log('clearItem', key);
    localStorage.removeItem(key);
  }
}
