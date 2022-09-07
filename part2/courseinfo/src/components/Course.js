const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  const getSum = () =>
    course.parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}

      <b>total of {getSum()} exercises</b>
    </>
  );
};

export default Courses;
