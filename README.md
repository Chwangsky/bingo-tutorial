### BINGO-SIMPLE 구현 과제

## 구현할 내용
1. **초기 상태**
   - start 버튼과 add player 버튼이 있다.
   - 초기 게임의 상태는 initial 상태(혹은 start가 아닌 상태)이다.
2. **플레이어 추가**
   - add player 버튼을 누를 때마다 각 플레이어의 상태를 나타내는 3x3 grid의 board가 추가된다.
   - 각 board의 cell들은 비어있다.
   - 각 board의 cell들은 1부터 15 사이의 숫자를 입력할 수 있다.
   - 각 board의 cell들은 중복된 숫자를 가질 수 없다.
3. **start 버튼 활성화 조건**
   - 플레이어 수가 2명 이상이고, 각 board의 칸이 모두 채워졌을 경우에만 start 버튼이 활성화되며, 누를 수 있다.
4. **게임 시작**
   - start 버튼을 누르면, 게임의 상태는 start가 된다.
5. **게임 진행**
   - 상태가 start인 경우, 1부터 15 사이의 숫자를 입력받을 수 있는 form이 나온다.
     1. 유효한 숫자를 제출 시, 각 플레이어의 칸들 중 그 숫자와 동일한 숫자에 해당하는 칸을 색칠한다.
     2. 만약 숫자를 제출한 후, 빙고를 만족하게 되면, 어떤 플레이어가 승리했는지 결과값을 띄운다.
6. **게임 중 상태 변경**
   - 상태가 start인 경우, board 칸을 변경할 수 없으며, add player 버튼은 사라지게 된다. 
   - 상태가 start인 경우, start 버튼은 reset 버튼으로 바뀌며, reset 버튼을 클릭하면 최초의 상태로 돌아온다.

## 제한사항
- 반드시 Observer 디자인 패턴을 사용할 것.

## 추가 고려사항
- 숫자의 범위 및 board의 크기를 언제든지 변경할 수 있도록 구현할 것.
- 승리의 조건이 1 빙고가 아닌 경우를 고려하여 구현할 것.

## 구현하면서 아쉬웠던 부분
- gamestate 별 별도의 BingoCell과 BingoBoard를 만들었면 좀 더 clean한 코드가 되지 않았을까 하는 아쉬움이 있다.
- game