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

func SearchGetResourceData(userName string, keyWord string, searchClass string, isAdmin bool) (vs []tstruct.ResourceResultData) {
	k := "%" + keyWord + "%"
	var sq string
	var row *sql.Rows
	var err error
	if isAdmin {
		sq = `select r_id,r_name,r_user,r_administrator,r_category,r_location,r_configure,r_use from t_resources 
		where r_category=$1 and r_name like $2;`
		row, err = db.Query(sq, searchClass, k)
		if err != nil {
			panic(err)
		}
	} else {
		sq = `select * from 
			(select r_id,r_name,r_user,r_administrator,r_category,r_location,r_configure,r_use from
	    		(select f_gid,t2.* from
		    		(select f_gid,f_uname from t_user_group) t1,
		    		(select * from t_resources) t2
	    		where t1.f_uname=t2.r_creator)t3,
	    		(select f_gid from t_user_group where f_uname=$1) t4
    		where t4.f_gid=t3.f_gid and t3.r_category =$2) t6
		where t6.r_name like $3;`
		row, err = db.Query(sq, userName, searchClass, k)
		if err != nil {
			panic(err)
		}
	}
	for row.Next() {
		var v tstruct.ResourceResultData
		row.Scan(&v.ID, &v.Name, &v.RUser, &v.RAdmin, &v.ResourceClass, &v.RLocation, &v.RConfigure, &v.RUse)
		vs = append(vs, v)
	}
	return
}

func SearchGetCaseData(userName string, keyWord string, isAdmin bool) (vs []tstruct.CaseResultData) {
	k := "%" + keyWord + "%"
	var row *sql.Rows
	var err error
	if isAdmin {
		sq := `select distinct id,c_operate_name,c_operator,c_operate_time,c_operate_position,c_case_detail,r_name 
				from v_user_case
				where c_operate_name like $1`
		row, err = db.Query(sq, k)
		if err != nil {
			panic(err)
		}
	} else {
		sq := `select distinct * from 
				(select id,c_operate_name,c_operator,c_operate_time,c_operate_position,c_case_detail,r_name from v_user_case where f_uname = $1) t1 
			where t1.c_operate_name like $2`
		row, err = db.Query(sq, userName, k)
		if err != nil {
			panic(err)
		}
	}
	for row.Next() {
		var v tstruct.CaseResultData
		row.Scan(&v.ID, &v.OperateName, &v.Operator, &v.Operatetime, &v.OperatePosition, &v.CaseDetail, &v.RName)
		ro := fmt.Sprintf("%s(%s)", v.Operator, v.OperateName)
		v.Name = ro
		v.ResourceClass = "事件"
		vs = append(vs, v)
		// fmt.Println(ro)
	}
	return
}

func SearchGetUserData(userName string, keyWord string, isAdmin bool) (vs []tstruct.UserResultData) {
	k := "%" + keyWord + "%"
	var row *sql.Rows
	var err error
	if isAdmin {
		sq := "select * from v_user_group where user_name like $1;"
		row, err = db.Query(sq, k)
		if err != nil {
			panic(err)
		}
	} else {
		sq := `select distinct t2.* from 
					(select gname from v_user_group where user_name=$1) t1,
					(select * from v_user_group)t2 
				where t1.gname=t2.gname and t2.user_name like $2`
		row, err = db.Query(sq, userName, k)
		if err != nil {
			panic(err)
		}
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
			v.Name = un
			vss[un] = v
		}
	}

	if isAdmin {
		sq2 := "select user_name,rname from v_user_role where user_name like $1;"
		row, err = db.Query(sq2, k)
		if err != nil {
			panic(err)
		}
	} else {
		sq2 := `select t2.user_name,t2.rname from 
					(select rname from v_user_role where user_name=$1) t1, 
					(select * from v_user_role) t2 
				where t1.rname=t2.rname and t2.user_name like $2;`
		row, err = db.Query(sq2, userName, k)
		if err != nil {
			panic(err)
		}
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
			v.Name = un
			vss[un] = v
		}
	}
	for _, value := range vss {
		vs = append(vs, value)
	}
	return
}

func IsAdmin(userName string) bool {
	sq := "select * from v_user_group where gname='管理员' and user_name=$1;"
	row, err := db.Query(sq, userName)
	if err != nil {
		panic(err)
	}
	if row.Next() {
		return true
	} else {
		return false
	}
}
