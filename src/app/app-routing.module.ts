import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/components/landing-page/landing-page.component';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  /**
   * Nous déléguons angular de ne charger le routing faceSnaps que lorsque l'utilisateur visitera un routing de faceSnaps
   * Et cela est très pratique pour les vraies applications
   */
  { path: 'facesnaps',loadChildren: () => import('./face-snaps/face-snaps.module').then(moduleRouting => moduleRouting.FaceSnapsModule) },
  { path: '', component: LandingPageComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
