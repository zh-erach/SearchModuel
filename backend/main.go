package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"./psql"

	"./tstruct"
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
	if v, ok := data.(tstruct.PushData); ok {
		switch v.ResourceClass {
		case "服务器":
			psql.SearchGetConciseResourceData("10001", v.KeyWord, "服务器")
		case "IP/域名":
			psql.SearchGetConciseResourceData("10001", v.KeyWord, "IP/域名")
		case "业务系统":
			psql.SearchGetConciseResourceData("10001", v.KeyWord, "业务系统")
		case "存储":
			psql.SearchGetConciseResourceData("10001", v.KeyWord, "存储")
		case "事件":
			fmt.Println("开始搜索事件")
			vs := psql.SearchGetConciseCaseData("10001", v.KeyWord)
			d, err := json.Marshal(vs)
			checkError(err)
			w.Write(d)
		}
	}
}

func getBodyData(r *http.Request) (data interface{}) {
	defer r.Body.Close()
	body, err := ioutil.ReadAll(r.Body)
	checkError(err)
	// var data interface{}
	err = json.Unmarshal(body, &data)
	checkError(err)
	return
}

// { label: '服务器', value: '服务器' },
// { label: 'IP/域名', value: 'IP/域名' },
// { label: '人员', value: '人员' },
// { label: '业务系统', value: '业务系统' },
// { label: '存储', value: '存储' },
// { label: '事件', value: '事件' },
