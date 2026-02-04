import {
  Accordion,
} from "@/components/ui/accordion"
import { useNavigate, useParams } from "react-router-dom"
import { ChapterItem } from "../Lesson/ChapterItems"

interface Chapter {
  _id: string
  title: string
}


interface AccordianProps {
  chapters: Chapter[];
}

export function Accordian({ chapters }: AccordianProps) {
  const navigate = useNavigate();
  const { id: courseId } = useParams<{ id: string }>();

  if (!chapters || chapters.length === 0) {
    return null; 
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter) => (
        <ChapterItem
          key={chapter._id}
          chapter={chapter}
          courseId={courseId || ""}
          navigate={navigate}
        />
      ))}
    </Accordion>
  );
}

