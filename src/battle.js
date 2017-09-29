//あとで大木さんのと繋げてください
//初期設定
enchant();

window.onload = function() {

  var core = new Core(320, 320);
  core.fps = 16;
  core.preload(
    'data/map/map1.png', 'data/chara/chara0.png', 'data/chara/chara5.png',
    'data/chara/chara6.png', 'data/chara/monster1.gif',
    'data/chara/monster3.gif', 'data/chara/monster4.gif'
  );

  core.onload = function() {

    //初期表示のグループ化
    var stage = new Group();

    //戦闘マップを作成
    var map = new Map(16, 16); //mapの1タイルの表示サイズ
    map.image = core.assets['data/map/map1.png']; //mapの画像ファイル指定
    map.loadData(field.bg); //マップデータ読み込み
    stage.addChild(map); //stageにmapを加える

    //アニマルの作成
    var ani; //アニマルのデータを格納する変数
    ani = animals[parseInt(Math.random()* 3)]; //animalsの3体のうち1体をランダムで設定
    //aniに設定されたアニマルデータを元にエネミーを作成する
    var animal = new Sprite(32, 32, map);
    animal.image = core.assets[ani.image]; //animalの画像ファイルの指定
    animal.frame = 22; //animalの画像フレーム番号
    animal.x = 100; //animalを表示するx座標
    animal.y = 160; //animalを表示するy座標
    animal.name = ani.name;
    animal.maxhp = ani.maxhp;
    animal.hp = ani.hp;
    animal.atk = ani.atk;
    animal.spd = ani.spd;
    stage.addChild(animal); //stageにanimalを加える

    //enemysの作成
    var ene; //エネミーのデータを格納する変数
    ene = enemys[parseInt(Math.random()* 3)]; //enemysの3体のうち1体をランダムで設定
    //eneに設定されたエネミーデータを元にエネミーを作成する
    var enemy = new Sprite(48, 48, map);
    enemy.image = core.assets[ene.image];
    enemy.frame = 3;
    enemy.x = 200;
    enemy.y = 150;
    enemy.name = ene.name;
    enemy.maxhp = ene.maxhp;
    enemy.hp = ene.hp;
    enemy.atk = ene.atk;
    enemy.spd = ene.spd;
    stage.addChild(enemy);

    //アニマルのHP表示のラベル作成
    var animalHPlabel = new Label;
    animalHPlabel.text = 'HP:' + animal.hp + '/' + animal.maxhp;
    animalHPlabel.x = 80;
    animalHPlabel.y = 140;
    stage.addChild(animalHPlabel);

    //エネミーのHP表示のラベル作成
    var enemyHPlabel = new Label;
    enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;
    enemyHPlabel.x = 180;
    enemyHPlabel.y = 140;
    stage.addChild(enemyHPlabel);

    //戦闘処理の実装

    //テキストのラベル表示
    var text1 = new Label(animal.name + 'の攻撃!');
    text1.x = 100;
    text1.y = 250;
    text1.flag = false;
    var text2 = new Label(enemy.name + 'に' + animal.atk + 'ダメージ!');
    text2.x = 100;
    text2.y = 250;
    text2.flag = false;

    //攻撃コマンドの作成
    var attackLabel = new Label('攻撃');
    attackLabel.x = 16;
    attackLabel.y = 100;
    attackLabel.color = '#000000';
    attackLabel.font = '20px sens-serif';
    stage.addChild(attackLabel);

    //シーンを作成
    var scene = new Scene();
    //attackLabelの「touchstart」イベントが発生した時に実行するリスナ
    attackLabel.addEventListener('touchstart', function(e) {
      var sendText = new Label('【次へ】');
      sendText.x = 250;
      sendText.y = 300;
      sendText.color = '#000000';
      sendText.font = '14px sens-serif';
      stage.addChild(sendText);
      stage.removeChild(attackLabel);

      //テキストのラベル作成
      var text1 = new Label(animal.name + 'の攻撃!');
      text1.x = 100;
      text1.y = 250;
      text1.flag = false;
      var text2 = new Label(enemy.name + 'に' + animal.atk + 'ダメージ!');
      text2.x = 100;
      text2.y = 250;
      text2.flag = false;

      //後攻のhpから先攻のatkを引く
      enemy.hp -= animal.atk;

      //後攻のhpが「0」以下になったら、後攻のhpを0にする
      if (enemy.hp < 0) {
        enemy.hp = 0;
      };
      //hp表示ラベルを更新する
      enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;

      sendText.addEventListener('touchstart', function(e) {
        if (text1.flag == false && text2.flag == false) {
          text1.flag = true;
          stage.addChild(text1);
        }

        else if (text1.flag == true && text2.flag == false) {
          text1.flag = false;
          stage.removeChild(text1);

          text2.flag = true;
          stage.addChild(text2);
        }

        else if (text1.flag == false && text2.flag == true){
          text2.flag = false;
          stage.removeChild(text2);
        }

      });
    });
  core.rootScene.addChild(stage);
  }

  core.start();
}

/*
//プレイヤーを作成するクラス（失敗）
var Player = enchant.Class.create(enchant.Sprite, {
  initialize : function(x, y, map) {
    enchant.Sprite.call(this, 32, 32);
    this.x = x;
    this.y = y;
    var image = new Surface(96, 128);
    image.draw(core.assets['chara5.png'], 0, 0, 96, 128, 0, 0, 96, 128);
    this.image = image;
    this.isMoving = false; // 移動フラグ(移動中なら「true」)
    this.direction = 0; // 向き
    this.walk = 0; // 歩行アニメーションの基準フレーム番号を保持するプロパティ
    this.acount = 0; // 攻撃アクション中のフレーム数を保持するプロパティ
    // 「enterframe」イベントリスナ
    this.addEventListener('enterframe', function() {

      //プレイヤーの移動処理
    });
  }
});
*/
