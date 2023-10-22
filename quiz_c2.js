// calculate([[3,3,8,5], [6,3,8,9], [11,6,14,12]]) ➞ 36
// // ดูรูปประกอบด้านบน
// // จาก Input มีสี่เหลี่ยมผืนผ้า 3 รูป
// // R1 = [3,3,8,5], R2 = [6,3,8,9], R3 = [11,6,14,12]
// // S(R1) = 10, S(R2)= 12, S(R3) = 18
// // S(R1 ∩ R2) = 4, S(R1 ∩ R3) = 0, S(R2 ∩ R3) = 0
// // S = S(R1)+S(R2)+S(R3)-S(R1∩R2)-S(R1∩R3)-S(R2 ∩ R3) = 36

const { get } = require("mongoose");

class Rectangle {
  isRectangle = false;
  constructor([x0, y0, x1, y1]) {
    this.coordA = { x: x0, y: y0 };
    this.coordB = { x: x1, y: y1 };

    this.horizontalDistance = this.getHorizontalDistance();
    this.verticalDistance = this.getVerticalDistance();

    this.slope = this.#getSlope();

    if (this.slope != 0 && isFinite(this.slope)) {
      this.isRectangle = true;
    }
  }

  #getSlope() {
    return (this.coordA.y - this.coordB.y) / (this.coordA.x - this.coordB.x);
  }

  getHorizontalDistance() {
    return Math.abs(this.coordA.x - this.coordB.x);
  }

  getVerticalDistance() {
    return Math.abs(this.coordA.y - this.coordB.y);
  }

  getArea() {
    return this.horizontalDistance * this.verticalDistance;
  }

  validate(rectangle) {
    if (rectangle.isRectangle == false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }
  }

  isInside(otherRectangle) {
    this.validate(otherRectangle);
    return (
      this.coordA.x >= otherRectangle.coordA.x &&
      this.coordA.y >= otherRectangle.coordA.y &&
      this.coordB.x <= otherRectangle.coordB.x &&
      this.coordB.y <= otherRectangle.coordB.y
    );
  }

  isIntersect(otherRectangle) {
    this.validate(otherRectangle);
    return (
      this.coordA.x < otherRectangle.coordB.x &&
      this.coordA.y < otherRectangle.coordB.y &&
      this.coordB.x > otherRectangle.coordA.x &&
      this.coordB.y > otherRectangle.coordA.y
    );
  }

  isSame(otherRectangle) {
    this.validate(otherRectangle);
    return (
      this.coordA.x == otherRectangle.coordA.x &&
      this.coordA.y == otherRectangle.coordA.y &&
      this.coordB.x == otherRectangle.coordB.x &&
      this.coordB.y == otherRectangle.coordB.y
    );
  }

  getRectangleIfIntersect(otherRectangle) {
    if (otherRectangle.isRectangle === false) {
      console.error("Rectangle not created: Input is not a rectangle");
      return;
    }

    if (this.isIntersect(otherRectangle)) {
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

function getRectanglesFromInput(inputs) {
  const rectangles = [];
  for (let i = 0; i < inputs.length; i++) {
    const r = new Rectangle(inputs[i]);
    rectangles.push(r);
  }
  return rectangles;
}

function getIntersectedOfRectangles(rectangles) {
  const intersectedRectangles = [];
  for (let i = 0; i < rectangles.length; i++) {
    for (let j = i + 1; j < rectangles.length; j++) {
      if (i !== j) {
        const rCurr = rectangles[i];
        const rNext = rectangles[j];
        if (rCurr.isIntersect(rNext)) {
          const r = rCurr.getRectangleIfIntersect(rNext);
          if (r.isRectangle) {
            intersectedRectangles.push(r);
          }
        }
      }
    }
  }
  return intersectedRectangles;
}

function getUniqueRectangles(rectangles) {
  const uniqueRectangles = [];
  for (let i = 0; i < rectangles.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < uniqueRectangles.length; j++) {
      if (rectangles[i].isSame(uniqueRectangles[j])) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      uniqueRectangles.push(rectangles[i]);
    }
  }
  return uniqueRectangles;
}

function getAreaOfRectangles(rectangles) {
  const areas = [];
  for (let i = 0; i < rectangles.length; i++) {
    areas.push(rectangles[i].getArea());
  }
  return areas;
}

function calculate(arr) {
  //find unique rectangles
  const rects = getRectanglesFromInput(arr);
  const uniqueRects = getUniqueRectangles(rects);

  //find unique rectangles that intersected
  const intersecedRects = getIntersectedOfRectangles(uniqueRects);
  const uniqueIntersecedRects = getUniqueRectangles(intersecedRects);

  //get sum area of unique all rectangles
  const areaOfUniqueRects = getAreaOfRectangles(uniqueRects);
  const areaOfUniqueIntersecedRects = getAreaOfRectangles(
    uniqueIntersecedRects
  );

  const sum =
    areaOfUniqueRects.reduce((a, b) => a + b, 0) -
    areaOfUniqueIntersecedRects.reduce((a, b) => a + b, 0);

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
