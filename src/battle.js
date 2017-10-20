//あとで大木さんのと繋げてください
//初期設定
enchant();

// 選択肢を作成する関数
var makeSelect = function(text, y) {
    var label = new Label(text);
    label.font = "16px monospace";
    label.color = "rgb(255,200,0)";
    label.y = y;
    label.width = 320;
    return label;
}
//実装につきグローバル変数にしたかった変数群、仮置きなので問題があれば変更してください
var Avatar;
var Skill = enchant.Class.create(enchant.Sprite, {
  initialize: function(x, y, no) {
    var skillData = skills[no];
    enchant.Sprite.call(this, skillData.width, skillData.height);
    this.x = x;
    this.y = y;
    this.name = skillData.name;
    this.power = skillData.power;
    this.priority = skillData.priority;
    this.frame = skillData.frame;
    this.time = skillData.time;
  }
});
var player = new Sprite(32, 32);
var enemy = new Sprite(48, 48);
var playerHPlabel = new Label;
var enemyHPlabel = new Label;
var message = new Label;  //戦闘メッセージの諸々設定
message.font = "16px monospace";
message.color = "rgb(255,255,255)";
message.backgroundColor = "rgba(0, 0, 0, 0.5)";
message.y = 320 - 32 * 3;
message.width = 320;
message.height = 32 * 3;

window.onload = function() {

  var core = new Core(320, 320);
  core.fps = 16;
  core.preload(
    'data/map/map1.png', 'data/chara/monster1.gif',
    'data/chara/monster3.gif', 'data/chara/monster4.gif',
    'data/othres/clear.png', 'data/othres/end.png',
    'data/animals/animal_cat.png', 'data/effect/attack_effect1.png',
    'data/effect/attack_effect2.png', 'data/effect/attack_effect3.png'
  );
  core.time = 0;

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
    var start = new Label('始める');
    start.font = "16px monospace";
    start.color = "rgb(255,255,255)";
    start.x = 140;
    start.y = 200;
    scene.addChild(start);

    //選択肢のイベントリスナ
    start.addEventListener('touchstart', function() {
      core.replaceScene(core.battlePreparation());
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
    player.image = core.assets[ani.image]; //playerの画像ファイルの指定
    player.frame = ani.frame; //playerの画像フレーム番号
    player.x = 100; //playerを表示するx座標
    player.y = 160; //playerを表示するy座標
    player.name = ani.name;
    player.maxhp = ani.maxhp;
    player.hp = ani.hp;
    player.atk = ani.atk;
    player.spd = ani.spd;
    player.skills = {
      set1 : ani.skills.set1,
      set2 : ani.skills.set2,
      set3 : ani.skills.set3
    }
    player.select = 0; //選択したスキルnoを格納する変数
    player.tl.clear();
    scene.addChild(player);

    //enemysの作成
    var ene; //エネミーのデータを格納する変数
    ene = enemys[parseInt(Math.random()* 3)]; //enemysの3体のうち1体をランダムで設定
    //eneに設定されたエネミーデータを元にエネミーを作成する
    enemy.image = core.assets[ene.image];
    enemy.frame = 3;
    enemy.x = 200;
    enemy.y = 150;
    enemy.tick = 0;
    enemy.name = ene.name;
    enemy.maxhp = ene.maxhp;
    enemy.hp = ene.hp;
    enemy.atk = ene.atk;
    enemy.spd = ene.spd;
    enemy.tl.clear();
    scene.addChild(enemy);

    //アニマルのHP表示のラベル作成
    playerHPlabel.text = 'HP:' + player.hp + '/' + player.maxhp;
    playerHPlabel.x = 80;
    playerHPlabel.y = 140;

    //エネミーのHP表示のラベル作成
    enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;
    enemyHPlabel.x = 180;
    enemyHPlabel.y = 140;

    //戦闘開始メッセージの作成

    message.text = enemy.name+'が現れた!';
    scene.addChild(message);
    message.tl.action({
      time : 16,
      onactionend : function() {
        scene.removeChild(message);
        scene.removeChild(player);
        scene.removeChild(enemy);
        core.pushScene(core.actSelect());
      }
    });

    return scene;
  }

  //戦闘時、行動選択シーン
  core.actSelect = function() {

    //シーンを作成
    var scene = new Scene();
/*
    var playerHpBar = new Entity();
    playerHpBar.width = 100;
    playerHpBar.height = 8;
    playerHpBar.backgroundColor = '#00ff00';
    playerHpBar.x = player.x - 10;
    playerHpBar.y = player.y - 20;
    scene.addChild(playerHpBar);
*/
    //表示するスプライト、ラベルの引き継ぎ
    scene.addChild(player);
    scene.addChild(enemy);
    scene.addChild(playerHPlabel);
    scene.addChild(enemyHPlabel);

    //戦闘コマンドの作成
    var battleLabel = new Label('戦う');
    battleLabel.x = 16;
    battleLabel.y = 100;
    battleLabel.color = '#000000';
    battleLabel.font = '16px sens-serif';
    battleLabel.flg = true;
    scene.addChild(battleLabel);
    //battleLabelの「touchstart」イベントが発生した時に実行するリスナ
    battleLabel.addEventListener('touchstart', function() {
      if (battleLabel.flg && escapeLabel.flg) {
        //スキルラベルの表示
        var skillSelect1 = new Label(player.skills.set1.name);
        skillSelect1.x = battleLabel.x;
        skillSelect1.y = battleLabel.y;
        skillSelect1.color = '#000000';
        skillSelect1.font = '16px sens-serif';
        var skillSelect2 = new Label(player.skills.set2.name);
        skillSelect2.x = battleLabel.x;
        skillSelect2.y = battleLabel.y + 20;
        skillSelect2.color = '#000000';
        skillSelect2.font = '16px sens-serif';
        var skillSelect3 = new Label(player.skills.set3.name);
        skillSelect3.x = battleLabel.x;
        skillSelect3.y = battleLabel.y + 40;
        skillSelect3.color = '#000000';
        skillSelect3.font = '16px sens-serif';
        var backSelect = new Label('戻る');
        backSelect.x = battleLabel.x;
        backSelect.y = battleLabel.y + 60;
        backSelect.color = '#000000';
        backSelect.font = '16px sens-serif';
        //ラベルの入れ替え
        scene.removeChild(battleLabel);
        scene.removeChild(escapeLabel);
        scene.addChild(skillSelect1);
        scene.addChild(skillSelect2);
        scene.addChild(skillSelect3);
        scene.addChild(backSelect);
        //各スキルラベルのイベントリスナ
        skillSelect1.addEventListener('touchstart', function() {
          player.select = player.skills.set1.no;
          //複数作成されないように表示しているスプライト、ラベルの消去
          scene.removeChild(player);
          scene.removeChild(enemy);
          scene.removeChild(playerHPlabel);
          scene.removeChild(enemyHPlabel);
          scene.removeChild(skillSelect1);
          scene.removeChild(skillSelect2);
          scene.removeChild(skillSelect3);
          scene.removeChild(backSelect);
          //準備が終わったら戦闘実行シーンへ
          core.pushScene(core.battle());
        });

        skillSelect2.addEventListener('touchstart', function() {
          player.select = player.skills.set2.no;
          //複数作成されないように表示しているスプライト、ラベルの消去
          scene.removeChild(player);
          scene.removeChild(enemy);
          scene.removeChild(playerHPlabel);
          scene.removeChild(enemyHPlabel);
          scene.removeChild(skillSelect1);
          scene.removeChild(skillSelect2);
          scene.removeChild(skillSelect3);
          scene.removeChild(backSelect);
          //準備が終わったら戦闘実行シーンへ
          core.pushScene(core.battle());
        });

        skillSelect3.addEventListener('touchstart', function() {
          player.select = player.skills.set3.no;
          //複数作成されないように表示しているスプライト、ラベルの消去
          scene.removeChild(player);
          scene.removeChild(enemy);
          scene.removeChild(playerHPlabel);
          scene.removeChild(enemyHPlabel);
          scene.removeChild(skillSelect1);
          scene.removeChild(skillSelect2);
          scene.removeChild(skillSelect3);
          scene.removeChild(backSelect);
          //準備が終わったら戦闘実行シーンへ
          core.pushScene(core.battle());
        });

        backSelect.addEventListener('touchstart', function() {
          //複数作成されないように表示しているスプライト、ラベルの消去
          scene.removeChild(skillSelect1);
          scene.removeChild(skillSelect2);
          scene.removeChild(skillSelect3);
          scene.removeChild(backSelect);
          //準備が終わったら前の状態へ
          scene.addChild(battleLabel);
          scene.addChild(escapeLabel);
        });
      }
    });

    //逃げるコマンドの作成
    var escapeLabel = new Label('逃げる');
    escapeLabel.x = 16;
    escapeLabel.y = 120;
    escapeLabel.color = '#000000';
    escapeLabel.font = '16px sens-serif';
    escapeLabel.flg = true;
    scene.addChild(escapeLabel);
    //escapeLabelの「touchstart」イベントが発生した時に実行するリスナ
    escapeLabel.addEventListener('touchstart', function() {
      if (battleLabel.flg && escapeLabel.flg) {
        escapeLabel.flg = false;
        message.text = '今回はデモ戦闘なので逃げられない！';
        scene.addChild(message);
        message.tl.delay(12).then(function() {
          escapeLabel.flg = true;
        }).removeFromScene();
      }
    });

    return scene;
  }

  //戦闘実行シーン
  core.battle = function() {

    //シーンを作成
    var scene = new Scene();

    //表示するスプライト、ラベルの引き継ぎ
    scene.addChild(player);
    scene.addChild(enemy);
    scene.addChild(playerHPlabel);
    scene.addChild(enemyHPlabel);

    //選択したスキルを作成
    var playerSkill = new Skill(enemy.x - 26, enemy.y - 26, player.select);
    playerSkill.image = core.assets[skills[player.select].image];
    //エネミーのスキル選択(今回はランダム)
    enemy.select = Math.floor(Math.random()* 3);
    var enemySkill = new Skill(player.x - 34, player.y - 34, enemy.select);
    enemySkill.image = core.assets[skills[enemy.select].image];

    //enemyのhpからplayerのatk*skillのpowerを引く
    enemy.hp -= player.atk * playerSkill.power;

    //enemyのhpが「0」以下になったら、enemyのhpを0にする
    if (enemy.hp < 0) {
      enemy.hp = 0;
    }

    //戦闘エフェクトを表示する
    scene.addChild(playerSkill);
    playerSkill.tl.action({
      time : playerSkill.time,
      onactiontick : function() {
        playerSkill.frame ++;
      }
    }).removeFromScene();
    //戦闘メッセージを表示する
    message.text = player.name + 'の' + playerSkill.name + '!';
    scene.addChild(message);
    message.tl.delay(12).action({
      time : 12,
      onactionstart : function() {
        //enemyの被ダメージ演出（点滅）
        enemy.tl.fadeOut(1).fadeIn(1).fadeOut(1).fadeIn(1);
        //メッセージ切り替え
        message.text = enemy.name + 'に' + (player.atk*playerSkill.power) + 'ダメージ!';
        //hp表示ラベルを更新する
        enemyHPlabel.text = 'HP:' + enemy.hp + '/' + enemy.maxhp;
      },
      onactionend : function() {
        //戦闘終了判定
        if (enemy.hp <= 0) {
          message.tl.clear();
          core.pushScene(core.win());
        }
        else {
          //戦闘エフェクトを表示する
          scene.addChild(enemySkill);
          enemySkill.tl.action({
            time : enemySkill.time,
            onactiontick : function() {
              enemySkill.frame ++;
            }
          }).removeFromScene();
          //メッセージの切り替え
          message.text = enemy.name + 'の' + enemySkill.name + '!';
          //playerのhpからenemyのatk*skillのpowerを引く
          player.hp -= enemy.atk * enemySkill.power;
          //enemyのhpが「0」以下になったら、enemyのhpを0にする
          if (player.hp < 0) {
            player.hp = 0;
          }
        }
      }
    }).delay(12).action({
      time : 12,
      onactionstart : function() {
        //playerの被ダメージ演出（点滅）
        player.tl.fadeOut(1).fadeIn(1).fadeOut(1).fadeIn(1);
        //メッセージの切り替え
        message.text = player.name + 'に' + (enemy.atk*enemySkill.power) + 'ダメージ!';
        //hp表示ラベルを更新する
        playerHPlabel.text = 'HP:' + player.hp + '/' + player.maxhp;
      },
      onactionend : function() {
        //戦闘終了判定
        if (player.hp <= 0) {
          message.tl.clear();
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
    gameover.addEventListener('touchstart', function() {
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
