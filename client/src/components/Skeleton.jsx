import React from 'react';
import styled, { keyframes } from 'styled-components';

const Skeleton = ({ width, height }) => {
	return <SkeletonBox width={width} height={height} />;
};

export default Skeleton;

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const SkeletonBox = styled.div`
	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '100%'};
	background: linear-gradient(
		90deg,
		#313131 25%,
		#525252 50%,
		#313131 75%
	);
	background-size: 200% 100%;
	animation: ${shimmer} 2.5s infinite ease-in-out;
	border-radius: 4px;
`;
