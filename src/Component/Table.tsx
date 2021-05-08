import React, { useEffect, useState } from 'react';
import { Subscribe } from '.';
import { EventType, tdType } from './Type';

type Props = {
	subscribers : Subscribe;
	weekDay : string[];
	bodyArray : number[];
	boolArray : tdType;
}

const Table = ({subscribers, weekDay, bodyArray, boolArray} : Props) => {

	const clickHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseDown', event);
	}

	const moveHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseMove', event);
	}
	
	const doneHandler = (event : EventType) => {
		event.preventDefault();
		subscribers.publish('mouseUp', event);
	}

	return (
		<div>
			<table onMouseDown={clickHandler} onMouseMove={moveHandler} onMouseUp={doneHandler}>
				<thead>
					<tr>
						{weekDay.map(day => <th key={day}>{day}</th>)}
					</tr>
				</thead>
				<tbody>
				{
					bodyArray.map((idx) => (
						<tr key={idx}>
							{
								bodyArray.map((idx2) => {
									const id = `${idx},${idx2}`;
									return (
										<td key={idx2} id={id} className={boolArray[id]?"clicked":""}>({idx},{idx2})</td>
									);
								})
							}
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	);
};

export default Table;