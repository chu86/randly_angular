import { Injectable } from '@angular/core';

export interface ToastMessage {
  id: number;
  text: string;
  variant?: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastMessage[] = [];
  private idCounter = 0;

  show(text: string, variant: ToastMessage['variant'] = 'success', durationMs = 2000) {
    const id = ++this.idCounter;
    const toast: ToastMessage = { id, text, variant };
    this.toasts.push(toast);

    setTimeout(() => {
      this.remove(id);
    }, durationMs);
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  clear() {
    this.toasts = [];
  }
}
