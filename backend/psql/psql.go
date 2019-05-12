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

func SearchGetConciseCaseData(userName string, keyWord string) (vs []tstruct.ResultData) {
	row, err := db.Query("select id,r_name, c_operate_name from v_user_case where f_uname = '$1' ", userName)
	if err != nil {
		panic(err)
	}
	for row.Next() {
		var v tstruct.ResultData
		var rn string
		var on string
		row.Scan(&v.ID, &rn, &on)
		ro := fmt.Sprintf("%s(%s)", rn, on)
		v.Name = ro
		v.ResourceClass = "事件"
		vs = append(vs, v)
	}
	return
}
