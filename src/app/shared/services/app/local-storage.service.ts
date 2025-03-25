import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getItem(key): any {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  public setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public setItemRaw(key, value) {
    localStorage.setItem(key, value);
  }

  public getToken() {
    return JSON.parse(localStorage.getItem(Constants.TOKEN)) || null;
  }

  public setAccessToken(accessToken) {
    this.setItemRaw(Constants.ACCESS_TOKEN, JSON.stringify(accessToken));
  }

  public setToken(token) {
    this.setItemRaw(Constants.TOKEN, JSON.stringify(token));
  }

  public updateTokens(token: any) {
    this.setItemRaw(Constants.TOKEN, JSON.stringify(token));
    this.setItemRaw(Constants.ACCESS_TOKEN, JSON.stringify(token.access_token));
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public setObject(key, value) {
    this.setItem(key, JSON.stringify(value));
  }

  public clearItem(key: string): void {
    localStorage.removeItem(key);
  }
}
