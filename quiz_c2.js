// calculate([[3,3,8,5], [6,3,8,9], [11,6,14,12]]) ➞ 36
// // ดูรูปประกอบด้านบน
// // จาก Input มีสี่เหลี่ยมผืนผ้า 3 รูป
// // R1 = [3,3,8,5], R2 = [6,3,8,9], R3 = [11,6,14,12]
// // S(R1) = 10, S(R2)= 12, S(R3) = 18
// // S(R1 ∩ R2) = 4, S(R1 ∩ R3) = 0, S(R2 ∩ R3) = 0
// // S = S(R1)+S(R2)+S(R3)-S(R1∩R2)-S(R1∩R3)-S(R2 ∩ R3) = 36

class Rectangle {
  isRectangle = false;
  constructor([x0, y0, x1, y1]) {
    this.coordA = { x: x0, y: y0 };
    this.coordB = { x: x1, y: y1 };
    this.coordC = this.findCoordC();
    this.coordD = this.findCoordD();

    this.horizontalDistance = this.calHorizontalDistance();
    this.verticalDistance = this.calVerticalDistance();

    this.slope = this.calSlope();

    if (this.slope === 0 || !isFinite(this.slope)) {
      return;
    }

    this.isRectangle = true;
  }

  findCoordC() {
    let x2 = this.coordA.x;
    let y2 = this.coordB.y;
    return { x: x2, y: y2 };
  }

  findCoordD() {
    let x3 = this.coordB.x;
    let y3 = this.coordA.y;
    return { x: x3, y: y3 };
  }

  calHorizontalDistance() {
    return Math.abs(this.coordA.x - this.coordB.x);
  }

  calVerticalDistance() {
    return Math.abs(this.coordA.y - this.coordB.y);
  }

  calSlope() {
    return this.verticalDistance / this.horizontalDistance;
  }

  calArea() {
    return this.horizontalDistance * this.verticalDistance;
  }

  isInside(otherRectangle) {
    if (otherRectangle.isRectangle === false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }

    return (
      this.coordA.x >= otherRectangle.coordA.x &&
      this.coordA.y >= otherRectangle.coordA.y &&
      this.coordB.x <= otherRectangle.coordB.x &&
      this.coordB.y <= otherRectangle.coordB.y
    );
  }

  isIntersects(otherRectangle) {
    if (otherRectangle.isRectangle === false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }

    return !(
      this.coordA.x > otherRectangle.coordB.x ||
      this.coordB.x < otherRectangle.coordA.x ||
      this.coordA.y > otherRectangle.coordB.y ||
      this.coordB.y < otherRectangle.coordA.y
    );
  }

  isSame(otherRectangle) {
    if (otherRectangle.isRectangle === false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }

    return (
      this.coordA.x === otherRectangle.coordA.x &&
      this.coordA.y === otherRectangle.coordA.y &&
      this.coordB.x === otherRectangle.coordB.x &&
      this.coordB.y === otherRectangle.coordB.y
    );
  }

  getRegtangleIfIntersects(otherRectangle) {
    if (otherRectangle.isRectangle === false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }

    if (this.isIntersects(otherRectangle)) {
      let x0 = Math.max(this.coordA.x, otherRectangle.coordA.x);
      let y0 = Math.max(this.coordA.y, otherRectangle.coordA.y);
      let x1 = Math.min(this.coordB.x, otherRectangle.coordB.x);
      let y1 = Math.min(this.coordB.y, otherRectangle.coordB.y);
      return new Rectangle([x0, y0, x1, y1]);
    } else {
      return undefined;
    }
  }
}

function calculate(arr) {
  const rectangles = [];

  //prepare regatangle
  for (let i = 0; i < arr.length; i++) {
    const r = new Rectangle(arr[i]);
    rectangles.push(r);
  }

  const seenRectangles = [];
  for (let i = 0; i < rectangles.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < seenRectangles.length; j++) {
      if (rectangles[i].isSame(seenRectangles[j])) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      seenRectangles.push(rectangles[i]);
    }
  }

  const intersecedRectangles = [];
  for (let i = 0; i < seenRectangles.length; i++) {
    for (let j = i + 1; j < seenRectangles.length; j++) {
      if (i !== j) {
        const rCurr = seenRectangles[i];
        const rNext = seenRectangles[j];
        if (rCurr.isIntersects(rNext)) {
          const r = rCurr.getRegtangleIfIntersects(rNext);
          if (r.isRectangle) {
            intersecedRectangles.push(r);
          }
        }
      }
    }
  }

  const seenIntersecedRectangles = [];
  for (let i = 0; i < intersecedRectangles.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < seenIntersecedRectangles.length; j++) {
      if (intersecedRectangles[i].isSame(seenIntersecedRectangles[j])) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      seenIntersecedRectangles.push(intersecedRectangles[i]);
    }
  }

  const arrAreaOfSeenRectangles = [];
  for (let i = 0; i < seenRectangles.length; i++) {
    arrAreaOfSeenRectangles.push(seenRectangles[i].calArea());
  }

  const arrAreaOfSeenIntersecedRectangles = [];
  for (let i = 0; i < seenIntersecedRectangles.length; i++) {
    arrAreaOfSeenIntersecedRectangles.push(
      seenIntersecedRectangles[i].calArea()
    );
  }

  const sum =
    arrAreaOfSeenRectangles.reduce((a, b) => a + b, 0) -
    arrAreaOfSeenIntersecedRectangles.reduce((a, b) => a + b, 0);

  return sum;
}

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
  console.log(
    obj.index + ": ",
    JSON.stringify(calculate(obj.input)) === JSON.stringify(obj.output)
  );
}

test({
  index: 1,
  input: [],
  output: 0,
});
test({
  index: 2,
  input: [[0, 0, 1, 1]],
  output: 1,
});
test({
  index: 3,
  input: [[0, 4, 11, 6]],
  output: 22,
});
test({
  index: 4,
  input: [
    [0, 0, 1, 1],
    [1, 1, 2, 2],
  ],
  output: 2,
});
test({
  index: 5,
  input: [
    [0, 0, 1, 1],
    [0, 0, 2, 2],
  ],
  output: 4,
});
test({
  index: 6,
  input: [
    [3, 3, 8, 5],
    [6, 3, 8, 9],
    [11, 6, 14, 12],
  ],
  output: 36,
});
test({
  index: 7,
  input: [
    [0, 0, 1, 1],
    [0, 0, 2, 2],
    [0, 0, 1, 1],
    [0, 0, 2, 2],
    [0, 0, 1, 1],
    [0, 0, 2, 2],
  ],
  output: 4,
});
test({
  index: 8,
  input: [
    [1, 1, 2, 2],
    [2, 2, 3, 3],
    [3, 3, 4, 4],
    [4, 4, 5, 5],
    [2, 1, 3, 2],
  ],
  output: 5,
});
test({
  index: 9,
  input: [
    [1, 1, 2, 2],
    [1, 4, 2, 7],
    [1, 4, 2, 6],
    [1, 4, 4, 5],
    [2, 5, 6, 7],
    [4, 3, 7, 6],
  ],
  output: 21,
});
