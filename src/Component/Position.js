// 클릭, 지나가는 td, 마지막 위치 저장
class Position{
	constructor(){
		this.startPos = [0, 0];
		this.savePos = [];
		this.endPos = [0, 0];
	}
	saveStartPos(event){
		console.log(event.target.id);
	}
}