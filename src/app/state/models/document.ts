import { Epic } from './epic';
import { Label } from './label';
import { Asset } from './asset';

export interface Document extends DocumentList {
  assets: Asset[];
  references: DocumentReference[];
}

export interface DocumentList {
  id: number;
  title: string;
  description: string;
  created: string;
  lastUpdated: string;
  epic: Epic;
  labels: Label[];
}

export interface DocumentLink {
  id: number;
  title: string;
  assets: Asset[];
}

export interface DocumentReference {
  targetDocument: DocumentLink;
  referenceType: DocumentReferenceType;
}

export enum DocumentReferenceType {
  MENTION = 'MENTION',
  RELATED = 'RELATED'
}
