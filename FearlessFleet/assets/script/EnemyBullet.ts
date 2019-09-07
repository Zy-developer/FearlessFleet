
const {ccclass, property} = cc._decorator;

/**
 * 敌机子弹.
 */
@ccclass
export default class EnemyBullet extends cc.Component {

    start () {
        this.node.runAction(cc.moveBy(1, 0, -250).repeatForever());
    }


    update(dt) {
        if (this.node.y < -1000) {
            this.node.destroy();
        }
    }
}
