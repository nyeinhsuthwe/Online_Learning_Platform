import {
  Accordion,
} from "@/components/ui/accordion"
import { useParams } from "react-router-dom"
import { ChapterItem } from "../Lesson/ChapterItems"
import { useEnrollList } from "@/common/api"
import { useUserStore } from "@/store/user"

interface Chapter {
  _id: string
  title: string
}


interface AccordianProps {
  chapters: Chapter[];
}

export function Accordian({ chapters }: AccordianProps) {
  const { data, isLoading } = useEnrollList();
  const { user } = useUserStore();
  const { id: courseId } = useParams<{ id: string }>();

  if (isLoading || !chapters?.length) return null;

  const enrollments = data?.data || [];

  const normalizeStatus = (status?: string) => {
    if (!status) return "pending";
    const lower = status.toLowerCase();
    if (lower === "paid" || lower === "success" || lower === "completed") return "paid";
    if (["failed", "rejected", "reject"].includes(lower)) return "rejected";
    return "pending";
  };

  const enroll = enrollments.find((e: any) => {
    const enrollUserId = typeof e.user_id === "string" ? e.user_id : e.user_id?._id;
    const enrollCourseId = typeof e.course_id === "string" ? e.course_id : e.course_id?._id;
    return enrollUserId === user?._id && enrollCourseId === courseId;
  });

  const hasPaidAccess = normalizeStatus(enroll?.paymentStatus) === "paid";



  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter) => (
        <ChapterItem
          key={chapter._id}
          chapter={chapter}
          courseId={courseId || ""}
          locked={!hasPaidAccess}
        />
      ))}
    </Accordion>
  );
}

