package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"./psql"
)

func main() {
	fmt.Println("程序开始执行")
	http.HandleFunc("/search/page1", errorHandler(searchPage1))
	if err := http.ListenAndServe(":7080", nil); err != nil {
		fmt.Println(err)
		return
	}
}

func errorHandler(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err, ok := recover().(error); ok {
				fmt.Println(err)
			}
		}()
		h(w, r)
	}
}

func setHeader(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")                           //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type,Authorization") //header的类型
	w.Header().Set("content-type", "application/json")                           //返回数据格式是json
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func searchPage1(w http.ResponseWriter, r *http.Request) {
	setHeader(w)
	data := getBodyData(r)
	fmt.Println(data)
	isAdmin := psql.IsAdmin("10005")
	isAdmin = false
	fmt.Println("开始搜索")
	// 判断查询的类别,对应相应的数据库处理函数
	switch data["ResourceClass"] {
	case "服务器":
		vs := psql.SearchGetResourceData("1706300031", data["KeyWord"].(string), "服务器", isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	case "IP/域名":
		vs := psql.SearchGetResourceData("1706300031", data["KeyWord"].(string), "IP/域名", isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	case "业务系统":
		vs := psql.SearchGetResourceData("1706300031", data["KeyWord"].(string), "业务系统", isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	case "存储":
		vs := psql.SearchGetResourceData("1706300031", data["KeyWord"].(string), "存储", isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	case "事件":
		fmt.Println("开始搜索事件")
		vs := psql.SearchGetCaseData("1706300031", data["KeyWord"].(string), isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	case "人员":
		fmt.Println("开始搜索人员")
		vs := psql.SearchGetUserData("1706300031", data["KeyWord"].(string), isAdmin)
		d, err := json.Marshal(vs)
		checkError(err)
		w.Write(d)
	}

}

func getBodyData(r *http.Request) (data map[string]interface{}) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	checkError(err)
	// var data interface{}
	err = json.Unmarshal(body, &data)
	checkError(err)
	return
}
