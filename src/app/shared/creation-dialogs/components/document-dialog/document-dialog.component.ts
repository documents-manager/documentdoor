import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentDialogData, DocumentDialogResult } from '../../models/document-dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Epic, Label } from '@state';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDialogComponent implements OnInit {
  form: FormGroup;
  references: FormArray;
  selectedLabels: Label[] = [];
  selectedEpic: Epic | undefined = undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredEpics$!: Observable<Epic[]>;
  filteredLabels$!: Observable<Label[]>;

  deleteUri = environment.serverConfig.root + '/staging';
  uploadUri = environment.serverConfig.root + '/staging';

  @ViewChild('epicInput') epicInput!: ElementRef<HTMLInputElement>;
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<DocumentDialogComponent, DocumentDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: DocumentDialogData,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {
    this.references = this.fb.array([]);
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      label: [''],
      epic: [''],
      references: this.references
    });
  }

  ngOnInit(): void {
    this.filteredEpics$ = this.form.get('epic')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterEpics(typeof value === 'string' ? value : value?.name))
    );
    this.filteredLabels$ = this.form.get('label')!.valueChanges.pipe(
      startWith(''),
      debounceTime(10),
      map(label => this._filterLabels(typeof label === 'string' ? label : label?.name))
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveClick() {
    const data = this.form.value;
    this.dialogRef.close(data);
  }

  hasRequiredError(key: string) {
    const control = this.form.get(key);
    return control?.invalid && control?.errors?.required;
  }

  removeEpic(): void {
    this.epicInput.nativeElement.value = '';
    this.form.get('epic')!.reset();
    this.form.get('epic')!.enable();
    this.selectedEpic = undefined;
  }

  setEpic(name: string) {
    this.selectedEpic = this._findEpic(name);
    this.epicInput.nativeElement.value = '';
    this.form.get('epic')!.reset();
    this.form.get('epic')!.disable();
  }

  removeLabel(label: Label): void {
    const index = this.selectedLabels.map(label => label.name).indexOf(label.name);

    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    }
  }

  selectLabel(event: MatAutocompleteSelectedEvent) {
    const label = this._findLabel(event.option.viewValue);

    if (label) {
      this.selectedLabels.push(label);
      this.labelInput.nativeElement.value = '';
      this.form.get('label')!.setValue(null);
    }
  }

  selectEpic(event: MatAutocompleteSelectedEvent) {
    this.selectedEpic = this._findEpic(event.option.viewValue);
    this.epicInput.nativeElement.value = '';
    this.form.get('epic')!.setValue(null);
  }

  private _filterEpics(value: string): Epic[] {
    if (!value) {
      return this.data.epics;
    }
    const filterValue = value.toLowerCase();

    const epic = this._findEpic(value);
    if (epic) {
      this.setEpic(value);
    }

    return this.data.epics.filter(epic => this._epicMatches(epic, filterValue));
  }

  private _filterLabels(value: string | null): Label[] {
    const filterValue = value?.toLowerCase() ?? '';

    return this.data.labels.filter(label => this._labelMatches(label, filterValue));
  }

  private _labelMatches(label: Label, filterValue: string): boolean {
    return !this.selectedLabels.map(label => label.name).includes(label.name) && label.name.toLowerCase().includes(filterValue);
  }

  private _findEpic(name: string): Epic | undefined {
    return this.data.epics.find(epic => epic.name === name);
  }

  private _findLabel(name: string): Label | undefined {
    return this.data.labels.find(label => label.name === name);
  }

  private _epicMatches(epic: Epic, filterValue: string) {
    return epic.name.includes(filterValue);
  }
}
