import { filterTasks } from "./taskUtils";

const sampleTasks = [
  { id: "1", title: "Study", completed: false },
  { id: "2", title: "Exercise", completed: true },
  { id: "3", title: "Read", completed: false },
];

describe("filterTasks", () => {
  test("returns all tasks", () => {
    expect(filterTasks(sampleTasks, "all")).toHaveLength(3);
  });

  test("returns only active tasks", () => {
    expect(filterTasks(sampleTasks, "active")).toHaveLength(2);
  });

  test("returns only completed tasks", () => {
    expect(filterTasks(sampleTasks, "completed")).toHaveLength(1);
  });
});