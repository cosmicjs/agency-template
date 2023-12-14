// components/comments.tsx
import { UserRound } from 'lucide-react';
import { cosmic } from '@/lib/cosmic';

import { CommentForm } from '@/components/comment-form';

type Comment = {
  title: string;
  slug: string;
  metadata: {
    comment: string;
  };
  created_at: string;
};

function Comment({ comment }: { comment: Comment }) {
  const date = new Date(comment.created_at).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className='border border-zinc-300 dark:border-zinc-700 p-4 pb-6 rounded-xl mb-6 flex flex-col'>
      <div className='gap-2 text-gray-500 dark:text-gray-200 flex items-center w-full justify-between mb-4'>
        <div className='flex items-center gap-2 text-black dark:text-white'>
          <UserRound className='w-4 h-4' />
          <div className='text-lg'>{comment.title}</div>
        </div>
        <div className='text-xs'>{date}</div>
      </div>
      <div className='pr-6 text-zinc-700 dark:text-zinc-300'>{comment.metadata.comment}</div>
    </div>
  );
}

export async function Comments({ resourceId }: { resourceId: string }) {
  let comments = [];
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'comments',
        'metadata.approved': true,
        'metadata.resource': resourceId, // Add resource id here such as blog post or product id
      })
      .props('title,slug,metadata,created_at')
      .depth(1)
      .sort('created_at');
    comments = objects;
  } catch (err) {}
  return (
    <div className='w-full mt-8'>
      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      {comments.map((comment: Comment) => {
        return <Comment comment={comment} key={comment.slug} />;
      })}
      <CommentForm resourceId={resourceId} />
    </div>
  );
}
