import { Metadata } from "next";
import ProgrammingCoursesView from "@/components/ProgrammingCoursesView";

export const metadata: Metadata = {
  title: "Programming & Developer Courses | NextFutureMind",
  description: "Practical, project-based courses to help you build in-demand programming skills.",
};

export default function ProgrammingPage() {
  return <ProgrammingCoursesView />;
}
