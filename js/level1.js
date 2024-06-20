const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 950,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let map;
let groundLayer;
let skyLayer;
let stars;

const game = new Phaser.Game(config);

function preload() {

    this.load.image('star', 'assets/banana.png');

this.load.tilemapTiledJSON('map', 'tiled/level1.json');

this.load.spritesheet('spritesheet', 'tiled/spritesheet.png', { frameWidth: 16, frameHeight: 16 });

    this.load.spritesheet('dude', 'assets/monkey.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {

    map = this.make.tilemap({key: 'map'});

    const tiles = map.addTilesetImage('spritesheet');

    groundLayer = map.createLayer('Ground', tiles, 0, 0);

    groundLayer.setCollisionByExclusion([-1]);

    skyLayer = map.createLayer('Sky', tiles, -1, -1);

    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    player = this.physics.add.sprite(100, 1250, 'dude');

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(groundLayer, player);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7   }),
        frameRate: 10,
        repeat: -1
    });


    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        setXY: { x: 750, y: -40, stepX: 0 }
    });

    this.physics.add.collider(stars, groundLayer);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);


}


function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-200);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(200);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor()) {
        player.setVelocityY(-470);
    }
}

function collectStar (player, star)
{

    window.location.replace("level2.html");
    
}