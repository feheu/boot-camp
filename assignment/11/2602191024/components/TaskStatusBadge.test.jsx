import { render, screen } from "@testing-library/react";
import TaskStatusBadge from "./TaskStatusBadge";

describe("TaskStatusBadge", () => {
  test("displays Active for incomplete tasks", () => {
    render(<TaskStatusBadge completed={false} />);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("displays Completed for completed tasks", () => {
    render(<TaskStatusBadge completed={true} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});