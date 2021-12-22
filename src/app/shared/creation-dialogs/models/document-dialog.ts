import { Document } from '@state';

export interface DocumentDialogResult {
  ok: boolean;
  epic: Document | undefined;
}
