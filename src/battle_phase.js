//act_order_datermining.js内のsortedCommandsを利用

//sortedCommandsが空配列であるかの判定
while (sortedCommands.length > 0) {
  var actor = sortedCommands[0];  //sortedCommandsの先頭を取得
  
  //actorの行動終了後の処理
  if (actor.category == "animal") {
    animals.push(actor);  //actorがanimalカテゴリーならanimals[]へ
  } else {
    enemys.push(actor);  //そうでないならenemys[]へ
  };

  sortedCommands.shift();  //sortedCommandsの先頭を削除
};

console.log(animals);
console.log(enemys);
