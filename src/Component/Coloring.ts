import { Dispatch } from 'react';
import { Subscribe, Position, IsClicked, Debounce } from '.';
import { Point, tdType, PointList, ColorPoint } from './Type';

export default class Coloring{
	public startBoolean : boolean;
	private subscribers : Subscribe;
	private position : Position;
	private isClicked : IsClicked;
	private movePoints : Array<string> = []; // 현재 endPoint 까지의 점

	constructor(subscribers : Subscribe, position : Position, isClicked : IsClicked){
		this.subscribers = subscribers;
		this.startBoolean = false;
		this.position = position;
		this.isClicked = isClicked;
		this.init();
	}
	init(){
		this.subscribers.subscribe('startPointSave', this.start.bind(this));
		this.subscribers.subscribe('movePointSave',  this.move.bind(this));
		this.subscribers.subscribe('endPointSave', this.end.bind(this));
	}
	
	start(){
		// 첫 위치의 기존 상태 저장
		if(!this.isClicked.isClicked || !this.position.startPos)
			return;
		const pos : Point = this.position.startPos;
		const id : string = pos[0]+","+pos[1];
		this.startBoolean = this.subscribers.boolArray[id];

		const str : string = [pos[0],pos[1],this.subscribers.boolArray[id]].join('/');

		this.movePoints = [str]; // 첫 위치 저장
		const res : tdType = {};
		Object.assign(res,this.subscribers.boolArray);
		res[id] = !this.subscribers.boolArray[id]; // 첫 위치의 boolean toggle
		this.subscribers.setBoolArray(res);
	}

	move(){
		// 이동 되는 위치의 상태 저장
		// 이동 시 기존보다 작아졌으면 기존 상태 반영해서 되돌리기
		if(!this.isClicked.isClicked || !this.position.startPos || !this.position.endPos)
			return;
		this.saveMovePoints();
	}

	end(){
		console.log("end");
	}

	async saveMovePoints(){
		if(!this.position.startPos || !this.position.endPos)
			return;
		const nextMovePoints : Array<string> = [];
		const addedMovePoints : Array<string> = [];
		const startPos = this.position.startPos;
		const endPos = this.position.endPos;
		const r1 = startPos[0] < endPos[0]? startPos[0] : endPos[0];
		const r2 = startPos[0] > endPos[0]? startPos[0] : endPos[0];
		const c1 = startPos[1] < endPos[1]? startPos[1] : endPos[1];
		const c2 = startPos[1] > endPos[1]? startPos[1] : endPos[1];

		for(let i=r1; i<=r2; i++){
			for(let j=c1; j<=c2; j++){
				// i,j 저장하기
				const boolean = this.subscribers.boolArray[`${i},${j}`];
				const str = [i,j,boolean].join('/');
				await nextMovePoints.push(str);
				if(!this.movePoints.includes(str))
					addedMovePoints.push(str); // 새로 추가된 point
			}
		}
		
		const res : tdType = {};
		Object.assign(res,this.subscribers.boolArray);
		this.coloringAdded(addedMovePoints, res);
		// nextMovePoints에 없는데 이전에는 있었던 값 => 삭제되었으므로 되돌려주기
		const deletedMovePoints = await this.movePoints.filter((point : string) => !nextMovePoints.includes(point));
		console.log(this.movePoints);
		console.log(addedMovePoints);
		console.log(deletedMovePoints);
		await this.coloringBack(deletedMovePoints, res);
		await this.subscribers.setBoolArray(res);

		this.movePoints = nextMovePoints;
	}
	async coloringAdded(points : Array<string>, res: tdType){
		await points.forEach((str) => {
			let r,c;
			[r,c] = str.split('/');
			const id : string = r+","+c;
			const boolean = (!this.startBoolean);
			res[id] = boolean;
			console.log("add",r,c,boolean,res);
		});
	}
	coloringBack(points : Array<string>, res: tdType){
		points.forEach((str) => {
			let r,c,b;
			[r,c,b] = str.split('/');
			const id : string = r+","+c;
			const boolean = (b==="true");
			res[id] = boolean;
			console.log("back",r,c,boolean,res);
		});
	}
	// coloring(row : string, col : string, boolean : boolean){
	// 	const id : string = row+","+col;
	// 	const res : tdType = {};
	// 	Object.assign(res,this.subscribers.boolArray);
	// 	res[id] = boolean;
	// 	this.subscribers.setBoolArray(res);
	// 	console.log(id, boolean, res);
	// }
}