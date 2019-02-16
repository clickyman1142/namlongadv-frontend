import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvertService } from '../../shared/advert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinner } from 'src/app/shared/services/spinner.service';
import * as moment from 'moment';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { Dialog } from 'src/app/shared/services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from 'src/app/config/app.config';
import { ProvinceService } from 'src/app/shared/services/province.service';

export const MY_FORMATS = {
  parse: {
    dateInput: AppConfig.generalConfig.dateFormat,
  },
  display: {
    dateInput: AppConfig.generalConfig.dateFormat,
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-adv-management-detail',
  templateUrl: './adv-management-detail.component.html',
  styleUrls: ['./adv-management-detail.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AdvManagementDetailComponent implements OnInit {
  advert: Advert;
  advertForm: FormGroup;
  provinces: any[];
  advertForms: any[] = [
    'Trụ pano Quảng cáo',
    'Trụ pano Quảng cáo ngoài trời',
    'Trụ pano Quảng cáo ngoài trời 1 mặt',
    'Trụ pano Quảng cáo ngoài trời 2 mặt',
    'Trụ pano Quảng cáo ngoài trời 3 mặt',
    'Trụ pano Quảng cáo ngoài trời 4 mặt',
    'Billboard Quảng cáo',
    'Billboard Quảng cáo ngoài trời',
    'Billboard Quảng cáo ngoài trời 1 mặt',
    'Billboard Quảng cáo ngoài trời 2 mặt',
    'Billboard Quảng cáo ngoài trời 3 mặt',
    'Billboard Quảng cáo ngoài trời 4 mặt',
    'Billboard ốp tường'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private advertService: AdvertService,
    private activeRoute: ActivatedRoute,
    private spinner: Spinner,
    private dialog: Dialog,
    private translate: TranslateService,
    private router: Router,
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.initFormData(null);
    this.buildForm();

    const params = this.activeRoute.snapshot.params;
    if (params.id) {
      this.spinner.show();
      this.advertService.findById(params.id).subscribe(rs => {
        this.initFormData(rs.data);
        this.buildForm();
        this.spinner.hide();
      });
    }
  }

  initFormData(data) {
    this.buildProvinceOptions();

    this.advert = {
      id: data ? data.id : '',
      code: data ? data.code : '',
      provinceCode: data ? data.provinceCode : '',
      title: data ? data.title : '',
      street: data ? data.street : 'Đường ',
      houseNo: data ? data.houseNo : 'Số ',
      ward: data ? data.ward : '',
      district: data ? data.district : '',
      province: data ? data.province : '',
      widthSize: data ? data.widthSize : 'm',
      heightSize: data ? data.heightSize : 'm',
      amount: data ? data.amount : '',
      describe: data ? data.describe : '',
      views: data ? data.views : '',
      flow: data ? data.flow : '',
      implTime: data ? data.implTime : 20,
      implForm: data ? data.implForm : 'in bạt hiflex 720 DPI',
      lightSystem: data ? data.lightSystem : '',
      ownerPhone: data ? data.ownerPhone : '',
      ownerEmail: data ? data.ownerEmail : '',
      ownerPrice: data ? data.ownerPrice : '',
      ownerContactPerson: data ? data.ownerContactPerson : '',
      ownerStartDate: data ? (data.ownerStartDate ? moment(data.ownerStartDate) : undefined) : moment(),
      ownerEndDate: data ? (data.ownerEndDate ? moment(data.ownerEndDate) : undefined) : moment(),
      ownerNote: data ? data.ownerNote : '',
      advCompPhone: data ? data.advCompPhone : '',
      advCompEmail: data ? data.advCompEmail : '',
      advCompPrice: data ? data.advCompPrice : '',
      advCompContactPerson: data ? data.advCompContactPerson : '',
      advCompName: data ? data.advCompName : '',
      advCompStartDate: data ? (data.advCompStartDate ? moment(data.advCompStartDate) : undefined) : moment(),
      advCompEndDate: data ? (data.advCompEndDate ? moment(data.advCompEndDate) : undefined) : moment(),
      advCompNote: data ? data.advCompNote : moment(),
      price: data ? data.price : 0,
      createdBy: data ? data.createdBy : 0,
      createdDate: data ? data.createdDate : 0,
      updatedDate: data ? data.updatedDate : 0,
      trash: data ? data.trash : false,
      publishedDate: data ? (data.publishedDate ? moment(data.publishedDate) : undefined) : moment(),
      publishedId: data ? data.publishedId : 0,
      type: data ? data.type : '',
      images: data ? data.images : [],
      map: data ? data.map : undefined,
      ignoreError: data ? data.ignoreError : undefined
    };
  }

  buildProvinceOptions() {
    this.provinceService.getAll().subscribe(rs => {
      this.provinces = rs.data;
    });
  }

  buildForm() {
    this.advertForm = this.formBuilder.group({
      id: this.advert.id,
      code: this.advert.code,
      provinceCode: this.advert.provinceCode,
      title: [this.advert.title, Validators.required],
      street: this.advert.street,
      houseNo: this.advert.houseNo,
      ward: this.advert.ward,
      district: this.advert.district,
      province: this.advert.province,
      widthSize: this.advert.widthSize,
      heightSize: this.advert.heightSize,
      amount: this.advert.amount,
      describe: this.advert.describe,
      views: this.advert.views,
      flow: this.advert.flow,
      implTime: this.advert.implTime,
      implForm: this.advert.implForm,
      lightSystem: this.advert.lightSystem,
      type: this.advert.type,
      ownerPhone: this.advert.ownerPhone,
      ownerEmail: [this.advert.ownerEmail, Validators.email],
      ownerPrice: this.advert.ownerPrice,
      ownerContactPerson: this.advert.ownerContactPerson,
      ownerStartDate: this.advert.ownerStartDate,
      ownerEndDate: this.advert.ownerEndDate,
      ownerNote: this.advert.ownerNote,
      advCompPhone: this.advert.advCompPhone,
      advCompEmail: [this.advert.advCompEmail, Validators.email],
      advCompPrice: this.advert.advCompPrice,
      advCompContactPerson: this.advert.advCompContactPerson,
      advCompName: this.advert.advCompName,
      advCompStartDate: this.advert.advCompStartDate,
      advCompEndDate: this.advert.advCompEndDate,
      advCompNote: this.advert.advCompNote,
      price: this.advert.price,
      createdBy: this.advert.createdBy,
      map: this.advert.map
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.advert.images, event.previousIndex, event.currentIndex);
  }

  onSave() {
    this.spinner.show();
    let formData = this.advertForm.value;
    formData = {
      ...formData,
      images: this.advert.images
    };

    const params = {
      title: 'Thông báo',
      message: ''
    };
    this.advertService.save(formData).subscribe(res => {
      this.spinner.hide();
      params.message = this.translate.instant(res.message);
      this.dialog.info(params).then(rs => {
        this.router.navigate(['/adv-management']);
      });
    }, err => {
      this.spinner.hide();
      params.message = this.translate.instant(err.error.message);
      this.dialog.confirm(params).then(rs => {
        if (rs) {
          const data = formData;
          data.ignoreError = true;
          this.advertService.save(data).subscribe(res => {
            params.message = this.translate.instant(res.message);
            this.dialog.info(params).then(r => {
              this.router.navigate(['/adv-management']);
            });
          });
        }
      });
    });
  }

  setFormValue(key: string, value: any) {
    this.advertForm.controls[key].setValue(value);
    if (key === 'provinceCode') {
      const selectedProvince = this.provinces.find(province => province.code === value);
      if (selectedProvince) {
        this.advertForm.controls['province'].setValue(selectedProvince.name);
      }
    }
  }

  get advertFormControls() {
    return this.advertForm.controls;
  }

  get form() {
      return this.advertForm;
  }
}

export interface Advert {
  id: string;
  code: string;
  provinceCode: string;
  title: string;
  street: string;
  houseNo: string;
  ward: string;
  district: string;
  province: string;
  widthSize: string;
  heightSize: string;
  amount: string;
  describe: string;
  views: string;
  flow: string;
  implTime: number;
  implForm: string;
  lightSystem: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerPrice: string;
  ownerContactPerson: string;
  ownerStartDate: any;
  ownerEndDate: any;
  ownerNote: string;
  advCompPhone: string;
  advCompEmail: string;
  advCompPrice: string;
  advCompContactPerson: string;
  advCompName: string;
  advCompStartDate: any;
  advCompEndDate: any;
  advCompNote: string;
  price: string;
  createdBy: string;
  createdDate: any;
  updatedDate: any;
  trash: boolean;
  publishedDate: any;
  publishedId: number;
  type: string;
  images: any[];
  map: File;
  ignoreError: boolean;
}
