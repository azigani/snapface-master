import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {FaceSnap} from "../../../core/models/face-snap.model";
import {map, tap} from "rxjs/operators";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm! : FormGroup;
faceSnapPreview$! : Observable<FaceSnap>;
  urlRegEx!: RegExp;

  constructor(private fb : FormBuilder,
              private faceSnapService : FaceSnapsService,
              private router : Router) { }

  ngOnInit(): void {
    this.urlRegEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.fb.group(
      {
        title : [null, Validators.required],
        description: [null, Validators.required],
        imageUrl : [null, Validators.required,[Validators.required, Validators.pattern(this.urlRegEx)]],
        localisation: [null]
      },{
        //Le formulaire est mis à jour si on change de champ
        updateOn:'blur'
      }
    );
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue=>({
        //Ici on récupère toute la formValue
        ...formValue,
        createDate : new Date(),
        id : 0,
        snaps:0
      }))
    );
  }

  onSubmitForm(): void {
    // this.snapForm.value;
    // console.log(this.snapForm?.value);
    this.faceSnapService.addFaceSnap(this.snapForm?.value).pipe(
      tap(()=> this.router.navigateByUrl('/facesnaps'))
    ).subscribe();

  }

}
