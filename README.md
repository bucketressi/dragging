- [ ] ## 계획


<목표>

- [ ] table 드래그 시 cell이 선택될 수 있도록 하기
- [ ] table 드래그 하는 중에 드래그 하는 table cell이 ui적으로 표시될 수 있도록 하기
- [ ] 모바일도 가능하면 적용하기



<사용 기술>

- [ ] subscribe로 이벤트 구독, 삭제, 배포 하기
- [ ] pointer 위치를 저장해두면서 어디까지가 선택의 범위인지 계산하기
- [ ] 기존 table cell의 상태를 저장해두면서 되돌릴 수 있도록 하기
- [ ] mouse가 움직이는 것에 이벤트 x => 들어오고 나가는 것에 이벤트를 두기
- [ ] 이벤트는 버블링을 이용하여 가장 상위 DOM에 부착하기



<이슈>

- [ ] React.MouseEvent<HTMLTableElement, MouseEvent>는 target.value 받아오지 못함

```js
const target : Element = (event.target as Element);
console.log(target.id);
```

https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript