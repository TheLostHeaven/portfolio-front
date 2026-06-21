import { Component, OnDestroy, afterNextRender, ChangeDetectorRef, inject } from '@angular/core';
import packageJson from '../../../package.json';

interface MatrixColumn {
  chars: string[];
  opacities: number[];
}

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  appVersion = packageJson.version;
  matrixColumns: MatrixColumn[] = [];
  currentDate = '';
  currentTime = '';
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private clockIntervalId: ReturnType<typeof setInterval> | null = null;
  private readonly charCount = 60;
  private readonly columnCount = 3;

  private readonly matrixChars =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
    '0123456789ABCDEF' +
    '⊘△⊙▽◁⊕▷';

  constructor() {
    this.initColumns();

    afterNextRender(() => {
      this.updateClock();
      this.cdr.detectChanges();

      this.intervalId = setInterval(() => {
        this.updateColumns();
        this.cdr.detectChanges();
      }, 400);

      this.clockIntervalId = setInterval(() => {
        this.updateClock();
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
  }

  private initColumns(): void {
    for (let c = 0; c < this.columnCount; c++) {
      const chars: string[] = [];
      const opacities: number[] = [];
      for (let i = 0; i < this.charCount; i++) {
        chars.push(this.randomChar());
        opacities.push(Math.random() * 0.5);
      }
      this.matrixColumns.push({ chars, opacities });
    }
  }

  private updateColumns(): void {
    for (const col of this.matrixColumns) {
      col.chars.pop();
      col.chars.unshift(this.randomChar());

      col.opacities.pop();
      col.opacities.unshift(1);
      for (let i = 1; i < col.opacities.length; i++) {
        col.opacities[i] = Math.max(0.05, col.opacities[i] - 0.03);
      }
    }
  }

  private randomChar(): string {
    return this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
  }

  private updateClock(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
}
