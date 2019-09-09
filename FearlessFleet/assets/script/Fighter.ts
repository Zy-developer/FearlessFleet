// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fighter extends cc.Component {

    @property({type: cc.Prefab, tooltip: "主角的子弹."})
    bullet: cc.Prefab = null;

    @property({type: cc.ProgressBar, tooltip: "血量条."})
    booldBar: cc.ProgressBar = null;

    @property({type: cc.AudioClip, tooltip: "死亡背景音效."})
    dieEffect: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(this.onAircraftBullet.bind(this), .8);
    }

    start () {
        // 触摸监听.
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    
    private onTouchStart (event) {}
    
    private onTouchMoved (event: cc.Event.EventTouch) {
        const size = cc.view.getVisibleSize();
        const minX = this.node.width / 2;
        const maxX = size.width - minX;
        let x = this.node.x + event.getDeltaX();
        if (x < minX) {
            x = minX;
        } else if (x > maxX) {
            x = maxX;
        }
        this.node.x = x;

        const minY = this.node.height / 2;
        const maxY = size.height - minY - 80;
        let y = this.node.y + event.getDeltaY();
        if (y < minY) {
            y = minY;
        } else if (y > maxY) {
            y = maxY;
        }
        this.node.y = y;
    }
    
    private onTouchEnd (event) {}

    /** 创建子弹. */
    private onAircraftBullet () {
        const bullet: cc.Node = cc.instantiate(this.bullet);
        bullet.parent = this.node.parent;
        bullet.x = this.node.x;
        bullet.y = this.node.y + this.node.height + 50;
    }

    // update (dt) {}

    /** 碰撞回调. */
    onCollisionEnter (other: cc.Collider, self: cc.Collider) {
        if (other.tag == 0) {
            // 碰撞子弹, 扣血.
            cc.log(this.booldBar.progress);
            if (this.booldBar.progress < 0.2) {
                this.onGameOver();
            } else {
                this.booldBar.progress -= .1;
            }
        } else {
            // 碰撞敌机, 游戏结束.
            this.booldBar.progress = 0;
            this.onGameOver();
        }
    }

    /** 死亡, 游戏结束. */
    onGameOver () {
        cc.audioEngine.playEffect(this.dieEffect, false);
        
        this.unschedule(this.onAircraftBullet);

        const animation: cc.Animation = this.getComponent(cc.Animation);
        animation.play();
        animation.on("finished", function () {
            cc.audioEngine.stopMusic();
            cc.director.loadScene("MainMenu");
        }, this);
    }

}
