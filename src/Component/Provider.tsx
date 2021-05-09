import React, { useEffect, useState } from 'react';
import { Table, Subscribe, Position, IsClicked, Coloring } from '.';
import { tdType } from './Type';

const Provider = () => {
	const weekDay = ["월", "화", "수", "목", "금", "토", "일"];
	const [bodyArray, setBodyArray] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
	const [boolArray, setBoolArray] = useState<tdType>({});
	const [subscribers, setScriber] = useState<Subscribe | undefined>(undefined);
	const [position, setPosition] = useState<Position | undefined>(undefined);
	const [isClicked, setIsClicked] = useState<IsClicked | undefined>(undefined);
	const [coloring, setColoring] = useState<Coloring | undefined>(undefined);

	useEffect(() => {
		if(!subscribers)
			return;
		setIsClicked(new IsClicked(subscribers));
	}, [subscribers]);
	useEffect(() => {
		if(!subscribers || !isClicked)
			return;
		setPosition(new Position(subscribers, isClicked));
	}, [isClicked]);

	useEffect(()=>{
		if(!subscribers || !isClicked || !position)
			return;
		setColoring(new Coloring(subscribers, position, isClicked));
	}, [position]);

	useEffect(() => {
		if(!subscribers)
			return;
		subscribers.boolArray = boolArray;
	}, [boolArray]);

	useEffect(()=> {
		const length = bodyArray.length;
		const bodies : tdType = {};
		for(let i=0; i<length; i++){
			for(let j=0; j<length; j++){
				bodies[i+","+j] = false;
			}
		}
		setBoolArray(bodies);
		setScriber(new Subscribe(boolArray, setBoolArray));
	}, [bodyArray]);

	return (
		<>
		{
			subscribers && 
			<Table
				subscribers = {subscribers}
				weekDay = {weekDay}
				bodyArray = {bodyArray}
				boolArray = {boolArray}
			/>
		}
		</>
	)
};

export default Provider;