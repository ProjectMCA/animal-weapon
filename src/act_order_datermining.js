//commandsデータ（仮置き）
var commands = [
  {
    id : 1,
    status : {
      hp : 200,
      atk : 30,
      spd : 20
    },
    skill : {
      power : 0.8,
      priority : 0
    }
  },
  {
    id : 2,
    status : {
      hp : 200,
      atk : 50,
      spd : 20
    },
    skill : {
      power : 0.8,
      priority : 1
    }
  },
  {
    id : 3,
    status : {
      hp : 200,
      atk : 40,
      spd : 30
    },
    skill : {
      power : 0.8,
      priority : 1
    }
  }
];//準備フェイズ部分と合併時に削除or変更

//スキルpriority、キャラspdの順に降順ソートする
//実際にはスキルの前に攻撃など各種コマンドのpriorityソートをかけることになる
commands.sort(
  (first, next) => next.skill.priority - first.skill.spriority || next.status.spd - first.status.spd
)



console.log(commands);
