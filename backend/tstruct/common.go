package tstruct

type SearchData struct {
	ResourceClass string
	KeyWord       string
	// Token         string
}

type CaseResultData struct {
	ID            int
	ResourceClass string
	Name          string //详细信息不显示
	label         []string

	OperateName     string //例如故障
	Operatetime     string //事件操作时间
	Operator        string //操作者
	OperatePosition string //操作地点
	CaseDetail      string //操作详情
	RName           string //操作资源对象
}

type UserResultData struct {
	Name          string
	ResourceClass string
	Group         []string //所在组
	Role          []string //角色
}

type ResourceResultData struct {
	ID            int
	Name          string //资源名称
	RUser         string //使用者
	RAdmin        string //管理员
	ResourceClass string //资源类别
	RLocation     string //附件位置（路径）
	RConfigure    string //资源配置（路径、大）
	RUse          string //资源用途（大）
}
