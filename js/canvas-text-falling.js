function Canvas(){
    if(this.isntance){
        return this.isntance;
    }else{
        this.textFalling = new Array();
        this.texts = new Array();
        return this;
    }
}

//初始化canvas
Canvas.prototype.Init = function(){
    // 清除默认边距样式
    document.styleSheets.length || document.head.appendChild(document.createElement('style'));
    document.styleSheets[0].addRule("*","margin:0px;padding:0px;");
    // 创建画布
    var canvas = document.createElement("canvas");
    // 设置画布样式
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    canvas.style.backgroundColor = "grey";
    // canvas.style.background= "linear-gradient(skyblue,grey,grey,grey,#7888aa)";
    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.top = "0px";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
}

/* 

start 19968
end 40869

*/

Canvas.prototype.generateText = function(){
    var textFalling = this.textFalling;
    var canvas = this.canvas;
    if(textFalling.length<3){
        var d = Math.floor(Math.random()*20901)+19968;
        d = d.toString(16);
        var u = "%u"+d;
        var t = unescape(u);
        var text = {
            cX:Math.floor(canvas.width/3*Math.random()) +canvas.width/3,
            cY:0,
            cR:Math.floor(Math.random()*360),
            text:t,
        }
        textFalling.push(text);
    }
}
Canvas.prototype.drawText = function(){
    var ctx = this.ctx;
    var canvas = this.canvas;
    var textFalling = this.textFalling;
    var texts = this.textFalling;
    this.generateText();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<textFalling.length;i++){
        ctx.beginPath();
        ctx.font = "80px 宋体";
        ctx.fillStyle = "black";
        ctx.fillText(textFalling[i].text,textFalling[i].cX,textFalling[i].cY);
        ctx.closePath();
        if(textFalling[i].cR!=0){
            console.log("旋转");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.save();
            ctx.beginPath();
            ctx.translate(textFalling[i].cX+40, 40);
            ctx.rotate(textFalling[i].cR*Math.PI/180);
            ctx.fillText(textFalling[i].text,0,0);
            textFalling[i].cR = 0;
            ctx.closePath();
            // ctx.restore();
            
        }
        textFalling[i].cY += 2;
    }
}
var canvas = new Canvas();
canvas.Init();
setInterval(function(){
    canvas.drawText();
},90);