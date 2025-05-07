import { BaseService } from "../base.service";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../app/local-storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { map } from "rxjs";
import { Router } from "@angular/router";
import { Constants } from "../../constants/aslavecare.constants";
import jwt_decode from "jwt-decode";
import { ResponseBase } from "app/shared/Responses/response-base";
import { SignInAuthenticationModel } from "app/shared/models/signin/signin-authentication.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public showLoader: boolean = false;

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public signIn(email, password) {
    let loginModel = { email, password };
    return this.baseService
      .post<ResponseBase<SignInAuthenticationModel>>("signin/email", loginModel)
      .pipe(
        map((response) => {
          const authenticatedModel = response.data;
          this.localStorageService.setItem(
            Constants.TOKEN,
            authenticatedModel.access_token
          );
        })
      );
  }

  public requestChangePassword(email) {
    return this.baseService.post(`signin/change-password/${email}`, {});
  }

  public confirmChangePassword(newPassword) {
    return this.baseService.post(`signin/change-password`, newPassword);
  }

  public logout() {
    let lastEmail = this.localStorageService.getItem(
      Constants.LAST_LOGIN_EMAIL
    );
    this.localStorageService.clearLocalStorage();
    if (lastEmail) {
      this.localStorageService.setItem(Constants.LAST_LOGIN_EMAIL, lastEmail);
    }
    this.router.navigateByUrl("signin");
  }

  public refreshToken() {
    let token = this.localStorageService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${
        token && token.refresh_token ? token.refresh_token : ""
      }`,
    });

    return this.http
      .get(`${environment.BASE_URL}/v1/refresh-token?email=${token.email}`, {
        headers,
      })
      .pipe(
        map((response) => {
          const authenticatedModel = response;
          this.updateTokens(token, authenticatedModel);
          return response;
        })
      );
  }

  private updateTokens(token, authenticatedModel) {
    token.access_token = authenticatedModel.access_token;
    token.accessTokenExpiration = authenticatedModel.accessTokenExpiration;
    token.refresh_token = authenticatedModel.refresh_token;
    token.refreshTokenExpiration = authenticatedModel.refreshTokenExpiration;
    this.localStorageService.updateTokens(token);
  }

  public isTokenExpired(tokenExpirationDate: Date): boolean {
    const now = new Date();
    const expiration = new Date(tokenExpirationDate);
    return now > expiration;
  }

  public isManager() {
    let jwt = this.localStorageService.getToken();
    let decoded = jwt_decode(jwt);
    let role = decoded["role"];
    return role == "Manager";
  }

  public isEmployee() {
    let jwt = this.localStorageService.getToken();
    let decoded = jwt_decode(jwt);
    let role = decoded["role"];
    return role.includes("Employee");
  }

  public isMaster() {
    let jwt = this.localStorageService.getToken();
    let decoded = jwt_decode(jwt);
    let role = decoded["role"];
    return role === "Master";
  }
}
