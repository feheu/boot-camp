export default function TaskStatusBadge({ completed }) {
  return (
    <span>
      {completed ? "Completed" : "Active"}
    </span>
  );
}