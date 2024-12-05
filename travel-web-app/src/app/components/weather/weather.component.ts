import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interfaces/weather';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  protected weather?: Weather
  protected isDismissed: boolean = false;
  constructor(weatherService: WeatherService) {
    weatherService.getWeather().subscribe((weather) => {
      this.weather = weather;
    })
  }

  dismissWidget() {
    this.isDismissed = true;
  }
}
