<template>
  <div :id="'videoBox' + num" style="height:200px;width:200px;display: inline-block">
    <div :id="'playWnd' + num" class="playWnd" :style="{width:swfWidth+'px'}"></div>
<!--    <el-button id="btn" @click="startPreview">load</el-button>-->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "category",
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      swfHeight: '',
      swfWidth: '',
      //初始化参数
      initparam: {
        appKey: "25432095",
        secret: "RyM9dzh6oBGcadTMgMkw",
        apiIp: "172.20.112.13",
        apiPort: 443,
        layout: "1x1"//这里是来控制你一开始初始化之后的分屏的
      },
      //监控点编号
      pointCode: "154822992453939160",
      pubKey: "",
      oWebControl: null,
      WebControl: null,
      initCount: 0
    }
  },
  mounted() {
    this.swfHeight = document.getElementById("videoBox" + this.num).offsetHeight;
    this.swfWidth = document.getElementById("videoBox"+ this.num).offsetWidth;
    this.initPlugin()
    // $('#app-container').resize(() => {
    //   if (this.oWebControl != null) {
    //     this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
    //     this.setWndCover();
    //   }
    // });
    // 监听滚动条scroll事件，使插件窗口跟随浏览器滚动而移动
    $('.app-container').scroll(() => {
      console.log("滚动条移动")
      if (this.oWebControl != null) {
        this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight);
        this.setWndCover();
      }
    });

  },
  beforeDestroy() {
    this.closeWindow();//关闭插件
  },
  methods: {
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      let uuid = s.join("");
      return uuid;
    },
    initPlugin () {
      let that = this
      // eslint-disable-next-line no-undef
      this.oWebControl = new WebControl({
        szPluginContainer: "playWnd" + this.num,                       //指定容器id
        iServicePortStart: 15900,                           //指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        cbConnectSuccess: () => {
          // setCallbacks();
          //实例创建成功后需要启动服务
          this.oWebControl.JS_StartService("window", {
            dllPath: "./VideoPluginConnect.dll"
          }).then( () => {
            this.oWebControl.JS_CreateWnd("playWnd" + that.num, 1000, 600).then(function () {         //JS_CreateWnd创建视频播放窗口，宽高可设定
              console.log("JS_CreateWnd success");
              that.init();                                 //创建播放实例成功后初始化
            });
          }, function () {

          });
        },
        cbConnectError: () => {
          console.log("cbConnectError");
          this.oWebControl = null;
          $('#playWnd').html("插件未启动，正在尝试启动，请稍候...");
          this.WebControl.JS_WakeUp("VideoWebPlugin://");        //程序未启动时执行error函数，采用wakeup来启动程序
          this.initCount ++;
          if (this.initCount < 3) {
            setTimeout(function () {
              this.initPlugin();
            }, 3000)
          } else {
            $("#playWnd").html("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: () => {
          console.log("cbConnectClose");
          this.oWebControl = null;
        }
      });
    },
    init() {
      this.getPubKey(() => {
        // 请自行修改以下变量值
        let appkey = this.initparam.appKey; //综合安防管理平台提供的appkey，必填
        let secret = this.setEncrypt(this.initparam.secret); //综合安防管理平台提供的secret，必填
        let ip = this.initparam.apiIp; //综合安防管理平台IP地址，必填
        let port = this.initparam.apiPort; //综合安防管理平台端口，若启用HTTPS协议，默认443
        port = parseInt(port);
        let layout = this.initparam.layout;
        let playMode = 0; //初始播放模式：0-预览，1-回放
        let snapDir = "D:\\SnapDir"; //抓图存储路径
        let videoDir = "D:\\VideoDir"; //紧急录像或录像剪辑存储路径
        let enableHTTPS = 1; //是否启用HTTPS协议与综合安防管理平台交互，是为1，否为0
        let encryptedFields = "secret"; //加密字段，默认加密领域为secret
        let showToolbar = 0; //是否显示工具栏，0-不显示，非0-显示
        let showSmart = 1; //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        let buttonIDs =
            "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769"; //自定义工具条按钮
        // 请自行修改以上变量值
        this.oWebControl
            .JS_RequestInterface({
              funcName: "init",
              argument: JSON.stringify({
                appkey: appkey, //API网关提供的appkey
                secret: secret, //API网关提供的secret
                ip: ip, //API网关IP地址
                playMode: playMode, //播放模式（决定显示预览还是回放界面）
                port: port, //端口
                snapDir: snapDir, //抓图存储路径
                videoDir: videoDir, //紧急录像或录像剪辑存储路径
                layout: layout, //布局
                enableHTTPS: enableHTTPS, //是否启用HTTPS协议
                encryptedFields: encryptedFields, //加密字段
                showToolbar: showToolbar, //是否显示工具栏
                showSmart: showSmart, //是否显示智能信息
                buttonIDs: buttonIDs //自定义工具条按钮
              })
            })
            .then(oData => {
              this.oWebControl.JS_Resize(this.swfWidth, this.swfHeight); // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
              //startpreview();  //初始化之后开启预览
              console.log(oData)
            });
      });
    },
    //获取公钥
    getPubKey(callback) {
      this.oWebControl
          .JS_RequestInterface({
            funcName: "getRSAPubKey",
            argument: JSON.stringify({
              keyLength: 1024
            })
          })
          .then(oData => {
            console.log(oData);
            if (oData.responseMsg.data) {
              this.pubKey = oData.responseMsg.data;
              callback();
            }
          });
    },

    // RSA加密
    setEncrypt (value) {
      // eslint-disable-next-line no-undef
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    setWndCover() {
      let iWidth = $('.app-container').width();
      let iHeight = $('.app-container').height();
      console.log("iWidth", iHeight)
      console.log("iHeight", iWidth)
      let oDivRect = $("#playWnd" + this.num)
          .get(0)
          .getBoundingClientRect();
      console.log("this.num*200", this.num*200)
      console.log("iWidth-this.num*200", iWidth-this.num*200)
      let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0;
      let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0;
      let iCoverRight =
          oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0;
      let iCoverBottom =
          oDivRect.bottom - iHeight > 0
              ? Math.round(oDivRect.bottom - iHeight)
              : 0;

      iCoverLeft = iCoverLeft > this.swfWidth ? this.swfWidth : iCoverLeft;
      iCoverTop = iCoverTop > this.swfHeight ? this.swfHeight : iCoverTop;
      iCoverRight = iCoverRight > this.swfWidth ? this.swfWidth : iCoverRight;
      iCoverBottom =
          iCoverBottom > this.swfHeight ? this.swfHeight : iCoverBottom;
      console.log("iCoverLeft", iCoverLeft)
      console.log('iCoverTop',iCoverTop)
      console.log('iCoverRight',iCoverRight)
      console.log('iCoverBottom',iCoverBottom)
      this.oWebControl.JS_RepairPartWindow(0, 0, this.swfWidth+1, this.swfHeight); // 多1个像素点防止还原后边界缺失一个像素条
      if (iCoverLeft != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, this.swfHeight);
      }
      if (iCoverTop != 0) {
        this.oWebControl.JS_CuttingPartWindow(0, 0, this.swfWidth+1, iCoverTop); // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      }
      if (iCoverRight != 0) {
        this.oWebControl.JS_CuttingPartWindow(
            this.swfWidth - iCoverRight,
            0,
            iCoverRight,
            this.swfHeight
        );
      }
      if (iCoverBottom != 0) {
        this.oWebControl.JS_CuttingPartWindow(
            0,
            this.swfHeight - iCoverBottom,
            this.swfWidth,
            iCoverBottom
        );
      }
    },
    //视频“预览”功能
    startPreview() {
      let pointCode = this.pointCode;
      let cameraIndexCode = pointCode; //获取输入的监控点编号值，必填
      let streamMode = 0; //主子码流标识：0-主码流，1-子码流
      let transMode = 1; //传输协议：0-UDP，1-TCP
      let gpuMode = 0; //是否启用GPU硬解，0-不启用，1-启用
      let wndId = -1; //播放窗口序号（在2x2以上布局下可指定播放窗口）
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");
      this.oWebControl.JS_RequestInterface({
        funcName: "startPreview",
        argument: JSON.stringify({
          cameraIndexCode: cameraIndexCode, //监控点编号
          streamMode: streamMode, //主子码流标识
          transMode: transMode, //传输协议
          gpuMode: gpuMode, //是否开启GPU硬解
          wndId: wndId //可指定播放窗口
        })
      }).then( (res) => {
        console.log("startPreview success: ", res);
      }).catch( (error) => {
        console.log("error: ", error)
      });
    },
    //停止全部预览功能
    stopAllPreview() {
      this.oWebControl.JS_RequestInterface({
        funcName: "stopAllPreview"
      });
    },
    //关闭视频窗口
    closeWindow() {
      if (this.oWebControl != null) {
        this.oWebControl.JS_HideWnd(); // 先让窗口隐藏，规避可能的插件窗口滞后于浏览器消失问题
        this.oWebControl.JS_Disconnect().then(
            () => {
              // 断开与插件服务连接成功
            },
            () => {
              // 断开与插件服务连接失败
            }
        );
      }
    }
  }
}
</script>

<style scoped>
.playWnd{
  display: inline-block;
  position: absolute;
}
</style>
