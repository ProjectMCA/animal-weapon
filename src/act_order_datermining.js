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
      spd : 0
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
      spd : 100
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
      spd : 100
    }
  }
];//準備フェイズ部分と合併時に削除or変更

//スキルspd、キャラspdの順に降順ソートする
commands.sort(
  (first, next) => next.skill.spd - first.skill.spd || next.status.spd - first.status.spd
)



console.log(commands);
