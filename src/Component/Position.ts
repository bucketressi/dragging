import { Subscribe } from '.';
import { Point, PointList, EventType } from './Type';

export default class Position{
	// 클릭, 지나가는 td, 마지막 위치 저장
	public startPos : Point;
	public savePos : PointList;
	public endPos : Point;
	private subscribers : Subscribe;

	constructor(subscribers : Subscribe){
		this.startPos = [0, 0];
		this.savePos = [];
		this.endPos = [0, 0];
		this.subscribers = subscribers;
		this.init();
	}

	init(){
		this.subscribers.subscribe('clickStart', this.start);
	}

	start(event? : EventType){
		if(!event)
			return;
		const target : Element = (event.target as Element);
		const row = target.id.substr(0,1);
		const col = target.id.substr(2,1);
		console.log(row, col);
	}

}