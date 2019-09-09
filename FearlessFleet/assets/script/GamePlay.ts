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
export default class GamePlay extends cc.Component {
    
    @property({type: cc.AudioClip, tooltip: "游戏开始音效."})
    gameStarAudioClip: cc.AudioClip = null;
    
    @property({type: cc.AudioClip, tooltip: "游戏背景音乐."})
    bgAudioClip: cc.AudioClip = null;
    
    @property({type: cc.Node, tooltip: "开始-左."})
    startLeft: cc.Node = null;
    
    @property({type: cc.Node, tooltip: "开始-右."})
    startRight: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }

    start () {
        this.onStartAnimate();
        this.onPlayGameStarAndBgAudio();
    }
    
    /** 播放背景音乐与开始音效. */
    onPlayGameStarAndBgAudio () {
        cc.audioEngine.playMusic(this.bgAudioClip, true);
        cc.audioEngine.playEffect(this.gameStarAudioClip, false);
    }
    
    /** 开始动画. */
    onStartAnimate () {
        const leftMove = cc.moveBy(1, -450, 0);
        const rightMove = cc.moveBy(1, 450, 0);
        const self = this;
        const callback = cc.callFunc(() => {
            self.startLeft.destroy();
            self.startRight.destroy();
        }, this);
        this.startLeft.runAction(leftMove);
        this.startRight.runAction(cc.sequence(rightMove, callback));
    }

    // update (dt) {}
}
