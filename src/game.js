enchant();
window.onload = function() {
  
  var game = new Game(320, 320);
  game.fps=16;
       var playerLife=100;
    var playerPower=50;
    var enemyLife=60;
    var enemyPower=30;
    var winer=new Label('yourwin');
 	var loser=new Label('youlose');

    var attack = new Label('attack');
    var attackNotation = new Label('player');
    var damage = new Label('');
    var enemyNotation=new Label('enemy');
    var enemydamage=new Label('');    
    var diffence = new Label("diffence");
    varlose=new Label("lose");
    var reset = new Label("reset");
  game.onload = function() {
 
  init();
  }
  function init(){
  
playerLife=100;
     playerPower=50;
     enemyLife=60;
     enemyPower=30;
     winer=new Label('yourwin');
 	 loser=new Label('youlose');

     attack = new Label('attack');
     attackNotation = new Label('player');
     damage = new Label('');
     enemyNotation=new Label('enemy');
     enemydamage=new Label('');    
     diffence = new Label("diffence");
    lose=new Label("lose");
     reset = new Label("reset");
  

   attackNotation.damage=playerPower;
   enemyNotation.damage=enemyPower;
    attackNotation.visible=false;
    winer.visible=false;
    loser.visible=false;
    
    game.rootScene.addChild(winer);
    game.rootScene.addChild(loser);
    game.rootScene.addChild(attack);
    game.rootScene.addChild(attackNotation);
    game.rootScene.addChild(damage);
    game.rootScene.addChild(enemyNotation);
    game.rootScene.addChild(enemydamage);
    game.rootScene.addChild(reset);
    attackNotation.x=10;
    attackNotation.y=20;
    damage.x = 100;
    damage.y = 0;
    attack.x = 10
    attack.y = 150;
    enemyNotation.x=20;
    enemyNotation.y=200;
    enemyNotation.enemydamage=30;
    enemyNotation.visible=false;
    enemydamage.x=200;
    enemydamage.y=200;
    reset.x=300;
    reset.y=300;
    reset.visible=false;
    attack.addEventListener('touchstart', function() {
      attackNotation.visible=true;
     enemyLife=enemyLife-playerPower;
     
      
    });
    attackNotation.addEventListener('touchstart',function(){
      
      damage.text=String(this.damage);
      damage.visible=true;
      sleep3(2,function(){
        enemyNotation.visible=true;
        EndDetermination();
        
      });
      
    });
    enemyNotation.addEventListener('touchstart',function(){
      enemydamage.text=String(this.enemydamage);
      playerLife=playerLife-enemyPower;
      damage.visible=false;
      attackNotation.visible=false;
      enemyNotation.visible=false;
      enemydamage.visible=true;
      
      sleep3(2,function(){
        enemydamage.visible=false;
        EndDetermination();
        console.log(enemyLife);
        
      });
	
    });
    reset.addEventListener('touchstart',function(){
    attackNotation.visible=false;
    damage.visible=false;
    winer.visible=false;
    reset.visible=false;
    if(enemyLife<0)
    {
    attackNotation.visible=false;
    }
    init();
   
    });
    
  
    diffence.x = 100;
    diffence.y = 150;
    game.rootScene.addChild(diffence);
    
   
    loser.x=200;
    loser.y=200;
    game.rootScene.addChild(loser);
    loser.visible=false;
  }
  
  function EndDetermination(){
    
    if(playerLife>0 && enemyLife>0){

      return;
    }
    if(playerLife<0){
    loser.visible=true;
    }
    if(enemyLife<0){
    enemyNotation.visible=false;
    winer.visible=true;
    }
          
reset.visible=true;
game.rootScene.removeChild(attack);
game.rootScene.removeChild(diffence);  

    
  }
  
  
  function sleep3(waitSec, callbackFunc) {
    
    var spanedSec = 0;
    
    var waitFunc = function () {
      
      spanedSec++;
      
      if (spanedSec >= waitSec) {
        if (callbackFunc) {
          callbackFunc();
        }
        return;
      }
      
      clearTimeout(id);
      id = setTimeout(waitFunc, 1000);
    };
    
    var id = setTimeout(waitFunc, 1000);
    
  }
  
  game.start();
  

}
