// //string Type conversion
// package main

// import (
// 	"bufio"
// 	"fmt"
// 	"os"
// 	"strconv"
// 	"strings"
// )

// func main() {
// 	fmt.Println("Enter the rating b/w 1 to 5")
// 	reader := bufio.NewReader(os.Stdin)
// 	input,_:=reader.ReadString('\n');
// 	// fmt.Println(input)
// 	correctRating,err:=strconv.ParseFloat(strings.TrimSpace(input),64)
// 	if(err!=nil){
// 		fmt.Println("Got some error while converting string to float",err)
// 	}else{
// 		fmt.Println("Rating updated ",correctRating+1)
// 	}
// }

//Time in go

// package main
// import (
// 	"fmt"
// 	"time"
// )

// func main(){
// 	date_time:=time.Now().Format("01-02-2006 15:04:05 Monday")
// 	fmt.Println(date_time)
// 	created_date:=time.Date(2025,time.January,07,17,48,00,00,*&time.UTC)
// 	fmt.Println(created_date)

// }

//    Defer

// package main

// import "fmt"

// func main(){
// 	defer fmt.Println("hello")
// 	defer fmt.Println("world")
// 	fmt.Println("Statement 3")
// 	loop()
// }
// func loop(){
// 	for i:=0;i<=5;i++{
// 		defer fmt.Println(i)
// 	}
// }

package main

import (
	"fmt"
	"io"
	"os"
)
func main(){
	fmt.Println("Exploring file system")
	conent:="Hello! welcome to the class of golang!! "
	file,err:=os.Create("./abc.txt")
	if err !=nil{
		panic(err)
	}
	length,err:=io.WriteString(file,conent)
	if err!=nil {
		panic(err)
	}
	fmt.Println("Length of file is ",length)
	defer file.Close()

}