let bg1
let player
let mon
let cursor
let bullet
let scoreText
let score = 0
let style
let countBullet = 0

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
        player = this.physics.add.sprite(250, 700, 'ch').setScale(0.2).setCollideWorldBounds(true)
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

        bullet = this.physics.add.image(player.x, player.y - 60, 'planet').setScale(0.3)

        cursor = this.input.keyboard.createCursorKeys()

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                this.createBullet();
                bullet.setVelocityY(-200)
                    // if (bullet.y <= 0) {
                    //     bullet.destroy
                    // }

            },
            callbackScope: this,
            loop: true
        });

        style = { font: '32px Arial', fill: '#FFFFFF' };
        scoreText = this.add.text(16, 16, "Score : 0", style)

        this.physics.add.collider(mon, bullet, hitmons)
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

    createBullet() {
        bullet = this.physics.add.image(player.x, player.y - 60, 'planet').setScale(0.3)
    }



}

function hitmons(mon, bullet) {
    console.log(this)
    mon.destroy
    bullet.destroy
    score += 100;
    scoreText.setText('Score: ' + score);

}

export default GameScene;