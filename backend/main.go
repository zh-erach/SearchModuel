package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("程序开始执行")
	http.HandleFunc("/search", errorHandler(search))
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

func search(w http.ResponseWriter, r *http.Request) {
	setHeader(w)

}
