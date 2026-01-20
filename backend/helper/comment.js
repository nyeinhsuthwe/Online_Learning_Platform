
function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  // Step 1: map comments by id
  comments.forEach((comment) => {
    map[comment._id] = {
      ...comment.toObject(),
      replies: [],
    };
  });

  // Step 2: link replies
  comments.forEach((comment) => {
    if (comment.parent_comment_id) {
      map[comment.parent_comment_id]?.replies.push(
        map[comment._id]
      );
    } else {
      roots.push(map[comment._id]);
    }
  });

  return roots;
}

module.exports = buildCommentTree;
