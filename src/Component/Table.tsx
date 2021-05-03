import React from 'react';
import { Subscribe } from '.';
import { EventType } from './Type';

type Props = {
	subscribers : Subscribe;
}

const Table = ({subscribers} : Props) => {
	const weekDay = ["월", "화", "수", "목", "금", "토", "일"];
	const bodyArray = [0, 1, 2, 3, 4, 5, 6];

	const clickHandler = (event : EventType) => {
		subscribers.publish('clickStart', event);
	}

	return (
		<div>
			<table onMouseDown={clickHandler}>
				<tr>
					{weekDay.map(day => <th>{day}</th>)}
				</tr>
				{
					bodyArray.map((idx) => (
						<tr>
							{
								bodyArray.map((idx2) => (
									<td id={`${idx},${idx2}`}>({idx},{idx2})</td>
								))
							}
						</tr>
					))
				}
			</table>
		</div>
	);
};

export default Table;