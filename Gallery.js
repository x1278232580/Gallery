function Gallery(div_,option) {
    // 找到所有的div
    var out = document.querySelector(div_);
    
    if(option.row &&
        option.col &&
        option.row * option.col != out.children.length){
            throw 'row && col err'
        }
        var defaultOption = {
            row:5,
            col:4,
            maxWidth:350,
            maxHeight:420,
            minWidth:100,
            minHeight:80,
        }
        Object.assign(defaultOption,option);

        out.style.width = defaultOption.maxWidth + (defaultOption.col - 1) * defaultOption.minWidth+'px';

        var stime = new Date().getTime();
        var timer = null;

        function activePic(index) {
            if(timer){
                clearTimeout(timer)
            timer = null
        }
            var endtime = new Date().getTime();
            if(endtime - stime<500){
                timer = setTimeout(function () {
                    activePic(index);
                },500)
                return false;
            }
            stime = endtime;
           
            // 设置图片大小
            var currentx = index % defaultOption.col;
            var currenty = parseInt(index/defaultOption.col);
            console.log(index,currentx,currenty);
            for(var x = 0;x<defaultOption.col;x++){
                for(var y = 0;y<defaultOption.row;y++){
                     var currentIndex = y*defaultOption.col+x;
                     if(currentx == x && currenty == y){
                         out.children[currentIndex].style.width = defaultOption.maxWidth+'px';
                         out.children[currentIndex].style.height = defaultOption.maxHeight+'px';
                     }else if(currentx == x){
                        out.children[currentIndex].style.width = defaultOption.maxWidth+'px';
                        out.children[currentIndex].style.height = defaultOption.minHeight+'px';
                     }else if(currenty == y){
                        out.children[currentIndex].style.width = defaultOption.minWidth+'px';
                        out.children[currentIndex].style.height = defaultOption.maxHeight+'px';
                     }else{
                        out.children[currentIndex].style.width = defaultOption.minWidth+'px';
                        out.children[currentIndex].style.height = defaultOption.minHeight+'px';
                     }
                }
            }
            
        }

        activePic(0);
        for(var  i = 0;i<out.children.length;i++){
            out.children[i].index=i;
            out.children[i].onmouseenter = function () {
                activePic(this.index);
            }
        }
}


