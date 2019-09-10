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

/** 游戏界面工具栏. */
@ccclass
export default class GameToolBar extends cc.Component {

    @property({type: cc.Button, tooltip: "返回主菜单界面按钮."})
    homeButton: cc.Button = null;
    
    @property({type: cc.Button, tooltip: "游戏暂停/开始按钮."})
    gameState: cc.Button = null;
    
    @property({tooltip: "游戏状态.", visible: false})
    isRunGame = true;
    
    @property({type: cc.ProgressBar, tooltip: "血量条."})
    bloodBar: cc.ProgressBar = null;
    
    @property({type: cc.Label, tooltip: "得分Label."})
    scoreLabel: cc.Label = null;
    
    @property({tooltip: "得分.", visible: false})
    score: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.systemEvent.on(DataCenter.eventType.CHANGE_SCORE, this.onAddScoreAction, this);
    }

    start () {
        // 绑定按钮点击事件.
        this.homeButton.node.on(cc.Node.EventType.TOUCH_END, this.onHomeButtonAction, this);
        this.gameState.node.on(cc.Node.EventType.TOUCH_END, this.onGamePauseAndResumeAction, this);
        
        // this.scheduleOnce(() => {
        //     this.bloodBar.progress = 0.2;
        //     this.onAddScoreAction(123);
        // }, 1.5);
    }
    
    /** 返回主菜单界面. */
    onHomeButtonAction (event) {
        cc.audioEngine.stopMusic();
        // cc.audioEngine.playMusic();
        cc.director.loadScene("MainMenu");
    }
    
    /** 游戏暂停/继续. */
    onGamePauseAndResumeAction(event) {
        var name = "";
        if (this.isRunGame) {
            cc.director.pause();
            name = "Resume";
        } else {
            cc.director.resume();
            name = "Pause";
        }
        const url = "GamePlay/" + name;
        const self = this;
        cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.log(err.message);
            } else {
                self.gameState.normalSprite = spriteFrame;
                self.gameState.hoverSprite = spriteFrame;
                self.gameState.pressedSprite = spriteFrame;
            }
        });
        this.isRunGame = !this.isRunGame;
    }
    
    /**
     * 血量条调整.
     * @param isAdd 是否加血.
     */
    onBloodChangeAction (isAdd: boolean) {
        const curProgress = this.bloodBar.progress;
        if (isAdd) {
            if (curProgress > 1) {
                this.bloodBar.progress = curProgress + 0.1;
            }
        } else {
            const progress = curProgress - 0.1;
            if (progress > 0) {
                this.bloodBar.progress = progress;
            } else {
                // 血量为0，游戏结束.
            }
        }
    }
    
    /** 增加分数. */
    onAddScoreAction (data) {
        this.scoreLabel.string = data + "";
    }

    onDestroy () {
        cc.systemEvent.off(DataCenter.eventType.CHANGE_SCORE, this.onAddScoreAction, this);
    }

    // update (dt) {}
}
