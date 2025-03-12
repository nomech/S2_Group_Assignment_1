import Student from "./student";
import Instructor from "./instructor";
import Course from "./course";
import Ui from "./Ui.js";

class CourseManager {
  static students = JSON.parse(localStorage.getItem("students")) || [];
  static instructors = JSON.parse(localStorage.getItem("instructors")) || [];
  static courses = JSON.parse(localStorage.getItem("courses")) || [];

  static addStuddent(student) {
    // Create new student object
    const item = new Student(
      student.name,
      student.email,
      student.phone,
      student.address,
      student.enrolledCourses
    );  

    student.enrolledCourses.forEach((courseCode) => {
      const courseIndex = CourseManager.courses.findIndex((course) => {
        return course.code === courseCode;
      });

      if (courseIndex !== -1) {
        CourseManager.courses[courseIndex].students.push(item);
      }
    });

    // Add student to array
    CourseManager.students.push(item);    

    // Save both students and updated courses
    CourseManager.saveData("courses", CourseManager.courses);
    CourseManager.saveData("students", CourseManager.students);

    // Re-render the page
    Ui.renderPage("students");
  }

  static addInstructor(instructor) {
    // Create new instructor object
    const item = new Instructor(
      instructor.name,
      instructor.email,
      instructor.phone,
      instructor.address,
      instructor.assignedCourses
    );

    instructor.assignedCourses.forEach((courseCode) => {
      const courseIndex = CourseManager.courses.findIndex((course) => {
        return course.code === courseCode;
      });

      if (courseIndex !== -1) {
        CourseManager.courses[courseIndex].instructor = {
          id: item.id,
          name: instructor.name,
          type: "instructor",
        };
      }
    });

    // Add instructor to array
    CourseManager.instructors.push(item);

    // Save data
    CourseManager.saveData("courses", CourseManager.courses);
    CourseManager.saveData("instructors", CourseManager.instructors);

    // Re-render the page
    Ui.renderPage("instructors");
  }

  static addCourses(courseObject) {
    // Create new course
    const item = new Course(
      courseObject.name,
      courseObject.code,
      courseObject.credit
    );

    // Initialize students array and instructor property
    item.students = [];
    item.instructor = "";

    // Add course to array
    CourseManager.courses.push(item);

    // Save data
    CourseManager.saveData("courses", CourseManager.courses);

    // Re-render the page
    Ui.renderPage("courses");
  }

  static saveData(item, data) {
    localStorage.setItem(item, JSON.stringify(data));
  }

  static deleteStudent(id, type) {
    // Find student data before removing
    const studentToDelete = CourseManager.students.find(
      (student) => student.id === id
    );

    if (studentToDelete) {
      // Remove student from all enrolled courses

      studentToDelete.enrolledCourses.forEach((courseCode) => {
        const courseIndex = CourseManager.courses.findIndex(
          (course) => course.code === courseCode
        );

        if (courseIndex !== -1) {
          // Filter out the student from the course's students array
          CourseManager.courses[courseIndex].students = CourseManager.courses[
            courseIndex
          ].students.filter((student) => student.id !== id);
        }
      });

      // Remove student from students array
      CourseManager.students = CourseManager.students.filter(
        (student) => student.id !== id
      );

      // Save updated data
      CourseManager.saveData("courses", CourseManager.courses);
      CourseManager.saveData("students", CourseManager.students);

      // Re-render the page
      Ui.renderPage(type);
    } else {
      console.error(`Student with ID ${id} not found.`);
    }
  }

  static deleteInstructor(id, type) {
    // Find instructor data before removing
    const instructorToDelete = CourseManager.instructors.find(
      (instructor) => instructor.id === id
    );

    if (instructorToDelete) {
      // Remove instructor from all assigned courses
      if (
        instructorToDelete.assignedCourses &&
        instructorToDelete.assignedCourses.length > 0
      ) {
        instructorToDelete.assignedCourses.forEach((courseCode) => {
          const courseIndex = CourseManager.courses.findIndex(
            (course) => course.code === courseCode
          );

          if (
            courseIndex !== -1 &&
            CourseManager.courses[courseIndex].instructor &&
            CourseManager.courses[courseIndex].instructor.id === id
          ) {
            // Remove instructor reference from course
            CourseManager.courses[courseIndex].instructor = "";
          }
        });
      }

      // Remove instructor from instructors array
      CourseManager.instructors = CourseManager.instructors.filter(
        (instructor) => instructor.id !== id
      );

      // Save updated data
      CourseManager.saveData("courses", CourseManager.courses);
      CourseManager.saveData("instructors", CourseManager.instructors);

      // Re-render the page
      Ui.renderPage(type);
    } else {
      console.error(`Instructor with ID ${id} not found.`);
    }
  }

  static deleteCourses(id) {
    // Find course before deleting
    const courseToDelete = CourseManager.courses.find(
      (course) => course.id === id
    );

    if (courseToDelete) {
      // Remove this course from all enrolled students
      CourseManager.students.forEach((student) => {
        if (
          student.enrolledCourses &&
          student.enrolledCourses.includes(courseToDelete.code)
        ) {
          student.enrolledCourses = student.enrolledCourses.filter(
            (code) => code !== courseToDelete.code
          );
        }
      });

      // Remove this course from all instructors
      CourseManager.instructors.forEach((instructor) => {
        if (
          instructor.assignedCourses &&
          instructor.assignedCourses.includes(courseToDelete.code)
        ) {
          instructor.assignedCourses = instructor.assignedCourses.filter(
            (code) => code !== courseToDelete.code
          );
        }
      });

      // Remove course from courses array
      CourseManager.courses = CourseManager.courses.filter(
        (course) => course.id !== id
      );

      // Save all updated data
      CourseManager.saveData("courses", CourseManager.courses);
      CourseManager.saveData("students", CourseManager.students);
      CourseManager.saveData("instructors", CourseManager.instructors);

      // Re-render the page
      Ui.renderPage("courses");
    } else {
      console.error(`Course with ID ${id} not found.`);
    }
  }

  static editStudent(editStudent) {
   const index = CourseManager.students.findIndex(
      (student) => student.id === editStudent.id
    );

    console.log(index);
    console.log(editStudent);
    
    

    if (index !== -1) {
      // Get the original student data first
      const originalStudent = CourseManager.students[index];

      // Get enrolled courses from form
      const studentEnrolledCourses = document.querySelectorAll(
        ".form__select--student"
      );
      const newEnrolledCourses = Array.from(studentEnrolledCourses)
        .filter((course) => course.value !== "")
        .map((course) => course.value);

      const oldEnrolledCourses = originalStudent.enrolledCourses || [];

      // Find courses to remove student from
      oldEnrolledCourses.forEach((courseCode) => {
        if (!newEnrolledCourses.includes(courseCode)) {
          // This course is no longer enrolled - remove student
          const courseIndex = CourseManager.courses.findIndex(
            (course) => course.code === courseCode
          );
          if (courseIndex !== -1) {
            CourseManager.courses[courseIndex].students = CourseManager.courses[
              courseIndex
            ].students.filter((student) => editStudent.id !== student.id);
          }
        }
      });

      // Find courses to add student to

      newEnrolledCourses.forEach((courseCode) => {
        if (!oldEnrolledCourses.includes(courseCode)) {
          // This is a new enrollment - add student
          const courseIndex = CourseManager.courses.findIndex(
            (c) => c.code === courseCode
          );
          if (courseIndex !== -1) {
            if (!CourseManager.courses[courseIndex].students) {
              CourseManager.courses[courseIndex].students = [];
            }
            CourseManager.courses[courseIndex].students.push({
              id: editStudent.id,
              name: editStudent.name,
              type: "student",
            });
          }
        }
      });

      // Update student information in all courses they're enrolled in
      CourseManager.courses.forEach((course) => {
        if (course.students) {
          course.students.forEach((s, i) => {
            if (s.id === editStudent.id) {
              course.students[i].name = editStudent.name;
            }
          });
        }
      });

      // Update student data
      CourseManager.students[index].name = editStudent.name;
      CourseManager.students[index].email = editStudent.email;
      CourseManager.students[index].phone = editStudent.phone;
      CourseManager.students[index].address = editStudent.address;
      CourseManager.students[index].enrolledCourses = newEnrolledCourses;

  
      // Save all data
      CourseManager.saveData("students", CourseManager.students);
      CourseManager.saveData("courses", CourseManager.courses);

      // Close the form
      const form = document.querySelector(".form-modal__students");
      Ui.closeForm(form, "students");

      // Rerender the page
      Ui.renderPage("students");
    } else {
      console.error("Student not found");
    }
  }

  static editInstructor(instructor) {
    const index = CourseManager.instructors.findIndex(
      (i) => i.id === instructor.id
    );

    if (index !== -1) {
      // Get the original instructor data first
      const originalInstructor = CourseManager.instructors[index];

      // Get assigned courses from form
      const newAssignedCourses = instructor.assignedCourses || [];
      const oldAssignedCourses = originalInstructor.assignedCourses || [];

      // Remove instructor from courses they no longer teach
      oldAssignedCourses.forEach((courseCode) => {
        if (!newAssignedCourses.includes(courseCode)) {
          // Instructor no longer teaches this course
          const courseIndex = CourseManager.courses.findIndex(
            (c) => c.code === courseCode
          );
          if (
            courseIndex !== -1 &&
            CourseManager.courses[courseIndex].instructor &&
            CourseManager.courses[courseIndex].instructor.id === instructor.id
          ) {
            CourseManager.courses[courseIndex].instructor = null;
          }
        }
      });

      // Add instructor to newly assigned courses
      newAssignedCourses.forEach((courseCode) => {
        if (!oldAssignedCourses.includes(courseCode)) {
          // This is a new assignment
          const courseIndex = CourseManager.courses.findIndex(
            (c) => c.code === courseCode
          );
          if (courseIndex !== -1) {
            CourseManager.courses[courseIndex].instructor = {
              id: instructor.id,
              name: instructor.name,
              type: "instructor",
            };
          }
        }
      });

      // Update instructor info in all assigned courses
      CourseManager.courses.forEach((course) => {
        if (course.instructor && course.instructor.id === instructor.id) {
          course.instructor.name = instructor.name;
        }
      });

      // Update instructor data
      CourseManager.instructors[index].name = instructor.name;
      CourseManager.instructors[index].email = instructor.email;
      CourseManager.instructors[index].phone = instructor.phone;
      CourseManager.instructors[index].address = instructor.address;
      CourseManager.instructors[index].assignedCourses = newAssignedCourses;

      // Save all data
      CourseManager.saveData("instructors", CourseManager.instructors);
      CourseManager.saveData("courses", CourseManager.courses);

      // Close the form
      const form = document.querySelector(".form-modal__instructors");
      Ui.closeForm(form, "instructors");

      // Rerender the page
      Ui.renderPage("instructors");
    } else {
      console.error("Instructor not found");
    }
  }

  static editCourse(editedCourse) {
    const index = CourseManager.courses.findIndex(
      (course) => String(course.id) === String(editedCourse.id)
    );

    if (index !== -1) {
      // Get the original course data
      const originalCourse = CourseManager.courses[index];

      // Update course data with new values
      CourseManager.courses[index].name = editedCourse.name;
      CourseManager.courses[index].code = editedCourse.code;
      CourseManager.courses[index].credit = editedCourse.credit;

      // If course code has changed, update all references in students and instructors
      if (originalCourse.code !== editedCourse.code) {
        // Update course code in all enrolled students
        CourseManager.students.forEach((student) => {
          if (
            student.enrolledCourses &&
            student.enrolledCourses.includes(originalCourse.code)
          ) {
            // Replace old code with new code
            const codeIndex = student.enrolledCourses.indexOf(
              originalCourse.code
            );
            student.enrolledCourses[codeIndex] = editedCourse.code;
          }
        });

        // Update course code in all instructors
        CourseManager.instructors.forEach((instructor) => {
          if (
            instructor.assignedCourses &&
            instructor.assignedCourses.includes(originalCourse.code)
          ) {
            // Replace old code with new code
            const codeIndex = instructor.assignedCourses.indexOf(
              originalCourse.code
            );
            instructor.assignedCourses[codeIndex] = editedCourse.code;
          }
        });
      }

      // Keep existing students and instructor data
      CourseManager.courses[index].students = originalCourse.students || [];
      CourseManager.courses[index].instructor = originalCourse.instructor;

      // Save all data
      CourseManager.saveData("courses", CourseManager.courses);
      CourseManager.saveData("students", CourseManager.students);
      CourseManager.saveData("instructors", CourseManager.instructors);

      // Close the form
      const form = document.querySelector(".form-modal__courses");
      Ui.closeForm(form, "courses");

      // Rerender the page
      Ui.renderPage("courses");
    } else {
      console.error("Course not found");
    }
  }
}

export default CourseManager;
