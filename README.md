# health-auto-discord

 special thanks to <a href="https://github.com/n1net4il">@n1net4il</a>  
 
<a href ="https://github.com/D3vle0/health-auto-check" target="_blank">기존에 python으로 만든 자가진단 자동화 프로그램</a>의 또 다른 버전입니다. 아침마다 파이썬 프로그램을 실행시키는 것 마저 귀찮은 사람들을 위해, 더 많은 사용자들과 공유를 위해 개발하게 되었습니다.  

## 설치
```sh
git clone https://github.com/D3vle0/health-auto-discord.git
cd health-auto-discord

npm init
npm i discord.js request fs
```
## 사용법
`prefix` = `;`  
`;자가진단` : 매일 아침 8시 ~ 8시 10분 사이 자동으로 자가진단  
`;사용자` : 등록된 사용자 출력  
`;추가 <이름>` : 사용자 추가 (맞는 정보인지 자가진단 테스트 1회를 자동 실시합니다)  

## 주의사항

 - :exclamation: **반드시 건강 상태에 이상이 없을 때에만 사용하세요.**
 - 이 프로그램은 디미고 19기 친구들이 쉽게 사용할 수 있도록 최적화되었습니다. 다른 학년 또는 다른 학교 학생들 데이터도 추가하고 싶다면 `index.js` 내의 `query` 상수를 수정하면 됩니다.
 - 19기 친구들은 디미 디스코드 서버에서 `;추가 <이름>` 만 입력하면 됩니다.

