import { Component } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Media } from '../../interfaces/media';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  protected media: Media = {
    eventImages: [],
    roomImages: [],
    videos: []
  };

  constructor(mediaService: MediaService, protected sanitizer: DomSanitizer) {
    mediaService.getAllEvents().subscribe((media) => {
      this.media = media;
    })
  }
}
