import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CaseResultData, SearchData, UserResultData,ResourceResultData } from './SearchData';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }



  searchUrl: string = 'http://localhost:7080/search/page1';

  //查询事件（按“事件”查询）
  searchCase(searchData: SearchData) {
    console.log(searchData.ResourceClass)
    if (searchData.ResourceClass == '事件') {
      return this.http.post<CaseResultData[]>(this.searchUrl, JSON.stringify(searchData));
    }

  }

  //查询人员（按“人员”查询）
  searchPeople(searchData: SearchData) {
    if (searchData.ResourceClass == '人员') {
      return this.http.post<UserResultData[]>(this.searchUrl, JSON.stringify(searchData));
    }
  }

  
  searchContent(searchContent: SearchData) {
    return this.http.post<CaseResultData[]>(this.searchUrl, JSON.stringify(searchContent))
  }

  //查询资源（按“服务器”、“IP/域名”、"存储"、“业务系统”查询）
  searchResource(searchContent: SearchData){
    return this.http.post<ResourceResultData[]>(this.searchUrl, JSON.stringify(searchContent))
  }

  data: any = [ {
    Name: '阿道夫',
    Label: ['服务器', ''],
    ResourceClass: '事件'
  },
  {
    Name: '小王',
    Label: ['人员', '']
  },
  {
    Name: '主机短路',
    Label: ['故障', '感染']
  },
  {
    Name: 'Ant Design Title 4',
    Label: ['a', '']
  },
  {
    Name: 'Ant Design Title 5',
    Label: ['a']
  },
  {
    Name: 'Ant Design Title 6',
    Label: ['a']
  },
  {
    Name: 'Ant Design Title 7',
    Label: ['a']
  }];
 

  get<CaseResultData>() {
    return this.data
  }
}
