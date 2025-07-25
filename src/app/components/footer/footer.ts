import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true
})
export class Footer implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  localTime: string = '';
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
      this.cdr.detectChanges(); // 👈 Forzar Angular a actualizar la vista
    }, 1000);
  }

updateTime(): void {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Lima' 
  };
  this.localTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
}

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
