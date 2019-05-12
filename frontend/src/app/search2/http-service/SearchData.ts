//点解搜索按钮后传的数据
export class SearchData {
    constructor(
        public ResourceClass:string ,
        public KeyWord:string
    ){}
}

//点击搜索按钮后得到的结果数据（数组），也用作点击具体选项的传递数据（单个）
export class ResultData{
    constructor(    
        public ID:Number,
        public ResourceClass:string,
        public Name:string,
        public Label:string 
    ){}
}

//接收的详细信息和相关资源
export class Detail{
    constructor(

    ){}
}
