//あとで大木さんのと繋げてください
//初期設定
enchant();

// 選択肢を作成する関数
var makeSelect = function(text, y) {
    var label = new Label(text);
    label.font  = "16px monospace";
    label.color = "rgb(255,200,0)";
    label.y     = y;
    label.width = 320;
    return label;
}

//実装につきグローバル変数にしたかった変数群、仮置きなので問題があれば変更してください
var animal = new Sprite(32, 32);
var enemy = new Sprite(48, 48);
var animalHPlabel = new Label;
var enemyHPlabel = new Label;
var message = new Label;  //戦闘メッセージの諸々設定
message.font = "16px monospace";
message.color = "rgb(255,255,255)";
message.backgroundColor = "rgba(0, 0, 0, 0.5)";
message.y = 320 - 32 * 3;
message.width = 320;
message.height = 32 * 3;
//メッセージの切り替えフラグ管理用変数（使わない方法探してます）
var nextMessageFlag = 0;

window.onload = function() {

  var core = new Game(320, 320);
  core.fps = 16;
  core.preload(
    'data/map/map1.png', 'data/chara/chara0.png', 'data/chara/chara5.png',
    'data/chara/chara6.png', 'data/chara/monster1.gif',
    'data/chara/monster3.gif', 'data/chara/monster4.gif',
    'data/othres/clear.png', 'data/othres/end.png',
  );
  console.log(core);

  core.onload = function() {
    core.pushScene(core.title());
  }

  //タイトルシーン
  core.title = function() {

    //シーンを作成
    var scene = new Scene;

    //背景設定
    scene.backgroundColor = '#A0C238';

    //タイトル（仮）の作成
    var titleLabel = new Label('Animal Weapon');
    titleLabel.font = '32px monospace';
    titleLabel.color = "rgb(255,255,255)";
    titleLabel.x = 50;
    titleLabel.y = 100;
    scene.addChild(titleLabel);

    //選択肢の作成（今回は1つ）
    var start = new Label('始める')
    start.font = "16px monospace";
    start.color = "rgb(255,255,255)";
    start.x = 140;
    start.y = 200;
    scene.addChild(start);

    //選択肢のイベントリスナ
    start.addEventListener('touchstart', function(e) {
      core.replaceScene(core.battlePreparation());
      core.pushScene(core.actSelect());
    });

    return scene;
  }

  //戦闘準備シーン
  core.battlePreparation = function() {

    //シーンを作成
    var scene = new Scene;

    //戦闘マップを作成
    var map = new Map(16, 16); //mapの1タイルの表示サイズ
    map.image = core.assets['data/map/map1.png']; //mapの画像ファイル指定
    map.loadData(field.bg); //マップデータ読み込み
    scene.addChild(map); //stageにmapを加える

    //アニマルの作成
    var ani; //アニマルのデータを格納する変数
    ani = animals[Math.floor(Math.random()* 3)]; //animalsの3体のうち1体をランダムで設定
    //aniに設定されたアニマルデータを元にエネミーを作成する
    animal.image = core.assets[ani.image]; //animalの画像ファイルの指定
    animal.frame = 22; //animalの画像フレーム番号
    animal.x = 100; //animalを表示するx座標
    animal.y = 160; //animalを表示するy座標
    animal.name = ani.name;
    animal.maxhp = ani.maxhp;
    animal.hp = ani.hp;
    animal.atk = ani.atk;
    animal.spd = ani.spd;
    scene.addChild(animal); //stageにanimalを加える

    //enemysの作成
    var ene; //エネミーのデータを格納する変数
    ene = enemys[parseInt(Math.random()* 3)]; //enemysの3体のうち1体をランダムで設定
    //eneに設定されたエネミーデータを元にエネミーを作成する
    enemy.image = core.assets[ene.image];
    enemy.frame = 3;
    enemy.x = 200;
    enemy.y = 150;
    enemy.name = ene.name;
    enemy.maxhp = ene.maxhp;
    enemy.hp = ene.hp;
    enemy.atk = ene.atk;
    enemy.spd = ene.spd;
    scene.addChild(enemy);

    //アニマルのHP表示のラベル作成
    animalHPlabel.text = 'HP:' + animal.hp + '/' + animal.maxhp;
    animalHPlabel.x = 80;
    animalHPlabel.y = 140;

    //エネミーのHP表示のラベル作成
    enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;
    enemyHPlabel.x = 180;
    enemyHPlabel.y = 140;

    core.pushScene(core.actSelect());

    return scene;
  }

  //戦闘時、行動選択シーン
  core.actSelect = function() {

    //シーンを作成
    var scene = new Scene();

    //攻撃コマンドの作成
    var attackLabel = new Label('攻撃');
    attackLabel.x = 16;
    attackLabel.y = 100;
    attackLabel.color = '#000000';
    attackLabel.font = '20px sens-serif';
    scene.addChild(attackLabel);

    scene.addChild(animalHPlabel);
    scene.addChild(enemyHPlabel);

    //attackLabelの「touchstart」イベントが発生した時に実行するリスナ
    attackLabel.addEventListener('touchstart', function(e) {
      //複数作成されないように表示しているラベル群の消去
      scene.removeChild(attackLabel);
      scene.removeChild(animalHPlabel);
      scene.removeChild(enemyHPlabel);
      //準備が終わったら戦闘実行シーンへ
      core.pushScene(core.battle());
    });

    return scene;
  }

  //戦闘実行シーン
  core.battle = function() {

    //シーンを作成
    var scene = new Scene();

    //ラベルの再生成
    scene.addChild(animalHPlabel);
    scene.addChild(enemyHPlabel);

    //フラグリセット
    var nextMessageFlag = 0;

    //enemyのhpからanimalのatkを引く
    enemy.hp -= animal.atk;

    //enemyのhpが「0」以下になったら、enemyのhpを0にする
    if (enemy.hp < 0) {
      enemy.hp = 0;
    };

    //戦闘メッセージを表示する
    //戦闘メッセージ群を作成する
    message.text = animal.name + 'の攻撃!';
    scene.addChild(message);
    //メッセージを送るラベルを作成
    var next = makeSelect('【次へ】', 320 - 32);
    scene.addChild(next);

    //nextラベルのイベントリスナ
    next.addEventListener('touchstart', function(e) {
      if (nextMessageFlag == 0) {
        //メッセージ切り替え
        message.text = enemy.name + 'に' + animal.atk + 'ダメージ!';

        nextMessageFlag = 1;

        //hp表示ラベルを更新する
        enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;

      }
      else if (nextMessageFlag == 1) {
        //戦闘終了判定
        if (enemy.hp <= 0) {
          core.pushScene(core.win());
        }
        else {
          //メッセージの切り替え
          message.text = enemy.name + 'の攻撃!';
          nextMessageFlag = 2;

          //animalのhpからenemyのatkを引く
          animal.hp -= enemy.atk;
          //enemyのhpが「0」以下になったら、enemyのhpを0にする
          if (animal.hp < 0) {
            animal.hp = 0;
          };
        }

      }
      else if (nextMessageFlag == 2) {
        //メッセージの切り替え
        message.text = animal.name + 'に' + enemy.atk + 'ダメージ!';
        nextMessageFlag = 3;

        //hp表示ラベルを更新する
        animalHPlabel.text = 'HP:' + animal.hp + '/' + animal.maxhp;

      }
      else if (nextMessageFlag == 3) {
        nextMessageFlag = 0;

        //戦闘終了判定
        if (animal.hp <= 0) {
          core.pushScene(core.lose());
        }
        else {
          core.replaceScene(core.actSelect());
        }

      }
    });

    return scene;
  }

  //勝利シーン
  core.win = function() {

    //シーンを作成
    var scene = new Scene();

    //勝利画面作成
    var clear = new Sprite(267, 48);
    clear.image = core.assets['data/othres/clear.png'];
    clear.x = 30;
    clear.y = 120;
    clear.addEventListener('touchstart', function(e) {
      core.replaceScene(core.title());
    });
    scene.addChild(clear);

    return scene;
  }

  //敗北シーン
  core.lose = function() {

    //シーンを作成
    var scene = new Scene();

    //敗北画面作成
    var gameover = new Sprite(189, 97);
    gameover.image = core.assets['data/othres/end.png'];
    gameover.x = 60;
    gameover.y = 112;
    gameover.addEventListener('touchstart', function(e) {
      core.replaceScene(core.title());
    });
    scene.addChild(gameover);

    return scene;
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
