import { Document, Epic, Label } from '@state';

export interface DocumentDialogResult {
  ok: boolean;
  document: Document | undefined;
}

export interface DocumentDialogData {
  labels: Label[];
  epics: Epic[];
}
