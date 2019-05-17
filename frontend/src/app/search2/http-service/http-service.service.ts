
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CaseResultData, SearchData, UserResultData, ResourceResultData, SearchResultData } from './class/SearchData';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }



  searchUrl: string = '/api/search';
  searchResult:SearchResultData=new SearchResultData(testResourceData,testCaseData,testUserData)
  //查询事件（按“事件”查询）
  searchCase(searchData: SearchData) {
    if (searchData.BResourceClass == '事件') {
      return this.http.post(this.searchUrl,JSON.stringify(searchData));
      //return this.searchResult;        //测试数据
      //return this.http.post<any>(this.searchUrl, JSON.stringify(searchData));
    }

  }

  //查询人员（按“人员”查询）
  searchPeople(searchData: SearchData) {
    if (searchData.BResourceClass == '人员') {
      return this.http.post(this.searchUrl,JSON.stringify(searchData));
      //return this.searchResult;
     // return this.http.post(this.searchUrl, JSON.stringify(searchData));
    }
  }

  //查询资源（按“服务器”、“IP/域名”、"存储"、“业务系统”查询）
  searchResource(searchData: SearchData) {
    return this.http.post(this.searchUrl,JSON.stringify(searchData));
    //return this.searchResult;
    //return this.http.post(this.searchUrl, JSON.stringify(searchContent))
  }

  //查询用户类型是否为管理员
  IsAdmin() {
    // return this.http.get<Boolean>(this.searcIsLoginhUrl)
  }



  data: any = [{
    Name: '阿道夫',
    ResourceClass: '事件'
  },]
}


const testCaseData=[{
  ID:5,
  ResourceClass:'ytu',
  Name:'sadf',
  Label:['asdfas',],
  OperateName:'safewry',
  Operatetime:'aopbiv',
  Operator:'yrew',
  OperatePosition:'sadf',
  CaseDetail:'asdfads',
  RName:'dsfaoiu'
},{
  ID:5,
  ResourceClass:'ytu',
  Name:'sadf',
  Label:['asdfas'],
  OperateName:'safewry',
  Operatetime:'aopbiv',
  Operator:'sdfg',
  OperatePosition:'sadf',
  CaseDetail:'asdfads',
  RName:'dsfaoiu'
},{
  ID:5,
  ResourceClass:'ytu',
  Name:'sadf',
  Label:['asdsdgfas'],
  OperateName:'safewry',
  Operatetime:'aopbiv',
  Operator:'erwt',
  OperatePosition:'sadf',
  CaseDetail:'asdfads',
  RName:'dsfaoiu'
},]

const testUserData=[{
  Name:'xczv',
  ResourceClass:'hjkg',
  Group:['qwer'],
  Role:['sfa']
},{
  Name:'xczv',
  ResourceClass:'hjkg',
  Group:['qwer'],
  Role:['sfa']
},{
  Name:'xczv',
  ResourceClass:'hjkg',
  Group:['qwer'],
  Role:['sfa']
},{
  Name:'xczv',
  ResourceClass:'hjkg',
  Group:['qwer'],
  Role:['sfa']
},{
  Name:'xczv',
  ResourceClass:'hjkg',
  Group:['qwer'],
  Role:['sfa']
},]

 const testResourceData=[{
      ID:55,
      Name:'asdf',
      RUser:'asdf',
      RAdmin:'asdf',
      ResourceClass:'asfd',
      RLocation:'sdaf',
      RConfigure:'balabalabbbb',
      RUse:'ajhfdkjas'
  },{
      ID:4,
      Name:'asdf',
      RUser:'asdf',
      RAdmin:'asdf',
      ResourceClass:'asfd',
      RLocation:'sdaf',
      RConfigure:'balabalabbbb',
      RUse:'ajhfdkjas'
  },{
      ID:6,
      Name:'asdf',
      RUser:'asdf',
      RAdmin:'asdf',
      ResourceClass:'asfd',
      RLocation:'sdaf',
      RConfigure:'balabalabbbb',
      RUse:'ajhfdkjas'
  },]
