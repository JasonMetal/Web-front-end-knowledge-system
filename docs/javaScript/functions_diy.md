# DIY 函数

## 字符串处理

```js
//驼峰转换下划线
//exp: enterGame => enter_game

    protected toLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }

    /**
        * 加载js文件
        * @param fileName: any
        * @param type: string  text/javascript
"
        */

    public static loadjsfile(fileName: any, type:string) {

        let oHead:any = document.getElementsByTagName('HEAD').item(0);
        let srcScript:any = document.createElement("script");

        srcScript.type = "text/javascript";
        srcScript.charset = "utf-8";
        srcScript.src = fileName;

        oHead.appendChild(srcScript);
    }


```
