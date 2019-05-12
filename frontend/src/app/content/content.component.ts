import { Component, Input } from '@angular/core';
import { ResultData } from '../search2/http-service/SearchData'
import { HttpServiceService } from '../search2/http-service/http-service.service';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Input() input:ResultData

  constructor(
    private  http:HttpServiceService
  ){}

  ngOnInit(): void {
   //在初始化视图的时候，传回要查看选项的信息，得到详细信息和相关资源用于完成初始化视图
    this.http.searchContent(this.input).subscribe((data:any)=>{

    })
  }



















  
}
