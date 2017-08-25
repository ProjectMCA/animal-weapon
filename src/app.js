enchant();
window.onload = () => {
    let game = new Game(320, 320);
    game.onload = ()=>{
        let label = new Label( "HelloWorld" );
        label.color = "#0000ee";
        label.font = "bold 32px serif"
        label.x = 80;
        label.y = 120;
        game.rootScene.addChild(label);
    };
    game.start();
};
