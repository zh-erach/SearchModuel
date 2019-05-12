import { Component, Input } from '@angular/core';
import { CaseResultData } from '../search2/http-service/SearchData'
import { HttpServiceService } from '../search2/http-service/http-service.service';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Input() input:CaseResultData

  constructor(
    private  http:HttpServiceService
  ){}

  ngOnInit(): void {
  alert(this.input.ResourceClass)
    if(this.input.ResourceClass !="事件"){
      if(this.input.ResourceClass !="人员"){
        if(this.input !=null){
          this.input.ResourceClass="资源"
        }
      }
    }
   
    this.http.searchContent(this.input).subscribe((data:any)=>{
      
    })

    

  }




















}
