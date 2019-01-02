import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AdvertService } from '../../shared/advert.service';
import { Spinner } from 'src/app/shared/services/spinner.service';
import { SearchForm } from 'src/app/shared/models/search-form';

@Component({
  selector: 'app-adv-management-main',
  templateUrl: './adv-management-main.component.html',
  styleUrls: ['./adv-management-main.component.scss']
})
export class AdvManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'code', 'title', 'address', 'size', 'createdDate', 'subTitle', 'contact', 'images'];
  dataSource: MatTableDataSource<any>;
  panelOpenState = false;
  pageSizeOptions = [10, 50, 100, 500, 1000, 5000, 10000];

  searchCriterias = {
    code: {
      key: 'code',
      operation: 'LIKE',
      value: ''
    },
    companyNameSearching: {
      key: 'companyNameSearching',
      operation: 'LIKE',
      value: ''
    },
    createdBy: {
      key: 'createdBy',
      operation: 'EQUALITY',
      value: ''
    },
    addressSearching: {
      key: 'addressSearching',
      operation: 'LIKE',
      value: ''
    },
    titleSearching: {
      key: 'titleSearching',
      operation: 'LIKE',
      value: ''
    },
    houseNoSearching: {
      key: 'houseNoSearching',
      operation: 'EQUALITY',
      value: ''
    },
    streetSearching: {
      key: 'streetSearching',
      operation: 'EQUALITY',
      value: ''
    },
    wardSearching: {
      key: 'wardSearching',
      operation: 'EQUALITY',
      value: ''
    },
    districtSearching: {
      key: 'districtSearching',
      operation: 'EQUALITY',
      value: ''
    },
    provinceSearching: {
      key: 'provinceSearching',
      operation: 'EQUALITY',
      value: ''
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private advertService: AdvertService,
    private spinner: Spinner
  ) {}

  ngOnInit() {
    this.paginator.pageIndex = 1;
    this.paginator.pageSize = 10;
    this.doFilter();
  }

  doFilter() {
    this.spinner.show();
    this.advertService.getAll(this.buildSearchCriteria(), this.paginator.pageIndex + 1, this.paginator.pageSize).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data.data);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    });
  }

  buildSearchCriteria() {
    return Object.keys(this.searchCriterias).filter(key => {
      return this.searchCriterias[key].value !== '';
    }).map(key => {
      return this.searchCriterias[key];
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
