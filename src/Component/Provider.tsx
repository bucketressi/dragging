import React, { useEffect, useState } from 'react';
import { Table, Subscribe, Position } from '.';

const Provider = () => {
	const [subscribers, setScriber] = useState<Subscribe>(new Subscribe());
	const [position, setPosition] = useState<Position | undefined>(undefined);
	useEffect(() => {
		// 초기화
		setPosition(new Position(subscribers));
	}, [subscribers]);

	return (
		<Table
			subscribers = {subscribers}
		/>
	)
};

export default Provider;