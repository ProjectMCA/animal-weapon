//skillのデータテーブル(JSON)
/*
記述形式は以下の通り
no : スキルのナンバー
image : スキルの画像ファイル名
height : スキルの表示画像の縦幅(ピクセル単位)
width : スキルの表示画像の横幅(ピクセル単位)
frame : スキルの初期表示フレーム番号指定
name : スキルの名前
power : スキルの攻撃力(倍率表記)
priority : スキルの優先度
time : スキルのエフェクト表示時間(フレーム単位)
*/
var skills = {
  0 : {
    no : 0,
    image : 'data/effect/attack_effect1.png',
    height : 100,
    width : 100,
    frame : 0,
    name : '切り裂く',
    power : 1.2,
    priority : -1,
    time : 7
  },
  1 : {
    no :1,
    image : 'data/effect/attack_effect2.png',
    height : 100,
    width : 100,
    frame : 0,
    name : '体当たり',
    power : 0.8,
    priority : 1,
    time : 7
  },
  2 : {
    no : 2,
    image : 'data/effect/attack_effect3.png',
    height : 100,
    width : 100,
    frame : 0,
    name : '引っ掻く',
    power : 1,
    priority : 0,
    time : 7
  }
}
