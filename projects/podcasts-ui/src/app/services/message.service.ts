import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EpisodesByIdItem } from '../models/shared.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mainPlayerState = new Subject<boolean>();
  private activeAudio = new Subject<EpisodesByIdItem>();

  mainPlayerState$ = this.mainPlayerState.asObservable();
  activeAudio$ = this.activeAudio.asObservable();

  constructor() { }

  hideMainPlayer() {
    this.mainPlayerState.next(false);
  }

  changeAudio(currentAudio: EpisodesByIdItem) {
    this.activeAudio.next(currentAudio);
  }
}
