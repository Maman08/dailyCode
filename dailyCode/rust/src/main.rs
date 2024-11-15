// fn main() {
//     // println!("Hello, world!");
//     let x:i32=-3;
//     let y:i32=4;
//     let z:f32=-0.1;
//     // let mut a: i32=0;
//     // for i in 0..10{
//     //     a=x+y;
//     //     println!("a={}",a)
//     // }
//     let greeting1="Hello World";
//     let greeting=String::from("Hello World!!");
//     println!("{}",greeting)

// }


//  Q1.Write a simple Rust program that prints "Hello, World!" to the console.
// fn main() {
//     let greeting=String::from("Hello World!!");
//     print!("{}",greeting);
// }

//  Q2.Declare variables of each basic data type in Rust: integer, floating-point, boolean, and character. Print each one to confirm it works.

// fn main() {
//     let a:i8=3;
//     let b=1.1;
//     let charachter='a';
//     println!("{}",a);
//     println!("{}",b);
//     println!("{}",charachter)

// }

//  Q3.Write a program that checks if a number is even or odd. For example, if the number is 5, it should print "5 is odd". If it's 8, it should print "8 is even".
// fn main() {
//     let num=11;
//     if num%2==0{
//         println!("{}","The Number is even");
//     }
//     else if !num%2==0 {
//         println!("{}","The Number is Odd");
//     }
// }


//   Q4.Write a for loop that prints numbers from 1 to 5.
// fn main() {
//     for  i in 1..6{
//           println!("{}",i);
//     }
// }


// //  Q5.Write a function called square that takes an integer and returns its square

// fn main() {
//     let  ans= square(4);
//     println!("ans = {}",ans);
// }

// fn square(x:i32) -> i32{
//     x*x
  
// }


// fn main() {
//     let my_tuple = (42, 3.14, "Hello");

//     println!("Integer: {}", my_tuple.0);
//     println!("Float: {}", my_tuple.1);
//     println!("String: {}", my_tuple.2);
//     print!("{:?}",my_tuple)
// }

// fn main() {
//     let mut x=String::from("Hii there");
//     x.push_str(" Aman");
//     println!("{}",x);
// }


// //find the first word in given string
// fn main(){
//     let s1=String::from("Mritunjay singh Hai meraa naaam");
//     let first_word=get_first_word(s1);
//     print!("{}",first_word);
// }

// fn get_first_word(s1:String)->String {
//        let mut ans=String::from("");
//        for char in s1.chars(){
//         if char==' '{
//             break;
//         }
//         else {
//             ans.push_str(char.to_string().as_str());
//         }
//        }
//        return  ans;
// }





//    Stack vs heap

// fn main() {
//     update_string();
// }
// fn update_string() {
//     let mut s=String::from("Initial String");
//     println!("Inital Data");
//     println!("Capacity: {} , Length: {} , pointer: {:p}",s.capacity(),s.len(),s.as_ptr());
//     println!("Post Update Data ");
//     for i in 0..100{
//         s.push_str("And Now adding some more text");
//         println!("Capacity: {} , Length: {} , pointer: {:p}",s.capacity(),s.len(),s.as_ptr())
//     }
// }


use chrono::{Local,Utc};

fn main(){
     let now=Utc::now();
     println!("Current date and time in UTC: {}",now);
     let formatted = now.format("%Y-%m-%d %H:%M:%S");
     println!("Formatted date and time: {}",formatted);
     let local=Local::now();
     println!("Current date and time in Local: {}",local);
     let formatted = local.format("%Y-%m-%d %H:%M:%S");
     println!("Formatted date and time: {}",formatted);

     
}