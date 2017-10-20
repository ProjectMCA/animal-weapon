//戦闘シーンのanimals(プレイヤー操作側)とenemys(NPC)のデータテーブル(JSON)
/*記入データテンプレ(暫定)
category : キャラクターのカテゴリー
image : キャラクターの画像ファイル名(後で追加)
height : キャラクターの表示画像の縦幅(ピクセル単位)
width : キャラクターの表示画像の横幅(ピクセル単位)
frame : キャラクターの初期表示フレーム番号指定(画像ファイルによっては不要になるかも)
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
    image : 'data/animals/animal_cat.png',
    height : 32,
    width : 32,
    frame : 25,
    name : 'animalA',
    maxhp : 200,
    hp : 200,
    atk : 30,
    spd : 20,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  },
  1 : {
    category : 'animal',
    image : 'data/animals/animal_cat.png',
    height : 32,
    width : 32,
    frame : 28,
    name : 'animalB',
    maxhp : 200,
    hp : 200,
    atk : 20,
    spd : 10,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  },
  2 : {
    category : 'animal',
    image : 'data/animals/animal_cat.png',
    height : 32,
    width : 32,
    frame : 31,
    name : 'animalC',
    maxhp : 200,
    hp : 200,
    atk : 25,
    spd : 5,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  }
}

//enemysのデータテーブル(暫定)
var enemys = {
  0 : {
    category : 'enemy',
    image : 'data/chara/monster1.gif',
    height : 48,
    width : 48,
    frame : 3,
    name : 'enemyA',
    maxhp : 200,
    hp : 200,
    atk : 25,
    spd : 20,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  },
  1 : {
    category : 'enemy',
    image : 'data/chara/monster3.gif',
    height : 48,
    width : 48,
    frame : 3,
    name : 'enemyB',
    maxhp : 200,
    hp : 200,
    atk : 20,
    spd : 15,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  },
  2 : {
    category : 'enemy',
    image : 'data/chara/monster4.gif',
    height : 48,
    width : 48,
    frame : 3,
    name : 'enemyC',
    maxhp : 200,
    hp : 200,
    atk : 30,
    spd : 5,
    skills : {
      set1 : skills[0],
      set2 : skills[1],
      set3 : skills[2]
    }
  }
}
