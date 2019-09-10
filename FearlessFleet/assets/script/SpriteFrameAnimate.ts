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
export default class SpriteFrameAnimate extends cc.Component {
    
    @property({tooltip: "是否加载就播放."})
    playOnLoad = false;
    
    @property({tooltip: "帧动画时长."})
    duration = 0.0;
    
    @property({tooltip: "是否循环播放."})
    isLoop = false;
    
    @property({type: [cc.SpriteFrame], tooltip: "动画帧数组."})
    spriteFrames: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        if (this.playOnLoad) {
            this.onLoadSpriteFrameAnimate();
        }
    }
    
    /** 加载帧动画. */
    onLoadSpriteFrameAnimate () {
        // 创建帧动画剪辑.
        const clip = cc.AnimationClip.createWithSpriteFrames(this.spriteFrames, this.duration);
        if (this.isLoop) {
            // 设置动画使用的循环模式.
            clip.wrapMode = cc.WrapMode.Loop;
        }
        // 获取/创建动画组件.
        const animate = this.getComponent(cc.Animation) || this.addComponent(cc.Animation);
        // 添加动画剪辑.
        animate.addClip(clip, "def");
        // 设置默认动画剪辑.
        animate.defaultClip = clip;
        // 播放动画.
        animate.play('def');
        
        cc.log(this.spriteFrames, clip, animate);
    }

    // update (dt) {}
}
