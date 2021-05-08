import { Subscribe, Debounce, IsClicked } from '.';
import { Point, EventType } from './Type';

export default class Position{
	// 클릭, 지나가는 td, 마지막 위치 저장
	public startPos : Point;
	public endPos : Point;
	private subscribers : Subscribe;
	private isClicked : IsClicked;

	constructor(subscribers : Subscribe, isClicked : IsClicked){
		this.startPos = [0, 0];
		this.endPos = [0, 0];
		this.subscribers = subscribers;
		this.isClicked = isClicked;
		this.init();
	}

	init(){
		this.subscribers.subscribe('mouseDown', this.start.bind(this));
		this.subscribers.subscribe('mouseMove', Debounce(this.move.bind(this), 100));
		this.subscribers.subscribe('mouseUp', this.end.bind(this));
	}

	start(event? : EventType){
		if(!event)
			return;
		console.log("position start");
		const target : Element = (event.target as Element);
		try{
			const row = Number(target.id.substr(0,1));
			const col = Number(target.id.substr(2,1));
			this.startPos = [row, col];
			console.log(this.startPos);
		}catch(error){
			console.log(error);
			console.log("시작 위치가 저장 안되었어요.");
			return;
		}
		this.subscribers.publish('startPointSave', event); // startPoint가 저장되었으면 publish
	}

	move(event? : EventType){
		if(!event)
			return;
		if(!this.isClicked.isClicked)
			return;
		console.log("position move");
		this.saveEndPoint(event);
		console.log(this.endPos);
		this.subscribers.publish('movePointSave', event);
	}

	end(event? : EventType){
		if(!event)
			return;
		console.log("position end");
		this.saveEndPoint(event);
		this.subscribers.publish('endPointSave', event);
	}

	saveEndPoint(event : EventType){
		const target : Element = (event.target as Element);
		try{
			const row = Number(target.id.substr(0,1));
			const col = Number(target.id.substr(2,1));
			this.endPos = [row, col];
			console.log(this.endPos);
		}catch(error){
			console.log(error);
			console.log("끝 위치가 저장 안되었어요.");
			return;
		}
	}
}