import { User } from './../../../components/user/user.model';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type


// TODO: replace this with real data from your application
const EXAMPLE_DATA: User[] = [
  {id: 1, name: 'Hydrogen',username:'operador'},
  {id: 2, name: 'Helium',username:'operador'},
  {id: 3, name: 'Lithium',username:'operador'},
  {id: 4, name: 'Beryllium',username:'operador'},
  {id: 5, name: 'Boron',username:'operador'},
  {id: 6, name: 'Carbon',username:'operador'},
  {id: 7, name: 'Nitrogen',username:'operador'},
  {id: 8, name: 'Oxygen',username:'operador'},
  {id: 9, name: 'Fluorine',username:'operador'},
  {id: 10, name: 'Neon',username:'operador'},
  {id: 11, name: 'Sodium',username:'operador'},
  {id: 12, name: 'Magnesium',username:'operador'},
  {id: 13, name: 'Aluminum',username:'operador'},
  {id: 14, name: 'Silicon',username:'operador'},
  {id: 15, name: 'Phosphorus',username:'operador'},
  {id: 16, name: 'Sulfur',username:'operador'},
  {id: 17, name: 'Chlorine',username:'operador'},
  {id: 18, name: 'Argon',username:'operador'},
  {id: 19, name: 'Potassium',username:'operador'},
  {id: 20, name: 'Calcium',username:'operador'},
];

/**
 * Data source for the UserRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserRead2DataSource extends DataSource<User> {
  data: User[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
