import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-pdfs',
  templateUrl: './list-pdfs.component.html',
  styleUrls: ['./list-pdfs.component.scss'],
})
export class ListPdfsComponent implements OnInit {
  pdfs: any;
  selectedPdf: string = '';
  isLoading: boolean = false;
  API_URL = environment.BASE_API_URL;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPdfs();
  }

  onViewPdf(pdfUrl: string) {
    this.selectedPdf = pdfUrl;
  }


  // TODO: Delete method
  
  getPdfs() {
    this.isLoading = true;
    this.http.get(`${this.API_URL}/view`).subscribe(
      (response) => {
        this.pdfs = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching PDFs:', error.message);
        alert('Failed to fetch PDFs. Please try again.');
        this.isLoading = false;
      }
    );
  }
}
