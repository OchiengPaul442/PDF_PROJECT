import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formData: FormGroup;
  isLoading = false;
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;
  private readonly ALLOWED_FILE_TYPE = 'application/pdf';
  API_URL = environment.BASE_API_URL;
  selectedFileName: string | null = null;
  previewImage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.formData = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      file: new FormControl('', Validators.required),
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      if (
        file.type === this.ALLOWED_FILE_TYPE &&
        file.size <= this.MAX_FILE_SIZE
      ) {
        this.formData.patchValue({ file });
        this.selectedFileName = file.name;
        this.previewImage = 'assets/images/pdf_image.png';
      } else {
        alert(
          `File must be a ${this.ALLOWED_FILE_TYPE} and less than ${
            this.MAX_FILE_SIZE / (1024 * 1024)
          }MB`
        );
      }
    } else {
      this.selectedFileName = null;
      this.previewImage = null;
    }
  }

  onSubmit() {
    if (this.formData.valid) {
      this.isLoading = true;
      const { title, description, file } = this.formData.value;
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file, file.name);

      this.uploadPdf(formData).subscribe(
        () => {
          this.isLoading = false;
          this.formData.reset();
          this.selectedFileName = null;
          this.previewImage = null;
          alert('File uploaded successfully');
          setTimeout(() => {
            this.router.navigate(['/list-pdfs']);
          }, 1500);
        },
        (error) => {
          console.error(error);
          alert('File upload failed');
          this.isLoading = false;
        }
      );
    }
  }

  uploadPdf(formData: FormData) {
    const httpOptions = {
      withCredentials: true,
    };
    return this.http.post(`${this.API_URL}/upload`, formData, httpOptions);
  }
}
