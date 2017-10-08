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
    category : 'animal',
    image : 'data/chara/chara5.png',
    name : 'animalA',
    maxhp : 100,
    hp : 100,
    atk : 30,
    spd : 20
  },
  1 : {
    category : 'animal',
    image : 'data/chara/chara0.png',
    name : 'animalB',
    maxhp : 100,
    hp : 100,
    atk : 20,
    spd : 10
  },
  2 : {
    category : 'animal',
    image : 'data/chara/chara6.png',
    name : 'animalC',
    maxhp : 100,
    hp : 100,
    atk : 25,
    spd : 5
  }
}

//enemysのデータテーブル(暫定)
var enemys = {
  0 : {
    category : 'enemy',
    image : 'data/chara/monster1.gif',
    name : 'enemyA',
    maxhp : 100,
    hp : 100,
    atk : 25,
    spd : 20
  },
  1 : {
    category : 'enemy',
    image : 'data/chara/monster3.gif',
    name : 'enemyB',
    maxhp : 100,
    hp : 100,
    atk : 20,
    spd : 15
  },
  2 : {
    category : 'enemy',
    image : 'data/chara/monster4.gif',
    name : 'enemyC',
    maxhp : 100,
    hp : 100,
    atk : 30,
    spd : 5
  }
}
