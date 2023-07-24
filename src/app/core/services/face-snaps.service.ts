import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor( private httpClient: HttpClient){

  }
  faceSnaps: FaceSnap[] = [];

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.httpClient.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }


  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    // const faceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
    // if (!faceSnap) {
    //   throw new Error('FaceSnap not found!');
    // } else {
    //   return faceSnap;
    // }
   return this.httpClient.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`)
  }

  // snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
  //   // const faceSnap = this.getFaceSnapById(faceSnapId);
  //   // snapType === 'snap' ? faceSnap.snaps++ : faceSnap.snaps--;
  // }



  // snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
  //   return this.getFaceSnapById(faceSnapId).pipe(
  //     map(faceSnap => ({
  //       ...faceSnap,
  //       snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
  //     })),
  //     //Recoit le faceSnap mis a jour
  //     switchMap(updatedFaceSnap => this.http.put<FaceSnap>(
  //       `http://localhost:3000/facesnaps/${faceSnapId}`,
  //       updatedFaceSnap)
  //     )
  //   );
  // }


  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
      })),
      switchMap(updatedFaceSnap => this.httpClient.put<FaceSnap>(
        `http://localhost:3000/facesnaps/${faceSnapId}`,
        updatedFaceSnap)
      )
    );
  }



  // onAddFaceSnap(formValue:{title: string,description:string,imageUrl:string,location: string}) : void{
  //   const faceSnap: FaceSnap = {
  //     ...formValue,
  //     createdDate : new Date(),
  //     id : this.faceSnaps[this.faceSnaps.length - 1 ].id +1,
  //     snaps:0
  //
  //   };
  //   this.faceSnaps.push(faceSnap);
  //
  // }

  addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
   //liste facesnaps
    return this.getAllFaceSnaps().pipe(
      //recupere la liste des faceSnaps et transforme avec map
      //Et on trie le tableau en fesant une copie
      map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
      //La liste des faceSnaps trié et on envoie le dernier faceSnap de la liste
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      //Ici nous sommes sur d'avoir le dernier faceSnaps
      map(previousFacesnap => ({
        //on clone le formValue
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFacesnap.id + 1
      })),
      //Et maintenant on peut avoir le faceSnap au serveur
      switchMap(newFacesnap => this.httpClient.post<FaceSnap>(
        'http://localhost:3000/facesnaps',
        newFacesnap)
      )
    );
  }

}
