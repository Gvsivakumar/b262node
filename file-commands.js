const os = require("os");
const fs = require("fs");

function double(num) {
    return num * 2;
}
console.log(process.argv);

const num = process.argv[2];

console.log("The double is: ", double(num));

console.log("Free memory:" + os.freemem());
console.log("Total memory:" + os.totalmem());
console.log("The architecture" + os.arch());

// fs.readFile("./nice.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(data, "sakthi");
// fs.writeFile("./good.txt",data, () => 
// console.log("Completed writing in good.txt")
// );
// });

// const data = fs.readFileSync("./nice.txt","utf8");
// console.log(data);

// fs.copyFile("./nice.txt", "good1.txt", () =>
// console.log("Copied nice!!!"));
// fs.rename("good1.txt","awesome.txt", () => {
//     console.log("Rename is Complete!");
// }
// );

fs.appendFile("./nice.txt","\n Good Day!!!",() => {
    console.log("Added to the file")
});