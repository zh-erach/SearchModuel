package psql

import (
	"database/sql"
	"fmt"

	"../tstruct"
	_ "github.com/lib/pq"
)

var db *sql.DB

const (
	host     = "123.207.121.2"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "test"
)

func init() {
	defer func() {
		if err, ok := recover().(error); ok {
			fmt.Println(err)
			db.Close()
		}
	}()
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err = sql.Open("postgres", psqlInfo)

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("数据库连接成功")
}

func Close() {
	fmt.Println("数据库连接已关闭")
	db.Close()
}

func SearchGetConciseResourceData(userName string, keyWord string, searchClass string) {
	fmt.Println(keyWord)
}

func SearchGetCaseData(userName string, keyWord string) (vs []tstruct.CaseResultData) {
	k := "%" + keyWord + "%"
	fmt.Println(k)
	sq := "select distinct * from (select id,c_operate_name,c_operator,c_operate_time,c_operate_position,c_case_detail,r_name from v_user_case where f_uname = $1) t1 where t1.c_operate_name like $2"
	row, err := db.Query(sq, userName, k)
	if err != nil {
		panic(err)
	}
	for row.Next() {
		var v tstruct.CaseResultData
		row.Scan(&v.ID, &v.OperateName, &v.Operator, &v.Operatetime, &v.OperatePosition, &v.CaseDetail, &v.RName)
		ro := fmt.Sprintf("%s(%s)", v.Operator, v.OperateName)
		v.Name = ro
		v.ResourceClass = "事件"
		vs = append(vs, v)
		fmt.Println(ro)
	}
	return
}

func SearchGetUserData(userName string, keyWord string) (vs []tstruct.UserResultData) {
	k := "%" + keyWord + "%"
	sq := "select distinct t2.* from (select gname from v_user_group where user_name=$1) t1,(select * from v_user_group)t2 where t1.gname=t2.gname and t2.user_name like $2"
	row, err := db.Query(sq, userName, k)
	if err != nil {
		panic(err)
	}
	vss := make(map[string]tstruct.UserResultData)
	for row.Next() {

		var v tstruct.UserResultData
		var gn string
		var un string
		row.Scan(&un, &gn)
		if _, ok := vss[un]; ok {
			v = vss[un]
			v.Group = append(v.Group, gn)
			vss[un] = v
		} else {
			v.Group = append(v.Group, gn)
			v.ResourceClass = "人员"
			v.UserName = un
			vss[un] = v
		}
	}
	sq2 := "select t2.user_name,t2.rname from (select rname from v_user_role where user_name=$1) t1, (select * from v_user_role) t2 where t1.rname=t2.rname and t2.user_name like $2;"
	row, err = db.Query(sq2, userName, k)
	if err != nil {
		panic(err)
	}
	for row.Next() {
		var v tstruct.UserResultData
		var rn string
		var un string
		row.Scan(&un, &rn)
		if _, ok := vss[un]; ok {
			v = vss[un]
			v.Role = append(v.Role, rn)
			vss[un] = v
		} else {
			v.Role = append(v.Role, rn)
			v.ResourceClass = "人员"
			v.UserName = un
			vss[un] = v
		}
	}
	for _, value := range vss {
		vs = append(vs, value)
	}
	return
}
