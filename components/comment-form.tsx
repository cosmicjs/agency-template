// components/comment-form.tsx
'use client';

import { useState } from 'react';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function CommentForm({ resourceId }: { resourceId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sumbitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmitComment(e: React.SyntheticEvent) {
    setError(false);
    setSubmitting(true);
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setSubmitting(false);
      setError(true);
      return;
    }
    const newComment = {
      type: 'comments',
      title: name,
      metadata: {
        email,
        comment,
        resource: resourceId, // Add resource id here such as blog post or product id
      },
    };
    try {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment: newComment }),
      });
    } catch (err) {
      setSubmitting(false);
      setError(true);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setComment('');
    }, 3000);
  }
  function handleChangeName(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setName(target.value);
  }
  function handleChangeEmail(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }
  function handleChangeComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }
  return (
    <div className='mb-8'>
      <h2 className='text-lg mb-4'>Add a new comment</h2>
      {error && (
        <div className='border border-red-500 rounded-xl p-8 flex mb-4'>
          <XCircle className='mr-4 h-4 w-4 text-red-500 top-1 relative' />
          There was an error with your request. Make sure all fields are valid.
        </div>
      )}
      {sumbitted ? (
        <div className='border border-green-500 rounded-xl p-8 flex'>
          <CheckCircle className='mr-4 h-4 w-4 text-green-500 top-1 relative' />
          Comment submitted for approval.
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <Label htmlFor='name'>Your name</Label>
            <Input id='name' placeholder='Name' onChange={handleChangeName} value={name} />
          </div>
          <div className='mb-4'>
            <Label htmlFor='email'>Your email</Label>
            <Input id='email' placeholder='Email' onChange={handleChangeEmail} value={email} />
          </div>
          <div className='mb-4'>
            <Label htmlFor='comment'>Comment</Label>
            <Textarea id='comment' placeholder='Comment' onChange={handleChangeComment} value={comment} />
          </div>
          <div>
            <Button onClick={handleSubmitComment} type='submit' disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Submitting...
                </>
              ) : (
                `Submit`
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
