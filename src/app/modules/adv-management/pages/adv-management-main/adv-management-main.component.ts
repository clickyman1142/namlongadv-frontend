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
  totalOfPages = 0;
  Object = Object;

  searchCriterias = {
    code: {
      key: 'code',
      operation: 'LIKE',
      value: '',
      title: 'Mã'
    },
    advCompNameSearching: {
      key: 'advCompNameSearching',
      operation: 'LIKE',
      value: '',
      title: 'Tên công ty'
    },
    createdBy: {
      key: 'createdBy',
      operation: 'EQUALITY',
      value: '',
      title: 'Người tạo'
    },
    addressSearching: {
      key: 'addressSearching',
      operation: 'LIKE',
      value: ''
    },
    titleSearching: {
      key: 'titleSearching',
      operation: 'LIKE',
      value: '',
      title: 'Tiêu đề'
    },
    houseNoSearching: {
      key: 'houseNoSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Số nhà'
    },
    streetSearching: {
      key: 'streetSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Tên đường'
    },
    wardSearching: {
      key: 'wardSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Phường'
    },
    districtSearching: {
      key: 'districtSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Quận'
    },
    provinceSearching: {
      key: 'provinceSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Tỉnh'
    },
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private advertService: AdvertService,
    private spinner: Spinner
  ) {}

  ngOnInit() {
    this.buildDataTable(true);
  }

  buildDataTable(initPaginator?: boolean) {
    const page = this.paginator.pageIndex ? this.paginator.pageIndex : 0;
    const size = this.paginator.pageSize ? this.paginator.pageSize : 10;
    this.spinner.show();
    this.advertService.getAll(this.buildSearchCriteria(), page + 1, size).subscribe(res => {
      this.totalOfPages = res.data.count;
      this.dataSource = new MatTableDataSource<any>(res.data.data);
      if (initPaginator) {
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
      }
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
