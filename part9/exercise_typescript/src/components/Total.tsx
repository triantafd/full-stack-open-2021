import React from 'react';
import { CoursePart } from "../utils/types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((s, p) => s + p.exerciseCount, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};


export { Total };
