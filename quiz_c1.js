// expand("(x+1)^2") ➞ "x^2+2x+1"
// expand("(p-1)^3") ➞ "p^3-3p^2+3p-1"
// expand("(-2a-4)^0") ➞ "1"
// // ยกกำ ลัง 0 จะได้ 1 เสมอ
// expand("(-12t+43)^2") ➞ "144t^2-1032t+1849"
// expand("(r+0)^203") ➞ returns "r^203"
// expand("(-x-1)^2") ➞ returns "x^2+2x+1"
// expand("(2f+4)^6") ➞
// "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"

const poly = (str) => {
  let ixOBracket = str.indexOf("(");
  let ixCBracket = str.indexOf(")");
  let ixExpoOperation = str.indexOf("^");
  let eq = str.substring(ixOBracket + 1, ixCBracket);
  let eqArr = [...eq];
  let _exp = parseInt(str.substring(ixExpoOperation + 1));
  let _b = eqArr.pop();
  let _op = eqArr.pop();
  let _x = eqArr.pop();
  let _a = eqArr.join("") || "1";

  if (_a == "-") _a = "-1";

  if (_op == "-") {
    _b = "-" + _b;
    _op = "+";
  }

  const result = binomial(_a, _x, _b, _exp);
  return result;
};

const binomial = (a, x, y, n) => {
  //ax^b*y^c,
  // n=2
  // ax^2*y^0 + 2axy + y^2*x
  let poly = "";
  for (let b = n; b >= 0; b--) {
    for (let c = 0; c <= n; c++) {
      if (b + c == n) {
        let _a = Math.pow(a, b);
        let _y = Math.pow(y, c);
        let d = coefficient(n, c);

        let _ay = _a * _y * d;
        let _x = x + "^" + b;

        if (b == 1) _x = x;
        if (b == 0) _x = "";

        poly += _ay + _x + "+";
      }
    }
  }

  poly = poly.replaceAll("1" + x, x);
  poly = poly.replaceAll("+-", "-");

  return poly.substring(0, poly.length - 1);
};

const coefficient = (n, k) => {
  let n_fac = factorial(n);
  let k_fac = factorial(k);
  let nk_fac = factorial(n - k);
  return n_fac / (k_fac * nk_fac);
};

const factorial = (n) => {
  if (n == 0) return 1;
  return n * factorial(n - 1);
};

// =====================================
// ไฟล์ส่วนล่างนี้เป็นตัวอย่าง input output (test case)
// ห้ามแก้ไข!
// วิธีการรันคือ
//   1. เปิด terminal
//   2. cd เข้ามาที่โปรเจ็คปัจจุบัน
//   3. รัน node เว้นวรรค ตามด้วยชื่อไฟล์
//   4. หาก โปรแกรมทำงานถูกต้องจะขึ้น true ทั้งหมด
// =====================================
function test(obj) {
  console.log(obj.index + ": ", poly(obj.input) === obj.output);
}

test({
  index: 1,
  input: "(x+1)^0",
  output: "1",
});
test({
  index: 2,
  input: "(x+1)^1",
  output: "x+1",
});
test({
  index: 3,
  input: "(x+1)^2",
  output: "x^2+2x+1",
});
test({
  index: 4,
  input: "(x-1)^0",
  output: "1",
});
test({
  index: 5,
  input: "(x-1)^1",
  output: "x-1",
});
test({
  index: 6,
  input: "(x-1)^2",
  output: "x^2-2x+1",
});
test({
  index: 7,
  input: "(5m+3)^4",
  output: "625m^4+1500m^3+1350m^2+540m+81",
});
test({
  index: 8,
  input: "(2x-3)^3",
  output: "8x^3-36x^2+54x-27",
});
test({
  index: 9,
  input: "(7x-7)^0",
  output: "1",
});
test({
  index: 10,
  input: "(-5m+3)^4",
  output: "625m^4-1500m^3+1350m^2-540m+81",
});
test({
  index: 11,
  input: "(-2k-3)^3",
  output: "-8k^3-36k^2-54k-27",
});
test({
  index: 12,
  input: "(-7x-7)^0",
  output: "1",
});
test({
  index: 13,
  input: "(-c-4)^7",
  output: "-c^7-28c^6-336c^5-2240c^4-8960c^3-21504c^2-28672c-16384",
});
