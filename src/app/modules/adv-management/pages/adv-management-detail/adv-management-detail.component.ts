import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adv-management-detail',
  templateUrl: './adv-management-detail.component.html',
  styleUrls: ['./adv-management-detail.component.scss']
})
export class AdvManagementDetailComponent implements OnInit {
  advert: Advert;
  advertForm: FormGroup;
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith'
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.advert = {
      id: '',
      code: '',
      provinceCode: '',
      title: '',
      street: 'Đường ',
      houseNo: 'Số ',
      ward: '',
      district: '',
      province: '',
      widthSize: 'm',
      heightSize: 'm',
      amount: '',
      describe: '',
      views: '',
      flow: '',
      implTime: 20,
      implForm: 'in bạt hiflex 720 DPI',
      lightSystem: '',
      ownerPhone: '',
      ownerEmail: '',
      ownerPrice: '',
      ownerContactPerson: '',
      ownerStartDate: 132434,
      ownerEndDate: 1234,
      ownerNote: '',
      advCompPhone: '',
      advCompEmail: '',
      advCompPrice: '',
      advCompContactPerson: '',
      advCompName: '',
      advCompStartDate: 123434,
      advCompEndDate: 123434,
      advCompNote: '',
      price: '',
      createdBy: '',
      createdDate: 134433,
      updatedDate: 234234,
      trash: false,
      publishedDate: 123434,
      publishedId: 132434,
      type: '',
      images: [],
      prevImages: [],
      map: undefined,
      ignoreError: false
    };
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.advertForm = this.formBuilder.group({
      id: this.advert.id,
      code: this.advert.code,
      provinceCode: this.advert.provinceCode,
      title: this.advert.title,
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
      ownerEmail: this.advert.ownerEmail,
      ownerPrice: this.advert.ownerPrice,
      ownerContactPerson: this.advert.ownerContactPerson,
      ownerStartDate: this.advert.ownerStartDate,
      ownerEndDate: this.advert.ownerEndDate,
      ownerNote: this.advert.ownerNote,
      advCompPhone: this.advert.advCompPhone,
      advCompEmail: this.advert.advCompEmail,
      advCompPrice: this.advert.advCompPrice,
      advCompContactPerson: this.advert.advCompContactPerson,
      advCompName: this.advert.advCompName,
      advCompStartDate: this.advert.advCompStartDate,
      advCompEndDate: this.advert.advCompEndDate,
      advCompNote: this.advert.advCompNote,
      price: this.advert.price,
      createdBy: this.advert.createdBy,
      images: [],
      prevImages: [],
      map: undefined
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  onSave() {
    console.log(this.advertForm.value);
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
  ownerStartDate: number;
  ownerEndDate: number;
  ownerNote: string;
  advCompPhone: string;
  advCompEmail: string;
  advCompPrice: string;
  advCompContactPerson: string;
  advCompName: string;
  advCompStartDate: number;
  advCompEndDate: number;
  advCompNote: string;
  price: string;
  createdBy: string;
  createdDate: number;
  updatedDate: number;
  trash: boolean;
  publishedDate: number;
  publishedId: number;
  type: string;
  images: File[];
  prevImages: string[];
  map: File;
  ignoreError: boolean;
}
