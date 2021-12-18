import { Epic } from '@state';

export interface EpicDialogData {
  case: 'add' | 'edit';
  epic?: Epic;
}

export interface EpicDialogResult {
  ok: boolean;
  epic: Epic | undefined;
}
