const fs = require("fs");

/**
 * class Scores
 * computes average scores and
 * cgpa
 */
class Scores {
  constructor(number, name, subj1, subj2, subj3, subj4, subj5) {
    this.number = number;
    this.name = name;
    this.subj1 = Number(subj1);
    this.subj2 = Number(subj2);
    this.subj3 = Number(subj3);
    this.subj4 = Number(subj4);
    this.subj5 = Number(subj5);
  }

  /**
   * averageScore
   * return average of 5 numbers
   */
  calculateAverageScore() {
    return (this.subj1 + this.subj2 + this.subj3 + this.subj4 + this.subj5)/5;
  }

  /**
   * cgpa
   * returns cgpa
   */
  calculateCgpa() {
    return ((this.subj1/20) + (this.subj2/20) + (this.subj3/20) + (this.subj4/20) + (this.subj5/20))/5;
  }
}

const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("./scores.csv")
})
let counter = 0;

lineReader.on("line", (line) => {
  contentArrays = line.split(",");

  if(counter >= 1) {
    const scores = new Scores(...contentArrays);

    console.log(scores.name, `(${scores.number}):`, scores.calculateAverageScore(), scores.calculateCgpa())
  }
  counter++;

});