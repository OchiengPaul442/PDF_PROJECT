import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-card',
  template: `
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"
    >
      <div class="md:flex">
        <div class="md:flex-shrink-0 flex items-center">
          <img
            class="h-24 w-24 object-contain mx-auto"
            src="/assets/images/pdf_image.png"
            [alt]="pdf.title"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-green-800 font-semibold text-wrap"
          >
            {{ pdf.title }}
          </div>
          <p class="mt-2 text-gray-500">{{ pdf.description }}</p>
          <div class="mt-2">
            <button
              (click)="viewPdf.emit(pdf.fileURL)"
              class="text-indigo-500 hover:text-indigo-600"
            >
              View PDF
            </button>
            <button
              (click)="deletePdf.emit(pdf._id)"
              class="text-red-500 hover:text-red-600 ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ListCardComponent {
  @Input() pdf: any;
  @Output() viewPdf = new EventEmitter<string>();
  @Output() deletePdf = new EventEmitter<string>();
}
