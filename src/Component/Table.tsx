import React from 'react';

const Table = () => {
	const weekDay = ["월", "화", "수", "목", "금", "토", "일"];
	const bodyArray = [0, 1, 2, 3, 4, 5, 6];

	return (
		<div>
			<table>
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