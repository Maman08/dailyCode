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


package main
