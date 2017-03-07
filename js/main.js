//起始點
document.addEventListener('DOMContentLoaded', function () { // 監聽某'事件發生'後執行funtion()
    'use strict';
    new Vue({
        router,
        template: `<router-view></router-view>` //
    }).$mount('app'); //#app html多div id=app
});

Vue.use(VueRouter);

//登入頁面
const login = {
        template: `<div class="loginpage animated zoomIn">
        <div>
            <!--<div class="image">
                <img src="img/logo.png">
            </div>-->
            <div class="inputgroup">
                <input v-model="account" type="text" placeholder="請輸入帳號">
                <input v-on:keyup.enter="login" v-model="password" type="password" placeholder="請輸入密碼">
            </div>
            <div class="buttongroup">
                <!--<div>帳號:{{account}}</div>
                <div>密碼:{{password}}</div>-->
                <button v-on:click="login">登入</button>
            </div>
        </div>
    </div>`,
        data: function () {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            login: function (E) {
                if (this.account == 2 && this.password == 2) {
                    router.push({
                        name: 'hello'
                    })
                } else {
                    alert("登入失敗");
                    console.log(E.target);
                    console.log(this);
                    console.log(self);
                    /*E.target.style.color="blue";
                    E.target.style.background="red";
                    E.target.style.borderColor="red";*/ //失敗調整按鈕顏色
                }
            }
        },
        mounted: function () {

        }
    },


    main_base = {
        template: `<div class="mainpage animated zoomIn">
        <nav>
            <i class="fa fa-chevron-right fa-5x" aria-hidden="true" v-on:click="main"></i>
            <div id=test>
            <span id="page1" v-on:click="trans">page1</span>
            <br></br>
            <span>page2</span>
            <br></br>
            <span>page3</span>
            <div>
        </nav>
        <section>
            <router-view></router-view>
        </section>
    </div>`,
        data: function () {
            return {
                test: true
            }
        },
        methods: {
            main: function (E) {
                var self = this;    
                /*每個function裡面的this會不一樣
                不想這樣下的話
                就用.bind(this)*/
                if (this.test == true) {

                    $("#test").addClass("animated fadeOutLeft");

                    setTimeout(function () {
                        self.test = false;
                        $('#test').removeClass("animated fadeOutLeft")
                            .css("display", "none");
                    }, 1000);

                } else {
                    $("#test").addClass("animated fadeInLeft").css("display", "block");
                    this.test = true;
                }



                //$("#test").addClass("animated fadeInLeft");
                //setTimeout(function(){$('#test').removeClass("animated fadeInLeft")}, 1000)
            },
            trans: function (E) {
                router.push({
                    name: 'page01'
                });
            }
        },
        mounted: function () {

        }
    },


    hello = {
        template: `<div class="mainpage animated zoomIn">
        <p>test</p>
        <router-view></router-view>
    </div>`,
    },



    google = {
        template: `<div class="mainpage animated zoomIn">
        <p>hello</p>
    </div>`,
        /*data: function (){
            return{

            }
        },
        methods: {
            
        },
        mounted: function (){
            
        }*/
    };





//首頁路徑設定
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        }, //預設路徑導向登入頁
        {
            path: '/main',
            component: main_base,
            children: 
            [{
                path: 'hello',
                component: hello, //main進去導向hello
                name: 'hello'
            },{
                    path: 'google',
                    component: google,
                    name: 'page01'
            }, 
            {
                path: '*',
                redirect: 'hello' //main亂打導向hello
            }]
        },
        {
            path: '/login',
            component: login,
            name: 'login',
            children: [{
                path: '*',
                redirect: '/login' //登入頁後面亂打導向登入頁
         }]
        },
        {
            path: '/*',
            redirect: '/login'
        } //一開始亂打導向登入頁
    ]
});