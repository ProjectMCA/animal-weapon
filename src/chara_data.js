//あとで大木さんのと繋げてください
//戦闘シーンのanimals(プレイヤー操作側)とenemys(NPC)のデータテーブル(JSON)
/*記入データテンプレ(暫定)
image : キャラクターの画像ファイル名(後で追加)
name : キャラクターの名前
maxhp : キャクターの最大体力
hp : キャラクターの体力
atk : キャラクターの攻撃力
spd : キャクターの攻撃速度
*/
//animalsのデータテーブル(暫定)
var animals = {
  0 : {
    name : 'animalA'
    maxhp : 100,
    hp : 100,
    atk : 25,
    spd : 10
  },
  1 : {
    name : 'animalB'
    maxhp : 100,
    hp : 100,
    atk : 20,
    spd : 10
  },
  2 : {
    name : 'animalC'
    maxhp : 100,
    hp : 100,
    atk : 30,
    spd : 5
  }
}

//enemysのデータテーブル(暫定)
var enemys = {
  0 : {
    name : 'enemyA'
    maxhp : 100,
    hp : 100,
    atk : 25,
    spd : 20
  },
  1 : {
    name : 'enemyB'
    maxhp : 100,
    hp : 100,
    atk : 20,
    spd : 15
  },
  2 : {
    name : 'enemyC'
    maxhp : 100,
    hp : 100,
    atk : 30,
    spd : 5
  }
}
