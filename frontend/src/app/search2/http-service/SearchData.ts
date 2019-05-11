export class SearchData {
    constructor(
        public ResourceClass:string ,
        public KeyWord:string
    ){}
}

export class ResultData{
    constructor(
        public Name:string,
        public Label:string 
    ){}
}

export class PushData{
    constructor(
        public ResourceClass:string ,
        public KeyWord:string,
        public Token:string
    ){}
}