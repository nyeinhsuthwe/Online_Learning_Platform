import { useGetComment } from "../../common/api";
import { useEpisodeStore } from "../../store/episode";
import { CommentNode } from "./CommentNode";
import type { Comment } from "../../types/type";


export function Reply() {
  const { episode } = useEpisodeStore();
  const { data } = useGetComment(episode?._id || "");

  const topComments: Comment[] = data?.filter((c: Comment) => c.parent_comment_id === null) || [];

  return (
    <div className="mt-6 space-y-4">
      {topComments.map((comment: Comment) => (
      <CommentNode comment={comment} episodeId={episode?._id || ""} />

      ))}
    </div>
  );
}
