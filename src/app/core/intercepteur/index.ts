
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./authInterceptor";

export const htttpInterceptorsProviders = [{ provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true }];
