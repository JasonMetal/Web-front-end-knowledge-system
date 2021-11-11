# DIY 函数

## 字符串处理

```
//驼峰转换下划线
//exp: enterGame => enter_game

    protected toLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }

    /**
        * 加载js文件
        * @param filename
        * @param type
        */
        
    public static loadjsfile(filename: any) {
        var oHead:any = document.getElementsByTagName('HEAD').item(0);
        var oScript:any = document.createElement("script");
        oScript.type = "text/javascript";
        oScript.charset = "utf-8";
        oScript.src = filename;
        oHead.appendChild(oScript);
    }


```
