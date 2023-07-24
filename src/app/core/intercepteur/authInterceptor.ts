import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
//requete + next(envoyer et gérer pour envoyer ensuite lors de l'exécution
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * Créeons les headers de notre nouvelle requête
     */
    const headers = new HttpHeaders()

      .append('Authorization', `Bearer ${this.authService.getToken()}`);
    /**
     * les requetes étant immuables, nous viendrons génerer une nouvelle requête et ensuite cloner
     */
    const modifiedReq = req.clone({ headers: headers });
    /**
     * l'operateur next nous permettra d'envoyer la requête modifiée
     */
    return next.handle(modifiedReq);

  }
}
