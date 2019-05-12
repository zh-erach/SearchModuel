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

	OperateName      string //例如故障
	Operatetime      string //事件操作时间
	Operator         string //操作者
	OperatorPosition string //操作地点
	CaseDetail       string //操作详情
	RName            string //操作资源对象
}
