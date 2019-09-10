// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html

export default class DataCenter {

    public static eventType = {
        CHANGE_SCORE : "CHANGE_SCORE"
    }

    private static _score: number = 0;

    public static set score(v) {
        DataCenter._score = v;
        cc.systemEvent.emit(DataCenter.eventType.CHANGE_SCORE, v);
    }

    public static get score() {
        return DataCenter._score;
    }
    
}


