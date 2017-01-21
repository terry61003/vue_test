//起始點
document.addEventListener('DOMContentLoaded', function () {   // 監聽某'事件發生'後執行funtion()
    'use strict';
    new Vue({
        router,
        template: `<router-view></router-view>`   //
    }).$mount('app');
});

Vue.use(VueRouter);

//登入頁面
const login = {
    template: 
    `<div class="loginpage animated zoomIn">
        <div>
            <!--<div class="image">
                <img src="img/logo.png">
            </div>-->
            <div class="inputgroup">
                <input v-model="account" type="text" placeholder="請輸入帳號">
                <input v-model="password" type="password" placeholder="請輸入密碼">
            </div>
            <div class="buttongroup">
                <!--<div>帳號:{{account}}</div>
                <div>密碼:{{password}}</div>-->
                <button v-on:click="login">登入</button>
            </div>
        </div>
    </div>`,
    data: function (){
        return{
            account: '',
            password: ''
        }
    },
    methods: {
        login: function (E){
            if(this.account==2&&this.password==2)
                {
                    router.push({name:'hello'})
                }
            else
                {
                    alert("登入失敗");
                    /*E.target.style.color="blue";
                    E.target.style.background="red";
                    E.target.style.borderColor="red";*/    //失敗調整按鈕顏色
                }
        }
    },
    mounted: function (){
        
    }
},

      
main_base = {
    template:
    `<div class="loginpage animated zoomIn">
        <div>
            <router-view></router-view>
        </div>
    </div>`,
},

hello = {
        template:
   `<div class="loginpage animated zoomIn">
        <div class="buttongroup">
                <button v-on:click="main">選單</button>
        </div>
        <div id="test">
            page1
            <br></br>
            page2
            <br></br>
            page3
        </div>
        
    </div>`,
    data: function (){
        return{
            test : true
        }
    },
    methods: {
        main: function (E){
            var self = this;
            if(this.test==true){
                
                $("#test").addClass("animated fadeOutLeft");
            
                setTimeout(function(){
                    self.test=false;
                    $('#test').removeClass("animated fadeOutLeft")
                    .css("display","none");
                    }, 1000);
            
            }
            else
            {
                $("#test").addClass("animated fadeInLeft").css("display","block");
                this.test=true;
            }
            
            
            
            //$("#test").addClass("animated fadeInLeft");
            //setTimeout(function(){$('#test').removeClass("animated fadeInLeft")}, 1000)
        }
    },
    mounted: function (){
        
    }
};



//首頁路徑設定
const router = new VueRouter({
    routes: [
        { path: '/', redirect:'/login'},    //預設路徑導向燈入夜
        { path: '/main', component: main_base, 
         children: [{
             path: 'hello',
             component: hello,         //main進去導向edit_foodgo   
             name: 'hello'
         },{
             path: '*',
             redirect:'hello'     //main亂打導向edit_
         }]},
        { path: '/login', component: login ,name: 'login',
         children: [{
             path: '*', redirect:'/login'      //燈入夜後面亂打導向燈入夜
         }]},
        { path: '/*', redirect:'/login'}      //一開始亂打導向燈入夜
    ]
});