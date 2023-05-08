import React from "react";
import dayjs from "dayjs";

export const ageColor = (age) => {
  if (age < 18) {
    return "bg-lime-500";
  } else if (age < 30) {
    return "bg-green-500";
  } else if (age < 40) {
    return "bg-green-500";
  } else if (age < 50) {
    return "bg-emerald-500";
  } else if (age < 60) {
    return "bg-amber-500";
  } else if (age < 70) {
    return "bg-orange-500";
  } else if (age < 80) {
    return "bg-red-500";
  } else {
    return "bg-red-900";
  }
};

export const AgeComponent = ({ birthday, deathDate, movieDate, size }) => {
  // calculate age from birthday using dayjs

  console.log("deathDate", deathDate);
  let age;
  // if movie date is after actor's death set age to "PH"
  if (deathDate && dayjs(movieDate).isAfter(dayjs(deathDate))) {
    age = "X";
  } else {
    age = dayjs(movieDate).diff(dayjs(birthday), "year");
  }

  console.log("age", age);

  const bgColor = ageColor(age);

  const offset = 100 - 0.7 * 100;

  const height = 10;

  const thickness = height / 10;

  const halfThickness = thickness / 2;

  // viewbox is origin x, origin y, width, height
  const viewBox = `${height / 2 - halfThickness} ${
    height / 2 - halfThickness
  } ${height + halfThickness} ${height + halfThickness}`;

  if (size !== "small") {
    return (
      <div
        className={` w-[2rem] h-[2rem] flex ${bgColor} rounded-full items-center justify-center`}
      >
        <span className="text-white text-base font-bold ">{age}</span>
      </div>
    );
  } else {
    return (
      <div
        className={` w-[1.5rem] h-[1.5rem] flex ${bgColor} rounded-full items-center justify-center`}
      >
        <span className="text-white text-xs font-bold ">{age}</span>
      </div>
    );
  }
};
