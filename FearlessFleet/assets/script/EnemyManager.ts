

const {ccclass, property} = cc._decorator;

/**
 * 敌机管理.
 */
@ccclass
export default class EnemyManager extends cc.Component {

    @property({type: cc.Prefab, tooltip: '敌人1'})
    prefabEnemy1: cc.Prefab = null;


    start () {
        this.schedule(this.creatEnemy1.bind(this), 5);
    }

    // update (dt) {}


    private creatEnemy1() {
        const node: cc.Node = cc.instantiate(this.prefabEnemy1);
        node.parent = this.node;
    }
}
