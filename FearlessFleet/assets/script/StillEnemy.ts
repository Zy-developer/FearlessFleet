import DataCenter from "./DataCenter";

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

/** 静止的敌机. */
@ccclass
export default class StillEnemy extends cc.Component {
    
    @property({type: cc.Prefab, tooltip: "子弹."})
    enemyBullet: cc.Prefab = null;

    @property({type: cc.AudioClip, tooltip: "死亡音效."})
    dieEffect: cc.AudioClip = null;

    private fnFire;

    onLoad () {
        this.setPoint();
        this.onVerticalMove();
        this.fnFire = this.onEmissionBullet.bind(this);
        this.schedule(this.fnFire, 3);
    }

    start () {

    }
    
    /** 设置坐标位置. */
    private setPoint () {
        const size = cc.view.getVisibleSize();
        this.node.y = size.height / 2;
        let x = -(size.width / 2) + (Math.random() * size.width);
        const width_2 = size.width / 2;
        const nodeW_2 = this.node.width / 2;
        const minX = -width_2 + nodeW_2;
        const maxX = width_2 - nodeW_2;
        if (x < minX) {
            x = minX;
        } else if (x > maxX) {
            x = maxX;
        }
        this.node.x = x;
    }
    
    /** 垂直移动. */
    private onVerticalMove () {
        const size = cc.view.getVisibleSize();
        this.node.runAction(cc.sequence(
            cc.moveTo(30, this.node.x, -size.height / 2),
            cc.callFunc(this.node.destroy.bind(this.node))
        ));
    }
    
    /** 发射子弹. */
    private onEmissionBullet () {
        const node: cc.Node = cc.instantiate(this.enemyBullet);
        node.parent = this.node.parent;
        node.x = this.node.x;
        node.y = this.node.y - 100;
    }

    // update (dt) {}

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        this.unschedule(this.fnFire);

        self.enabled = false;
        DataCenter.score++;

        const animate: cc.Animation = this.getComponent(cc.Animation);
        const aniState: cc.AnimationState = animate.getAnimationState("EnemyDieAni");
        if (aniState.isPlaying == false) {
            animate.play();
            cc.audioEngine.playEffect(this.dieEffect, false);
            animate.on("finished", function () {
                this.node.destroy();
            }, this);
        }
    }

}
