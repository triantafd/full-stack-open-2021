import React from 'react';
import { CoursePart } from "../utils/types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          {part.name} {part.exerciseCount} exc.
        </div>
      );
    case "groupProject":
      return (
        <div>
          {part.name} {part.exerciseCount} exc. {part.groupProjectCount} group
          projects
        </div>
      );
    case "submission":
      return (
        <div>
          {part.name} {part.exerciseCount} exc. {part.exerciseSubmissionLink}
        </div>
      );
    case "special":
      return (
        <div>
          {part.name} {part.exerciseCount} exc. requirements:{" "}
          {part.requirements.map((req) => req + " ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};
