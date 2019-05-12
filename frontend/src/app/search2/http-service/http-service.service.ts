import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ResultData, SearchData } from './SearchData';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }



  searchUrl: string = 'http://localhost:7080/search/page1';
  contentUrl: '';

  search(searchData: SearchData) {
    console.log(searchData.ResourceClass)
    return this.http.post<ResultData[]>(this.searchUrl, JSON.stringify(searchData));
  }

  searchContent(searchContent: ResultData) {
    return this.http.post<any>(this.contentUrl, JSON.stringify(searchContent))
  }

  data = [
    {
      Name: '阿道夫',
      Label: '服务器'
    },
    {
      Name: '小王',
      Label: '人员'
    },
    {
      Name: '主机短路',
      Label: '故障'
    },
    {
      Name: 'Ant Design Title 4',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 5',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 6',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 7',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 8',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 9',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 10',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 11',
      Label: 'a'
    },
    {
      Name: 'Ant Design Title 12',
      Label: 'a'
    },
  ];

  get<ResultData>() {
    return this.data
  }
}
