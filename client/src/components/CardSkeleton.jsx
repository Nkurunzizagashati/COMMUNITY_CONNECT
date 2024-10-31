import React from 'react';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const CardSkeleton = () => {
	return (
		<SkeletonGrid>
			{Array(3)
				.fill(0)
				.map((_, index) => (
					<SkeletonCard key={index}>
						<Skeleton width="100%" height="200px" />
						<CardContent>
							<Skeleton width="60%" height="1.6rem" />
							<Skeleton width="100%" height="15px" />
							<Skeleton width="100%" height="20px" />
						</CardContent>
					</SkeletonCard>
				))}
		</SkeletonGrid>
	);
};

export default CardSkeleton;

const SkeletonGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 1rem;

	@media (max-width: 1194px) {
		grid-template-columns: 1fr;
	}
`;

const SkeletonCard = styled.div`
	margin-bottom: 20px;
	border-radius: 12px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	overflow: hidden;
`;

const CardContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1rem;
`;
