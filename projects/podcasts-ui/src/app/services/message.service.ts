import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EpisodesByIdItem } from '../models/shared.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mainPlayerState = new Subject<boolean>();
  private activeAudio = new Subject<EpisodesByIdItem>();
  private isPlaying = new Subject<boolean>();

  mainPlayerState$ = this.mainPlayerState.asObservable();
  activeAudio$ = this.activeAudio.asObservable();
  isPlaying$ = this.isPlaying.asObservable();

  constructor() { }

  hideMainPlayer() {
    this.mainPlayerState.next(false);
  }

  changeAudio(currentAudio: EpisodesByIdItem) {
    this.activeAudio.next(currentAudio);
    this.playAudio();
  }

  playAudio() {
    this.isPlaying.next(true);
  }

  pauseAudio() {
    this.isPlaying.next(false);
  }
}
