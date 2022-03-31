import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormArray, FormControl } from '@angular/forms';
import { Asset } from '@state';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() requiredFileType: string | undefined;
  @Input() uploadUri: string = '';
  @Input() deleteUri: string = '';
  @Input() files!: FormArray;
  uploadProgress: Map<string, number | undefined> = new Map<string, number | undefined>();
  uploadSub: Map<string, Subscription | undefined> = new Map<string, Subscription | undefined>([]);

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {}

  onFileSelected(event: { total: number; target: { files: File[] } }) {
    for (let file of event.target.files) {
      if (file) {
        const formData = new FormData();
        formData.append('filename', file.name);
        formData.append('mimetype', 'text/plain');
        formData.append('file', file);

        const upload$ = this.http
          .post(this.uploadUri, formData, {
            reportProgress: true,
            observe: 'events'
          })
          .pipe(finalize(() => this.finalizeUpload(file.name)));

        const sub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            const progress = Math.round(100 * (event.loaded / event.total));
            this.uploadProgress.set(file.name, progress);
            this.changeDetectorRef.detectChanges();
          }
          if (event.type === HttpEventType.Response) {
            const body = event.body as Asset;
            this.addFormControl(body);
          }
        });

        this.uploadSub.set(file.name, sub);
      }
    }
  }

  deleteFile(file: string) {
    const fileId = this.files.controls.find(control => control.value?.fileName === file);

    this.http.delete(this.deleteUri + '/' + fileId).subscribe();
  }

  cancelUpload(file: string, removeFromBackend: boolean) {
    if (removeFromBackend) {
      this.deleteFile(file);
    } else {
      this.uploadSub.get(file)?.unsubscribe();
    }

    this.reset(file);
  }

  reset(name: string) {
    this.uploadProgress.delete(name);
    this.uploadSub.delete(name);
    const controlIndex = this.files.controls.findIndex(control => control.value?.fileName === name);

    if (controlIndex !== -1) {
      this.files.removeAt(controlIndex);
    }
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {}

  finalizeUpload(name: string) {
    this.uploadProgress.set(name, 100);
    this.changeDetectorRef.detectChanges();
  }

  private addFormControl(asset: Asset) {
    const control = new FormControl(asset);
    this.files.push(control);
    this.files.updateValueAndValidity();
    this.changeDetectorRef.detectChanges();
  }
}
