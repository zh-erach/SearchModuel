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

  data = [
    {
      Name: '阿道夫',
      Label:'服务器'
    },
    {
      Name: '小王',
      Label:'人员'
    },
    {
      Name: '主机短路',
      Label:'故障'
    },
    {
      Name: 'Ant Design Title 4',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 5',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 6',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 7',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 8',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 9',
      Label:'a'
    }, 
    {
      Name: 'Ant Design Title 10',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 11',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 12',
      Label:'a'
    },
  ];

  get<ResultData>(){
    return this.data
  }
}
