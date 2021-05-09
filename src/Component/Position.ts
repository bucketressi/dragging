import { Subscribe, Debounce, IsClicked } from '.';
import { Point, EventType } from './Type';

export default class Position{
	// 클릭, 지나가는 td, 마지막 위치 저장
	public startPos : Point | undefined;
	public endPos : Point | undefined;
	private subscribers : Subscribe;
	private isClicked : IsClicked;

	constructor(subscribers : Subscribe, isClicked : IsClicked){
		this.startPos = undefined;
		this.endPos = undefined;
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
		const target : Element = (event.target as Element);
		try{
			const row = Number(target.id.substr(0,1));
			const col = Number(target.id.substr(2,1));
			this.startPos = [row, col];
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
		this.saveEndPoint(event);
	}

	end(event? : EventType){
		if(!event)
			return;
		this.saveEndPoint(event);
		this.subscribers.publish('endPointSave', event);
		this.startPos = undefined;
		this.endPos = undefined;
	}

	saveEndPoint(event : EventType){
		const target : Element = (event.target as Element);
		try{
			const row = Number(target.id.substr(0,1));
			const col = Number(target.id.substr(2,1));
			if(this.endPos && this.endPos[0] == row && this.endPos[1] == col){
				// 이전 값과 같으면 (같은 칸에서 움직이고 있으면) 건너뛰기
				return;
			}
			this.endPos = [row, col];
			this.subscribers.publish('movePointSave', event);
		}catch(error){
			console.log(error);
			console.log("끝 위치가 저장 안되었어요.");
			return;
		}
	}
}