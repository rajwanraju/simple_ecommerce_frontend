(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{805:function(t,e,o){var content=o(865);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(13).default)("c5a12276",content,!0,{sourceMap:!1})},864:function(t,e,o){"use strict";o(805)},865:function(t,e,o){var n=o(12)(!1);n.push([t.i,".product-approval[data-v-0277e185]{display:flex;justify-content:flex-end}.unapproved-product[data-v-0277e185]{position:relative}.unapproved-product>.tag[data-v-0277e185]{position:absolute;top:0;left:-10px;z-index:9999;background:#ff5f5f;color:#fff;width:25px;height:25px;font-size:11px;text-align:center;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700}.dashboard-cards[data-v-0277e185]{display:flex;flex-wrap:wrap;justify-content:center;margin-bottom:50px}.dashboard-cards .card[data-v-0277e185]{width:300px;text-align:center;padding:20px 0;border-radius:10px;border:1px solid rgba(0,0,0,.5);background:#eee;margin-right:20px;margin-bottom:20px}.dashboard-cards .card .count[data-v-0277e185]{font-size:30px;font-weight:700;margin:0}.dashboard-cards .card .count-title[data-v-0277e185]{margin:0;text-transform:uppercase;font-weight:500}",""]),t.exports=n},999:function(t,e,o){"use strict";o.r(e);var n={components:{AppTodaySale:AppTodaySale,AppTodayPurchase:AppTodayPurchase,AppTodayTransaction:AppTodayTransaction,AppMonthly:AppMonthly,AppYearly:AppYearly},data:function(){return{dashboardData:{},showLabels:!0,isAdmin:!1,admin:null,lineWidth:8,radius:1,padding:12,labelsize:3,lineCap:"round",value:[1,2,5,9,5,10,3,5,8,2,9,5],gradientDirection:"top",gradient:["#00c6ff","#F0F","#FF0"],fill:!1,type:"bar",autoLineWidth:!1,labels:["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]}},mounted:function(){localStorage.isAdmin&&(this.isAdmin=localStorage.isAdmin,this.admin=JSON.parse(localStorage.admin),this.ctoken=localStorage.token,"admin"==this.admin.role&&this.getDashboardData())},methods:{getDashboardData:function(){var t=this;this.$axios.$get("/admin/dashboard").then((function(e){t.dashboardData=e.data,console.log(t.dashboardData)}))}}},r=(o(864),o(23)),component=Object(r.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("div")}),[],!1,null,"0277e185",null);e.default=component.exports}}]);