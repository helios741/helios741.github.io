/**
 * Created by Helios on 2016/12/4.
 */
function addEvent(cobj,type,dataArr,callback) {
    this.cobj = cobj;
    this.type = type;
    this.dataArr = dataArr;
    this.callBack  = callback;
    this.redraw();
}

addEvent.prototype = {
    redraw:function(){
        if(this.type == "arc") {
            this.cobj.beginPath();
            this.cobj.arc(this.dataArr[0],this.dataArr[1],this.dataArr[2],this.dataArr[3],this.dataArr[4]);
            this.cobj.fill();
        } else if(this.type == "rect") {
            this.cobj.beginPath();
            this.cobj.rect(this.dataArr[0],this.dataArr[1],this.dataArr[2],this.dataArr[3]);
            this.cobj.fill();
        }
    },
    add: function(mx,my) {
        //alert(this.cobj);,
        if(this.cobj.isPointInPath(mx,my)) {
            this.callBack();
        }
    }
};
