import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { EpisodesByIdItem } from '../../models/shared.type';

@Component({
  selector: 'pc-main-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit, OnChanges {

  @Input() currentEpisode: EpisodesByIdItem | undefined;
  currentAudio = new Audio();
  isPlaying = false;

  constructor(private messageService: MessageService) {
    this.currentAudio.preload = 'metadata';    
  }

  ngOnInit(): void {
    this.messageService.isPlaying$.subscribe({
      next: result => {
        this.isPlaying = result;
        if(this.isPlaying) {
          console.log("Let's play");
          this.currentAudio?.play();    
          console.log(`volume: ${this.currentAudio.volume}`);
        } else {
          this.currentAudio?.pause();          
        }
      },
      error: error => console.error(error),
      complete: () => console.info('isPlaying$ complete')
    });
  } 

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue: EpisodesByIdItem | undefined = changes['currentEpisode'].currentValue;
    const previousValue: EpisodesByIdItem | undefined = changes['currentEpisode'].previousValue;
    if (currentValue?.id !== previousValue?.id) {
      this.currentAudio.src = this.currentEpisode?.enclosureUrl ?? '';      
      if (this.currentAudio.readyState > 0) {
        console.log('readyState is set');
        this.playOnInit();
      } else {
        this.currentAudio.addEventListener('loadedmetadata', () => {
          console.log('metaData loaded');
          this.playOnInit();
        });
      }
    }
  }

  playOnInit() {
    this.messageService.playAudio();
    this.setMediaSession();
  }

  playAudio() {    
    this.messageService.playAudio();
  }

  pauseAudio() {    
    this.messageService.pauseAudio();
  }

  hideMainPlayer() {
    this.messageService.hideMainPlayer();
  }

  setMediaSession() {
    if ('mediaSession' in navigator) {
      console.info('mediasession supported');
      console.log(`Author: ${this.currentEpisode?.author}`);
      console.log(`feedTitle: ${this.currentEpisode?.feedTitle}`);
      navigator.mediaSession.metadata = new MediaMetadata({
          title: this.currentEpisode?.title,
          artist: this.currentEpisode?.author,
          album: this.currentEpisode?.feedTitle,
          artwork: [
              { src: this.currentEpisode!.image, sizes: '96x96', type: 'image/png' },
              { src: this.currentEpisode!.image, sizes: '128x128', type: 'image/png' },
              { src: this.currentEpisode!.image, sizes: '192x192', type: 'image/png' },
              { src: this.currentEpisode!.image, sizes: '256x256', type: 'image/png' },
              { src: this.currentEpisode!.image, sizes: '384x384', type: 'image/png' },
              { src: this.currentEpisode!.image, sizes: '512x512', type: 'image/png' }
          ]
      });

      navigator.mediaSession.setActionHandler('play', (event) => {
          console.log('In ms play');
          console.log(event);
          this.playAudio();
      });
      navigator.mediaSession.setActionHandler('pause', (event) => {
          console.log('In ms pause');
          console.log(event);
          this.pauseAudio();
      });
      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
          console.log('seek backward');
          console.log(details);
          this.currentAudio.currentTime = this.currentAudio.currentTime - (details.seekOffset || 10);
      });
      navigator.mediaSession.setActionHandler('seekforward', (details) => {
          console.log('seek forward');
          console.log(details);
          this.currentAudio.currentTime = this.currentAudio.currentTime + (details.seekOffset || 10);
      });
      // navigator.mediaSession.setActionHandler('seekto', (details) => {
      //     console.log('fast seek');
      //     console.log(details);
      //     if (details.fastSeek && 'fastSeek' in this.currentAudio) {
      //         this.currentAudio.fastSeek(details.seekTime);
      //         return;
      //     }
      //     this.currentAudio.currentTime = details.seekTime;
      // });
      // navigator.mediaSession.setActionHandler('stop', (details) => {
      //     console.log('stop');
      //     console.log(details);
      //     this.currentAudio.currentTime = 0;
      //     seekSlider.value = 0;
      //     audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
      //     currentTimeContainer.textContent = '0:00';
      //     // if(playState === 'pause') {
      //     //     playAnimation.playSegments([0, 14], true);
      //     //     cancelAnimationFrame(raf);
      //     //     playState = 'play';
      //     // }
      //     pauseButton.style.display = 'none';
      //     playButton.style.display = '';
      // });
  } else {
      console.info('mediasession not supported');
  }
  }

}
