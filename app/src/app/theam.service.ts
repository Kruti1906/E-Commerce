// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  [x: string]: any;
  private isDarkTheme: boolean = false;
  darkMode$: any;

  constructor() {
    this.loadTheme(); // Load saved theme on initialization
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const themeClass = this.isDarkTheme ? 'dark-theme' : '';
    document.documentElement.className = themeClass;
    localStorage.setItem('theme', themeClass); // Save theme preference
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.className = savedTheme;
      this.isDarkTheme = savedTheme === 'dark-theme';
    }
  }

  isDarkMode(): boolean {
    return this.isDarkTheme;
  }
}
