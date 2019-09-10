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
export default class MainMenu extends cc.Component {

    // 闯关.
    @property({type: cc.Button, tooltip: "闯关按钮."})
    rushLevelButton: cc.Button = null;
    // 帮助.
    @property({type: cc.Button, tooltip: "帮助按钮."})
    helpButton: cc.Button = null;
    // 设置.
    @property({type: cc.Button, tooltip: "设置按钮."})
    settingButton: cc.Button = null;
    // 背景音乐.
    @property({type: cc.AudioClip, tooltip: "背景音乐."})
    bgAudio: cc.AudioClip = null;
    // 点击按钮音效.
    @property({type: cc.AudioClip, tooltip: "按钮点击音效."})
    touchAudioClip: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // cc.log("--- MainMenu.start() ---");
        cc.audioEngine.playMusic(this.bgAudio, true);
        // 绑定按钮事件.
        // this.rushLevelButton.node.on(cc.Node.EventType.TOUCH_END, this.onRushLevelAction, this);
        // this.helpButton.node.on(cc.Node.EventType.TOUCH_END, this.onHelpAction, this);
        // this.settingButton.node.on(cc.Node.EventType.TOUCH_END, this.onSettingAction, this);
    }
    
    onRushLevelAction () {
        cc.audioEngine.stopMusic();
        cc.audioEngine.playEffect(this.touchAudioClip, false);
        cc.director.loadScene("Gameplay");
    }
    
    onHelpAction () {
        cc.log("--- 点击帮助按钮. ---");
    }
    
    onSettingAction () {
        cc.log("--- 点击设置按钮. ---");
    }

    // update (dt) {}
}
