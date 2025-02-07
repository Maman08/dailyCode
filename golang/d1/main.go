package main

import "fmt"

// Divide function: divides two numbers and handles division by zero
func Divide(a float64, b float64) (float64, string) {
	if b == 0 {
		return 0, "Error: You cannot divide by zero!"
	}
	return a / b, ""
}

func main() {
	// Numbers to divide
	num1 := 10.0
	num2 := 2.0

	// Call the Divide function
	result, err := Divide(num1, num2)
	if err != "" {
		fmt.Println(err) // Print the error if there's one
	} else {
		fmt.Printf("The result of %.2f divided by %.2f is %.2f\n", num1, num2, result)
	}

	// Division by zero example
	num3 := 0.0
	result, err = Divide(num1, num3)
	if err != "" {
		fmt.Println(err)
	} else {
		fmt.Printf("The result of %.2f divided by %.2f is %.2f\n", num1, num3, result)
	}
}
