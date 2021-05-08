export type Point = [number, number];
export type PointList = Point[];
export type ColorPoint = {
	"row" : number,
	"col" : number,
	"bool" : boolean
}
export type EventType = React.MouseEvent<HTMLTableElement, MouseEvent>;
export type tdType = {
	[id : string] : boolean
};