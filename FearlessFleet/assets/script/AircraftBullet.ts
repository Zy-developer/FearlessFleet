

const { ccclass, property } = cc._decorator;

/**
 * 主角子弹.
 */
@ccclass
export default class AircraftBullet extends cc.Component {

    @property({type: [cc.SpriteFrame], tooltip: "子弹等级纹理."})
    frameArray: cc.SpriteFrame[] = [];

    start () {
        this.node.runAction(cc.moveBy(1, 0, 450).repeatForever());
    }

    /** 根据子弹等级, 更换纹理. */
    onChangeFrame () {
        // MARK: 更换纹理.
    }

    update(dt) {
        if (this.node.y > 1500) {
            this.node.destroy();
        }
    }

}

