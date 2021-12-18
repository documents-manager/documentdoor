import { Label } from '@state';

export interface LabelDialogData {
  case: 'add' | 'edit';
  label?: Label;
}

export interface LabelDialogResult {
  ok: boolean;
  label: Label | undefined;
}
