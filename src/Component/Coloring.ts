import { Dispatch } from 'react';
import { Subscribe, Position, IsClicked, Debounce } from '.';
import { Point, tdType, PointList, ColorPoint } from './Type';

export default class Coloring{
	public startBoolean : boolean;
	private subscribers : Subscribe;
	private position : Position;
	private isClicked : IsClicked;
	private movePoints : Set<string> = new Set<string>();

	constructor(subscribers : Subscribe, position : Position, isClicked : IsClicked){
		this.subscribers = subscribers;
		this.startBoolean = false;
		this.position = position;
		this.isClicked = isClicked;
		this.init();
	}
	init(){
		this.subscribers.subscribe('startPointsave', this.start.bind(this));
		this.subscribers.subscribe('movePointSave',  this.move.bind(this));
		this.subscribers.subscribe('endPointSave', this.end.bind(this));
	}
	
	start(){
		// 첫 위치의 기존 상태 저장
		if(!this.isClicked.isClicked)
			return;
		console.log("coloring start");
		const pos : Point = this.position.startPos;
		const id : string = pos[0]+","+pos[1];
		this.startBoolean = this.subscribers.boolArray[id];
	}

	move(){
		// 이동 되는 위치의 상태 저장
		// 이동 시 기존보다 작아졌으면 기존 상태 반영해서 되돌리기
		if(!this.isClicked.isClicked)
			return;
		const pos : Point = this.position.endPos;
		const row = pos[0]; const col = pos[1];
		const id : string = pos[0]+","+pos[1];
		const boolean = this.subscribers.boolArray[id];
		console.log(boolean);
		this.movePoints.add(`${pos[0]}/${pos[1]}/${boolean}`);
		console.log("coloring move");
	}

	end(){
		this.isClicked.isClicked = false;
		console.log(this.movePoints);
		console.log("coloring end");
	}
}