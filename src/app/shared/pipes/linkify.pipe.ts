import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: string | null | undefined): SafeHtml {
        if (!value) {
            return '' as unknown as SafeHtml;
        }

        const urlRegex = /(\b(https?|ftp):\/\/[^\s]+)/gi;
        const replaced = value.replace(urlRegex, (url: string) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });

        return this.sanitizer.bypassSecurityTrustHtml(replaced);
    }
}
