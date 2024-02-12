import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-card',
  template: `
<div class="flex flex-col items-center max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
  <div class="md:flex w-full">
    <div class="md:flex-shrink-0 flex items-center justify-center">
      <img class="h-24 w-24 object-contain" src="/assets/images/pdf_image.png" [alt]="pdf.title" />
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-green-800 font-semibold truncate">
        {{ pdf.title }}
      </div>
      <p class="mt-2 text-gray-500">{{ pdf.description }}</p>
      <div class="mt-2 flex flex-col space-y-2">
        <div class="flex justify-between items-center">
          <button (click)="viewPdf.emit(pdf.fileURL)" class="text-indigo-500 hover:text-indigo-600">
            View PDF
          </button>
          <a class="text-indigo-500 hover:text-indigo-600" [href]="pdf.fileURL" target="_blank" download>
            Download PDF
          </a>
          <span class="text-gray-500">
            {{ pdf.date | date: 'd MMM yyyy' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>


  `,
})
export class ListCardComponent {
  @Input() pdf: any;
  @Output() viewPdf = new EventEmitter<string>();
}
