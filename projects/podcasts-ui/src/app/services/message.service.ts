import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EpisodesByIdItems } from '../models/shared.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mainPlayerState = new Subject<boolean>();
  private activeAudio = new Subject<EpisodesByIdItems>();

  mainPlayerState$ = this.mainPlayerState.asObservable();
  activeAudio$ = this.activeAudio.asObservable();

  constructor() { }

  hideMainPlayer() {
    this.mainPlayerState.next(false);
  }
}
