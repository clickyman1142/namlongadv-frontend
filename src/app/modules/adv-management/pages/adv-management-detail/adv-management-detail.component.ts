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
import { AddressConflictDialogComponent } from '../../components/address-conflict-dialog/address-conflict-dialog.component';
import { CompareDialogComponent } from '../../components/compare-dialog/compare-dialog.component';

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
  advertHistory: any[];
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
      this.advertService.findById(params.id).subscribe(async rs => {
        this.initFormData(rs.data);
        this.buildForm();
        this.advertHistory = await this.initAdvertHistory(params.id);
        this.spinner.hide();
      });
    }
  }

  initAdvertHistory(advId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.advertService.getChangeHistory(advId).subscribe(rs => {
        resolve(rs);
      });
    });
  }

  initFormData(data) {
    this.buildProvinceOptions();

    const map = data ? data.images.filter(image => image.map) : [];

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
      images: data ? data.images.filter(image => !image.map) : [],
      map: data ? (map.length > 0 ? map[0] : undefined) : undefined,
      coordinates: data ? data.coordinates : '',
      ignoreError: data ? data.ignoreError : undefined,
      imageMeta: []
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
      coordinates: this.advert.coordinates
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
      images: this.advert.images,
      map: this.advert.map,
      imageMetadata: this.advert.imageMeta
    };

    const params = {
      width: '400px',
      data: {
        title: this.translate.instant('common.info'),
        message: '',
        conflictedList: []
      }
    };
    this.advertService.save(formData).subscribe(res => {
      this.spinner.hide();
      params.data.message = this.translate.instant(res.message);
      if (res.message !== 'advert.address_conflict_confirm') {
        this.dialog.info(params.data).then(rs => {
          this.router.navigate(['/adv-management']);
        });
      } else {
        params.data.conflictedList = res.data;
        this.dialog.openCustomDialog(AddressConflictDialogComponent, params).then(confirm => {
          if (confirm) {
            const data = formData;
            data.ignoreError = true;
            this.advertService.save(data).subscribe(rs => {
              params.data.message = this.translate.instant(rs.message);
              this.dialog.info(params.data).then(r => {
                this.router.navigate(['/adv-management']);
              });
            });
          }
        });
      }
    }, err => {
      console.log('Error', err);
    });
  }

  setFormValue(key: string, value: any) {
    this.advertForm.controls[key].setValue(value);
    if (key === 'provinceCode') {
      const selectedProvince = this.provinces.find(province => province.code === value);
      if (selectedProvince) {
        this.advertForm.controls.province.setValue(selectedProvince.name);
      }
    }
  }

  get advertFormControls() {
    return this.advertForm.controls;
  }

  get form() {
    return this.advertForm;
  }

  async changeImages(event, index) {
    if (index !== -1) { // Map
      this.advert.images[index].file = event.target.files[0];
      const url = await this.getFileURL(event.target.files[0]);
      this.advert.images[index].url = url;
    } else {
      this.advert.images = [];
      for (const file of event.target.files) {
        const url = await this.getFileURL(file);
        this.advert.images.push({ file, url, selected: false });
      }
    }
  }

  async changeMap(event) {
    const url = await this.getFileURL(event.target.files[0]);
    this.advert.map = { file: event.target.files[0], url };
  }

  getFileURL(image: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        return resolve(reader.result);
      };
    });
  }

  removeImage(index) {
    this.advert.images.splice(index, 1);
  }

  openHistory() {
    this.dialog.openCustomDialog(CompareDialogComponent, {
      width: '90%',
      data: this.advertHistory
    });
  }

  publish() {
    const location = this.advertForm.controls.coordinates.value.split(', ');
    const lat = location[0];
    const lng = location[1];

    let detail = '<p>Vị trí: ' + this.advertForm.controls.houseNo.value + ', ' + this.advertForm.controls.street.value
      + ', ' + this.advertForm.controls.ward.value + ', ' + this.advertForm.controls.district.value
      + ', ' + this.advertForm.controls.province.value + '</p>';
    detail += '<p>Loại hình: ' + this.advertForm.controls.type.value + '</p>';
    detail += '<p>Tầm nhìn: ' + this.advertForm.controls.views.value + '</p>';
    detail += '<p>Kích thước: ' + this.advertForm.controls.heightSize.value + ' x ' + this.advertForm.controls.widthSize.value + '</p>';
    detail += '<p>Mật độ: ' + this.advertForm.controls.flow.value + ' người/ngày</p>';
    detail += '<p>Hình thức thực hiện: ' + this.advertForm.controls.implForm.value + '</p>';
    detail += '<p>Hệ thống chiếu sáng: ' + this.advertForm.controls.lightSystem.value + '</p>';
    detail += '<p>Tình trạng: Đang chào bán</p>';
    detail += '<p>Đơn giá: Liên hệ để biết giá</p>';
    detail += '<br/><br/>' + this.advertForm.controls.describe.value;

    let published = '<p>Vị trí: ' + this.advertForm.controls.houseNo.value + ', '
      + this.advertForm.controls.street.value
      + ', ' + this.advertForm.controls.ward.value + ', '
      + this.advertForm.controls.district.value
      + ', ' + this.advertForm.controls.province.value + '</p>';
    published += '<p>Loại hình: ' + this.advertForm.controls.type.value + '</p>';

    const data = {
      title: this.advertForm.controls.title.value + ' - ' + this.advert.code,
      price: this.advertForm.controls.price.value,
      description: '',
      published: 0,
      ordering: 0,
      lat,
      long: lng,
      detail,
      image3: undefined
    };

    // Prepare images to publish
    // Map
    if (this.advert.map) {
      data.image3 = 'http://namlongadv.ddns.net:7070' + this.advert.map.url;
    } else {
      data.image3 = undefined;
    }

    this.advert.images.forEach((image, index) => {
      data['image' + index] = 'http://namlongadv.ddns.net:7070' + image.url;
    });

    console.log(data);
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
  map: any;
  coordinates: any;
  ignoreError: boolean;
  imageMeta: ImageMeta[];
}

export interface ImageMeta {
  weight: number;
  selected: boolean;
}
