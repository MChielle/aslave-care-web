import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth/auth.service';
import { LocalStorageService } from '../services/app/local-storage.service'
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';
declare var $: any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');      
    let authReq = request.clone({ headers });
    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // this.toastr.warning(
          //   'Token de autorização inválido, tente logar novamente'
          // );
          this.showNotification('Token de autorização inválido, tente logar novamente');
          this.authService.logout();
        } else {
          // Handle other errors
        }
        return throwError(() => error);
      })
    );
  }
  showNotification(text: string) {
    const notification = this.notificationService.buildNotification(
      text,
      "primary",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }
}
