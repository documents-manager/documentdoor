import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DocumentTableItem {
  id: number;
  title: string;
  epic: string;
  label: string,
  lastupdated: string,
  created: string,
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DocumentTableItem[] = [
  {id: 1, title: 'Rechnung Fahrrad', epic: 'Rechnung', label: 'Label', lastupdated: '05.01.2022', created: '05.01.2022'},
  {id: 2, title: 'Rechnung Auto', epic: 'Rechnung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 3, title: 'Rechnung Haus', epic: 'Rechnung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 4, title: 'Rechnung Strom', epic: 'Rechnung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 5, title: 'Rechnung PC', epic: 'Rechnung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 6, title: 'Vorlesung Mathe', epic: 'Vorlesung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 7, title: 'Vorlesung Deutsch', epic: 'Vorlesung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 8, title: 'Vorlesung Englisch', epic: 'Vorlesung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 9, title: 'Vorlesung Spanisch', epic: 'Vorlesung', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 10, title: 'Urkunde Bundesjugendspiele', epic: 'Urkunde', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 11, title: 'Urkunde Kindergarten', epic: 'Urkunde', label: 'Label', lastupdated: '01.01.2022', created: '01.01.2022'},
  {id: 12, title: 'Urkunde Feuerwehr', epic: 'Urkunde', label: 'Label', lastupdated: '01.01.2021', created: '01.01.2021'},
];

/**
 * Data source for the DocumentTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DocumentTableDataSource extends DataSource<DocumentTableItem> {
  data: DocumentTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DocumentTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DocumentTableItem[]): DocumentTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DocumentTableItem[]): DocumentTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'epic': return compare(a.epic, b.epic, isAsc);
        case 'label': return compare(a.label, b.label, isAsc);
        case 'lastupdated': return compare(a.lastupdated, b.lastupdated, isAsc);
        case 'created': return compare(a.created, b.created, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
