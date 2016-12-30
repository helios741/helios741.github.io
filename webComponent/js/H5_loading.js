var H5_loading = function(images,firstPage){
    var id = this.id;
    if(this._imgages === undefined) {
        
        this._imgages = (images || []).length;
        this._load = 0;
        window[id] = this;
        for(s in images) {
            var item = images[s];
            var img = new Image;
            img.onload = function(){
                window[id].loader();
            }
            img.src = item;
        }
        $("#rate").text("0%");
        return this;
    } else{
        this._load++;
        $("#rate").text( (this._load/this._imgages *100)>>0 +"%" );
        if(this._load < this._imgages) return ;
    }
    window[id] = null;
    this.el.fullpage({
        onLeave:function(index,nextIndex,direction){
            $(this).find(".h5_component").trigger("onLeave");
        },
        afterLoad:function(anchorLink,index){
            $(this).find(".h5_component").trigger("onLoad");
        }
    });
    this.page[0].find(".h5_component").trigger("onLoad");
    this.el.show();
    if(firstPage) $.fn.fullpage.moveTo(firstPage);
}
