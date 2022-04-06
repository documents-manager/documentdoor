import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Document, Epic, Label } from '@state';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormFactoryService } from '../../../state/services/form-factory.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentEditComponent implements OnInit, OnChanges {
  @Input() epics!: Epic[];
  @Input() labels!: Label[];
  @Input() document: Document | null = null;
  form!: FormGroup;
  references!: FormArray;
  assets!: FormArray;
  selectedLabels: Label[] = [];
  selectedEpic: Epic | undefined = undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredEpics$!: Observable<Epic[]>;
  filteredLabels$!: Observable<Label[]>;

  deleteUri = environment.serverConfig.root + '/staging';
  uploadUri = environment.serverConfig.root + '/staging';
  getUri: string | undefined = undefined;

  @ViewChild('epicInput') epicInput!: ElementRef<HTMLInputElement>;
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;

  constructor(private formFactory: FormFactoryService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();

    if (this.document) {
      this.getUri = environment.serverConfig.root + '/documents/' + this.document?.id + '/assets/';
    }

    this.filteredEpics$ = this.form.get('epic')!.valueChanges.pipe(
      startWith(null),
      map(value => this._filterEpics(typeof value === 'string' ? value : value?.name))
    );
    this.filteredLabels$ = this.form.get('label')!.valueChanges.pipe(
      startWith(null),
      debounceTime(10),
      map(label => this._filterLabels(typeof label === 'string' ? label : label?.name))
    );
    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.document) {
      this.ngOnInit();
    }
  }

  createDocumentDto() {
    const { label, ...rest } = this.form.value;
    return {
      ...this.document,
      ...rest,
      epic: this.selectedEpic,
      labels: this.selectedLabels
    };
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
      return this.epics;
    }
    const filterValue = value.toLowerCase();

    const epic = this._findEpic(value);
    if (epic) {
      this.setEpic(value);
    }

    return this.epics.filter(epic => this._epicMatches(epic, filterValue));
  }

  private _filterLabels(value: string | null): Label[] {
    const filterValue = value?.toLowerCase() ?? '';

    return this.labels.filter(label => this._labelMatches(label, filterValue));
  }

  private _labelMatches(label: Label, filterValue: string): boolean {
    return !this.selectedLabels.map(l => l.name).includes(label.name) && label.name.toLowerCase().includes(filterValue);
  }

  private _findEpic(name: string): Epic | undefined {
    return this.epics.find(epic => epic.name === name);
  }

  private _findLabel(name: string): Label | undefined {
    return this.labels.find(label => label.name === name);
  }

  private _epicMatches(epic: Epic, filterValue: string) {
    return epic.name.includes(filterValue);
  }

  private initForm() {
    this.form = this.formFactory.buildDocumentForm(this.document);
    this.references = this.form.get('references') as FormArray;
    this.assets = this.form.get('assets') as FormArray;
    this.selectedEpic = this.document?.epic ?? undefined;
    this.selectedLabels = this.document?.labels ?? [];
  }
}
