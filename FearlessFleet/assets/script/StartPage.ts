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
export default class StartPage extends cc.Component {

    // 背景.
    @property(cc.Sprite)
    bgImage: cc.Sprite = null;
    // 点击屏幕开始.
    @property(cc.Sprite)
    star: cc.Sprite = null;
    // 背景音乐.
    @property({type: cc.AudioClip, tooltip: "背景音乐."})
    bgAudio: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 播放背景音效.
        cc.audioEngine.playMusic(this.bgAudio, true);
        // 设置'点击屏幕开始'加载动画.
        this.setStarLoadAnimate();
    }

    start () {
        // 背景添加点击事件监听.
        this.bgImage.node.on(cc.Node.EventType.TOUCH_END, this.loadMainMenuScene, this);
    }
    
    setStarLoadAnimate () {
        // 渐隐动作.
        const fadeOut = cc.fadeOut(1.0);
        // 渐显动作.
        const fadeIn = cc.fadeIn(1.0);
        // 顺序播放动作组.
        const seq = cc.sequence(fadeOut, fadeIn);
        // 无限循环播放动作.
        this.star.node.runAction(cc.repeatForever(seq));
    }
    
    loadMainMenuScene () {
        cc.audioEngine.stopMusic();
        cc.director.loadScene("MainMenu");
    }

    // update (dt) {}
}
