import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActiveEpisode, EpisodesByIdItem } from '../models/shared.type';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private mainPlayerState = new Subject<boolean>();
  private activeAudio = new Subject<EpisodesByIdItem>();
  private activeEpisode = new Subject<ActiveEpisode>();

  mainPlayerState$ = this.mainPlayerState.asObservable();
  activeAudio$ = this.activeAudio.asObservable();
  activeEpisode$ = this.activeEpisode.asObservable();

  constructor() { }

  hideMainPlayer() {
    this.mainPlayerState.next(false);
  }

  changeAudio(currentAudio: EpisodesByIdItem) {
    this.activeAudio.next(currentAudio);
    this.playAudio(currentAudio.id);
  }

  playAudio(episodeId: number) {
    this.activeEpisode.next({ isPlaying: true, episodeId: episodeId});
  }

  pauseAudio(episodeId: number) {
    this.activeEpisode.next({ isPlaying: false, episodeId: episodeId});
  }
}
