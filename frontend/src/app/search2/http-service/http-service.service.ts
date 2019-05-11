import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ResultData, SearchData, PushData } from './SearchData';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http:HttpClient) { }

  
  
  url:'';

  pushData:PushData

  search(searchData:SearchData){
    this.pushData = new PushData(searchData.ResourceClass,searchData.KeyWord,localStorage.getItem('jwt'))
    return this.http.post<ResultData[]>(this.url,JSON.stringify(searchData));
  }
}
