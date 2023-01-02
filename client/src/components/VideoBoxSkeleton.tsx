import React from 'react';
import ContentLoader from 'react-content-loader';

const VideoBoxSkeleton = (props: any) => (
  <ContentLoader
    speed={1}
    width={320}
    height={280}
    viewBox="0 0 320 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="4" y="9" rx="45" ry="45" width="290" height="160" />
    <circle cx="44" cy="208" r="25" />
    <rect x="80" y="189" rx="0" ry="0" width="160" height="15" />
    <rect x="80" y="210" rx="0" ry="0" width="86" height="15" />
    <rect x="80" y="230" rx="0" ry="0" width="154" height="15" />
  </ContentLoader>
);

export default VideoBoxSkeleton;
