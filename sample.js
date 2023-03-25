function arrayDiff(a, b) {
  let aLength = a.length;
  let blengt = b.length;
  let newArray = [];
  a.forEach((data) => {
    console.log(checkWitharray(data, b));
    if (checkWitharray(data, b)) newArray.push(data);
  });
  return newArray;
}

function checkWitharray(val, b) {
  b.forEach((data) => {
    if (val == data) {
      console.log("here");
      return false;
    }
  });
  return true;
}

let a = [1, 2];
let b = [1];
console.log(arrayDiff(a, b));
