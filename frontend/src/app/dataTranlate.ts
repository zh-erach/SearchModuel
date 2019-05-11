import { Injectable } from '@angular/core';
import { ResultData } from './search2/http-service/SearchData';

@Injectable({
    providedIn:'root'
})

export class DataTranslateService{
    data:ResultData
}