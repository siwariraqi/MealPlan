import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("our interceptor was called");
    console.log("jwtInterceptor.intercept");
    const token = this.tokenStorage.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);

    /*
    let authReq = request;
    const token = this.tokenStorage.getToken();
    if (token != null) {
      // for Spring Boot back-end
      console.log("token: " + token);

      console.log("Request headers before cloning:", request.headers);
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      });
      console.log("Request headers after cloning:", authReq.headers);

      // for Node.js Express back-end
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);

    //return next.handle(request);
    */
  }
}
