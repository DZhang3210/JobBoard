'use client';
import ReactTimeAgo from 'react-timeago';

export default function TimeAgo({createdAt}) {
  return (
    <>
      <ReactTimeAgo date={createdAt}/>
    </>
  );
}