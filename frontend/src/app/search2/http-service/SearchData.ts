//点解搜索按钮后传的数据
export class SearchData {
    constructor(
        public BResourceClass: string, //只有资源、事件、人员
        public SResourceClass: string, //物理服务器、维护
        public KeyWord: string
    ) { }
  }
  
  //点击搜索按钮后得到的结果数据（数组），也用作"点击具体选项"的传递数据（单个）--事件结构数据
  export class CaseResultData {
    constructor(
        public ID: Number,
        public ResourceClass: string,
        public Name: string,
        public Label: string[],
  
        public OperateName: string, //例如故障
        public Operatetime: string, //事件操作时间
        public Operator: string, //操作者
        public OperatePosition: string, //操作地点
        public CaseDetail: string, //操作详情
        public RName: string, //操作资源对象
    ) { }
  }
  
  //点击搜索按钮后得到的结果数据（数组），也用作"点击具体选项"的传递数据（单个）--人员结果数据
  export class UserResultData {
    constructor(
        public Name: string,
        public ResourceClass: string,
        public Group: string[], //所在组
        public Role: string[], //角色
    ) { }
  }
  
  //点击搜索按钮后得到的结果数据（数组），也用作"点击具体选项"的传递数据（单个）--资源（服务器、域名、存储、业务系统）结果数据
  export class ResourceResultData {
    constructor(
        public ID: Number,
        public Name: string,
        public RUser: string,//使用者
        public RAdmin: string,//管理员
        public ResourceClass: string, //资源类别
        public RLocation: string,//附件位置（路径）[其实是存放位置]
        public RConfigure: string,//资源配置（路径、大）
        public RUse: string //资源用途（大）
    ) { }
  }
  
  export class SearchResultData{
    constructor(
        public resourceResult:ResourceResultData[],
        public caseResult:CaseResultData[],
        public userResult:UserResultData[]
    ){}
  }