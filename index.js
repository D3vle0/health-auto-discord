const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('credentials.json'));

const prefix = ';';
const embed_color = '#ed3e5b';
const url = 'https://n1net4il.kr:2932/selfCheck?name=';
const query = '&year=2004&region=%EA%B2%BD%EA%B8%B0%EB%8F%84&level=%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90&query=%ED%95%9C%EA%B5%AD%EB%94%94%EC%A7%80%ED%84%B8%EB%AF%B8%EB%94%94%EC%96%B4%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90';
let status = 0;

console.log("bot token = " + data.token)

bot.on('ready', () => {
  console.log('Logged in!\n\";자가진단\" 을 입력해 자동 자가진단을 켜세요!');
  bot.user.setPresence({
    status: "online",
  })
});

bot.on('message', msg => {
  let args = msg.content.substring(prefix.length).split(" ");
  if (args[0] === '자가진단') {
    if (msg.author.id != "671631736404180992")
      msg.channel.send("권한이 없습니다!");
    else if (!status) {
      msg.channel.send(":rocket: 자동 자가진단이 켜졌습니다!");
      status = 1;
      var x = setInterval(function () {
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (hour == 8) {
          const student = JSON.parse(fs.readFileSync('student.json'));
          for (var i = 0; i < student.length; i++) {
            request(url + encodeURI(student[i]) + query, (error, response, html) => {
              if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(student[i]) + " 완료!");
              }
            });
          }
          msg.channel.send(":fire: 모든 사용자에 대해 자가진단을 완료했습니다!");
        }
      }, 1 * 3600000);
    }
    else if (status)
      msg.channel.send("이미 켜져있습니다!");
  }
  else if (args[0] === '추가') {
    const student = JSON.parse(fs.readFileSync('student.json'));
    var cnt = 0;
    if (args[1]) {
      for (var i = 0; i < student.length; i++) {
        if (student[i] === args[1]) {
          msg.channel.send("이미 등록된 사용자입니다!");
          cnt = 1;
          break;
        }
      }
      if (!cnt) {
        msg.channel.send(`${args[1]} 테스트 중...`);
        request(url + encodeURI(args[1]) + query, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            if (html == '{\"success\":true}')
              console.log('asdfasdfasdf');
            student.push(args[1]);
            fs.writeFile("student.json", JSON.stringify(student), err => {
              if (err)
                throw err;
              else {
                console.log(`${args[1]} 추가 완료!`);
                msg.channel.send(`${args[1]} 추가 완료!`);
              }
            });
            cnt = 0
          }
        });
      }
    }
    else {
      msg.channel.send("`;추가 <이름>` 을 입력하면 실제 존재하는 이름인지 확인하는 목적으로 자가진단을 1회 할거야!");
    }
  }
  else if (args[0] === '사용자') {
    const student = JSON.parse(fs.readFileSync('student.json'));
    var text = "";
    for (var i = 0; i < student.length; i++)
      text += student[i] + "\n";
    msg.channel.send("```" + text + "```");
  }
  else if (args[0] === '삭제') {
    msg.channel.send("아직 구현이...");
  }
});

bot.login(data.token)





















//
