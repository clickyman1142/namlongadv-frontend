import { PageRequest } from './page-request';

export interface AdvertSearchForm {
    code: string;
    address: string;
    createdBy: string;
    contactPerson: string;
    houseNo: string;
    street: string;
    ward: string;
    district: string;
    provinceCode: string;
    title: string;
    from: string;
    to: string;
    pageRequestDTO: PageRequest;
    roles: string[];
}
