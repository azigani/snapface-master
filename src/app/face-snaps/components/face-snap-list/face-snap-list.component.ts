import {Component, OnDestroy, OnInit} from '@angular/core';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Observable, Subject} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps$! : Observable<FaceSnap[]>;
  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    // this.destroy$ = new  Subject<boolean>()
    // this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
    // interval(1000).pipe(
    //   takeUntil(this.destroy$),
    //  tap(console.log)
    // ).subscribe();

    // interval(1000).subscribe(value => console.log(value % 3 !== 0 ? 'Tick' : 'BANG'));
    // interval(1000).subscribe(value => console.log(value !== 3 ? 'Tick' : 'BANG'));
  this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }

  ngOnDestroy(): void {
// this.destroy$.next(true)
  }

}
