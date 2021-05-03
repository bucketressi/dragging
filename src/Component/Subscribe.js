export default class Subscribe{
	constructor(){
		this.subscribers = {};
	}
	subscribe(event, callback){
		// event의 handler로 callback 등록
		if(this.subscribers[event]){
			this.subscribers[event] = [];
		}
		this.subscribers[event].push(callback);

		return this.subscribers[event].length-1;
	}
	unsubscribe(event, callback, idx){
		if(!this.subscribers[event][idx])
			return;
		this.subscribers[event].splice(idx, 1);
	}
	publish(event, data){
		this.subscribers[event].foreach((handler) => handler(data));
	}
}