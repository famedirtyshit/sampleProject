let bg
let player
let monster
let cursor
let monsters
let bullet
let bullets
let health=5
let hp
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.spritesheet('player', 'src/image/character.png', { frameWidth: 68, frameHeight: 68 })
        this.load.image('bg', 'src/image/background.png')
        this.load.image('bullet','src/image/Bullet.png')
        this.load.spritesheet('monster', 'src/image/monster.png', { frameWidth: 2232, frameHeight: 2232 })
        this.load.spritesheet('hp','src/image/HP.png',{frameWidth:2510,frameHeight:1510})
    }

    create() {
        bg = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'bg').setOrigin(0, 0)
        player = this.physics.add.sprite(300, 850, 'player').setCollideWorldBounds(true)
        hp = this.physics.add.sprite(450,50,'hp').setScale(0.1)

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            framerate: 10,
            repeat: -1
        }
        )

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            framerate: 10,
            repeat: -1
        }
        )
        
        this.anims.create({
            key: 'stop',
            frames: [{ key: 'player', frame: 4 }],
            framerate: 10,
            repeate: -1
        })

        this.anims.create({
            key: 'fly',
            frames:this.anims.generateFrameNumbers('monster',{start:0,end:2}),
            framerate: 10,
            repeate: -1
        })


        

        monsters = this.physics.add.group()
        bullets = this.physics.add.group()

        cursor = this.input.keyboard.createCursorKeys()

        

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), 0, 'monster').setScale(0.05)
                monsters.add(monster)             
                monsters.setVelocityY(300)
                if (monster.y >= this.game.config.height) {
                    monster.destroy()
                }
            },
            callbackScope: this,
            loop: true
        });
       

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                bullet = this.physics.add.image(player.x, player.y - 100, 'bullet').setScale(0.5)
                bullets.add(bullet)
                bullets.setVelocityY(-150)
                if(bullet.y<=0){
                    bullet.destroy()
                }
            },
            callbackScope: this,
            loop: true
        })

        this.physics.add.overlap(player,monsters,function(monster){  
            switch(health){
                case 5:hp.setFrame(1)
                break;
                case 4:hp.setFrame(2)
                break;
                case 3:hp.setFrame(3)
                break;
                case 2:hp.setFrame(4)
                break;
                case 1:hp.setFrame(5)
                break;
                case 0:break;
            }
            health -= 1
           // monster.destroy()
        })


    }

    update() {
        bg.tilePositionY -= 3

       

       // monster.anims.play('fly',true)
        

        if (cursor.left.isDown) {
            player.setVelocityX(-300)
            player.anims.play('left',true)
        } else if (cursor.right.isDown) {
            player.anims.play('right', true)
            player.setVelocityX(300)
        } else {
            player.setVelocityX(0)
           player.anims.play('stop', true )
        }




    }

    



}

export default GameScene;
