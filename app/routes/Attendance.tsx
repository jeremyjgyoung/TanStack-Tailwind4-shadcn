import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export const Route = createFileRoute("/Attendance")({
  component: AttendancePage,
});

type Attendance = "present" | "absent" | "tardy";

interface Student {
  id: string;
  name: string;
  status: Attendance;
}

const initialStudents: Student[] = [
  { id: "1", name: "Alice Johnson", status: "present" },
  { id: "2", name: "Brian Smith", status: "present" },
  { id: "3", name: "Carlos Lee", status: "present" },
];

/** Cycle: present → absent → tardy → present */
const nextStatus = (status: Attendance): Attendance =>
  status === "present" ? "absent" : status === "absent" ? "tardy" : "present";

export function AttendancePage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [allPresent, setAllPresent] = useState(true); // top-level switch

  /** Toggle every student to present (checked) or absent (unchecked) */
  const handleAllToggle = (checked: boolean) => {
    setAllPresent(checked);
    setStudents((prev) =>
      prev.map((s) => ({ ...s, status: checked ? "present" : "absent" })),
    );
  };

  /** Cycle a single student’s status */
  const toggleStudent = (id: string) =>
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: nextStatus(s.status) } : s,
      ),
    );

  return (
    <div className="p-6 space-y-4">
      {/* ───── Top toggle ───── */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Take Attendance</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {allPresent ? "All Present" : "All Absent"}
          </span>
          <Switch checked={allPresent} onCheckedChange={handleAllToggle} />
        </div>
      </div>

      {/* ───── Student rows ───── */}
      {students.map((student) => (
        <Card
          key={student.id}
          onClick={() => toggleStudent(student.id)}
          className="cursor-pointer select-none hover:bg-muted transition-colors"
        >
          <CardContent className="flex items-center justify-between py-4">
            <span className="text-lg">{student.name}</span>
            <Badge
              className={clsx(
                "capitalize",
                student.status === "present" &&
                  "bg-emerald-600 hover:bg-emerald-600",
                student.status === "absent" && "bg-red-600 hover:bg-red-600",
                student.status === "tardy" &&
                  "bg-yellow-400 text-black hover:bg-yellow-400",
              )}
            >
              {student.status}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
