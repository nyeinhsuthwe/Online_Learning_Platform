import {
  Accordion,
} from "@/components/ui/accordion"
import { useParams } from "react-router-dom"
import { ChapterItem } from "../Lesson/ChapterItems"
import { useEnrollByUser } from "@/common/api"
import { useUserStore } from "@/store/user"

interface Chapter {
  _id: string
  title: string
}


interface AccordianProps {
  chapters: Chapter[];
}

export function Accordian({ chapters }: AccordianProps) {
  const { data, isLoading } = useEnrollByUser();
  const { user } = useUserStore();
  const { id: courseId } = useParams<{ id: string }>();

  if (isLoading || !chapters?.length) return null;

  const enrollments = data?.data || [];

  const enroll = enrollments.find(
    (e: any) =>
      e.user_id === user?._id &&
      e.course_id?._id === courseId
  );

  const hasPaidAccess = enroll?.paymentStatus === "paid";



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


