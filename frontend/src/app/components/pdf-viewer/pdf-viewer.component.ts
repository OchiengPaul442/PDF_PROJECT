import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  template: `
    <div class="pdf-container" *ngIf="pdfURL">
      <ngx-extended-pdf-viewer
        [src]="pdfURL"
        useBrowserLocale="true"
        [textLayer]="true"
        mobileFriendlyZoom="true"
        height="80vh"
        (error)="onError($event)"
      ></ngx-extended-pdf-viewer>
    </div>
  `,
})
export class PdfViewerComponent implements AfterViewInit {
  @Input() pdfURL: string = '';

  constructor() {}

  ngAfterViewInit() {
    if (!this.pdfURL) {
      console.error('No PDF URL provided to PdfViewerComponent');
    }
  }

  onError(error: any) {
    alert(
      'Failed to load PDF. If you have a downloader extension enabled, please disable it and try again.'
    );
  }
}
