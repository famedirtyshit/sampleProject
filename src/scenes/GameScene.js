let bg1
let player
let mon
let cursor
let ammo
let scoreText
let score = 0

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg', 'src/image/bg.jpg')
            //this.load.image('bg', 'src/image/backgound.png')
        this.load.image('planet', 'src/image/bigplanet.png')
        this.load.image('far', 'src/image/farplanet.png')
        this.load.image('ring', 'src/image/ringplanet.png')
        this.load.image('star', 'src/image/spacestar.png')
        this.load.spritesheet('ch', 'src/image/character.png', { frameWidth: 416, frameHeight: 454 })
    }

    create() {

        bg1 = this.add.tileSprite(0, 0, 800, 600, 'bg').setOrigin(0, 0)
        player = this.physics.add.sprite(200, 550, 'ch').setScale(0.2).setCollideWorldBounds(true)
        mon = this.physics.add.image(400, -50, 'ring')
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ch', { start: 0, end: 3 }),
            framerate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'stop',
            frames: [{ key: 'ch', frame: 0 }],
            framerate: 10,
            repeate: -1
        })



        cursor = this.input.keyboard.createCursorKeys()

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                ammo = this.createAmmo();
                //ammo.setVelocityY(-200)
                /* if(ammo.y<=0){
                     ammo.destroy
                 }*/
            },
            callbackScope: this,
            loop: true
        });



    }

    update() {

        mon.setVelocityY(100)
        bg1.tilePositionY -= 1
        if (mon.y >= 600) {
            mon.destroy
            mon = this.physics.add.image(400, -50, 'ring')
        }
        if (cursor.left.isDown) {
            player.setVelocityX(-300)
        } else if (cursor.right.isDown) {
            player.anims.play('right', true)
            player.setVelocityX(300)
        } else {
            player.setVelocityX(0)
            player.anims.play('stop', true)
        }




    }

    createAmmo() {
        this.physics.add.image(player.x, player.y - 60, 'planet').setScale(0.3)

    }



}

export default GameScene;