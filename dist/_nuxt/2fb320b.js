(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{804:function(t,n,e){var content=e(855);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(13).default)("35b73469",content,!0,{sourceMap:!1})},854:function(t,n,e){"use strict";e(804)},855:function(t,n,e){var o=e(12)(!1);o.push([t.i,".logoDiv[data-v-58fb615e]{text-align:center}.logoDiv .logo[data-v-58fb615e]{height:5em}.dashboardContent[data-v-58fb615e]{padding:1em!important}",""]),t.exports=o},998:function(t,n,e){"use strict";e.r(n);e(21),e(38);var o={middleware:"AdminGaurd",data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[],isAdmin:!1,admin:null,isVendor:!1,vendor:null,mini:!1,right:!0,rightDrawer:!1,title:"Sailor's Express",navLinks:[{icon:"person_outline",text:"Report",route:"/dashboard/report",subLinks:[{text:"commission report",route:"/dashboard/incharge/commission"},{text:"commission report",route:"/dashboard/incharge/district"},{text:"Agent Report",route:"/dashboard/incharge/agent"}]}]}},computed:{getPermissions:function(){return this.isAdmin?this.admin.permissions:this.isVendor?this.vendor.permissions:this.items},getUser:function(){return this.isAdmin?this.admin:this.isVendor?this.vendor:{name:"",email:""}}},mounted:function(){localStorage.isAdmin?(this.isAdmin=localStorage.isAdmin,this.admin=JSON.parse(localStorage.admin)):localStorage.isVendor?(this.isVendor=localStorage.isVendor,this.vendor=JSON.parse(localStorage.vendor)):this.$router.push("/"),"sm"!=this.$vuetify.breakpoint.name&&"xs"!=this.$vuetify.breakpoint.name||(this.mini=!0)},methods:{logout:function(){localStorage.clear(),this.$router.replace({path:"/"})}}},r=(e(854),e(23)),c=e(34),v=e.n(c),l=e(1009),m=e(607),d=e(119),_=e(981),h=e(192),f=e(194),k=e(120),V=e(195),x=e(93),S=e(982),$=e(609),w=e(606),A=e(92),y=e(983),component=Object(r.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("section",[e("v-navigation-drawer",{attrs:{"mini-variant":t.mini,permanent:"",clipped:t.clipped,app:"",color:"primary",dark:""},on:{"update:miniVariant":function(n){t.mini=n},"update:mini-variant":function(n){t.mini=n}},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("v-list-item",{attrs:{"two-line":""}},[e("v-list-item-content",[e("v-list-item-title",[t._v(t._s(t.getUser.name))]),t._v(" "),e("v-list-item-subtitle",[t._v(t._s(t.getUser.email))]),t._v(" "),e("v-list-item-subtitle",[t._v("ID: "+t._s(t.getUser.uniqueId))])],1)],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(n){t.drawer=n},expression:"drawer"}},[t._v(" "),t.admin&&"incharge"==t.admin.role?e("v-list",[e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/my-account")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("My Account ")])],1)],1),t._v(" "),e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/transections")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Transections ")])],1)],1),t._v(" "),e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/log")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("commission Log ")])],1)],1),t._v(" "),e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/withdraw")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Withdraws ")])],1)],1),t._v(" "),e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/balance-transfer")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Balance Transfer ")])],1)],1),t._v(" "),e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/incharge/notice")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Notice ")])],1)],1)],1):t._e(),t._v(" "),e("v-list",[t._l(t.getPermissions,(function(n,i){return e("v-list-item",{key:i,attrs:{to:n.to,router:"",exact:""}},[e("v-list-item-action",[e("v-icon",[t._v(t._s(n.icon))])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(n.title)}})],1)],1)})),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/transections")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-finance")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Transections ")])],1)],1):t._e(),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/commission-log")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Commission Log ")])],1)],1):t._e(),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/customers")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Customers ")])],1)],1):t._e(),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/campaign")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("Campaign ")])],1)],1):t._e(),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/e-agent/promotion")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-account-circle")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("E-Agent Promotion ")])],1)],1):t._e(),t._v(" "),t.admin&&"admin"==t.admin.role?e("v-list-item",{on:{click:function(n){return t.$router.push("/dashboard/e-agent/send-sms")}}},[e("v-list-item-action",[e("v-icon",[t._v("mdi-cellphone-message")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v("E-Agent SMS Send ")])],1)],1):t._e()],2)],1),t._v(" "),e("v-app-bar",{attrs:{"clipped-left":t.clipped,fixed:"",app:""}},[e("v-app-bar-nav-icon",{on:{click:function(n){n.stopPropagation(),t.mini=!t.mini}}}),t._v(" "),e("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),e("v-spacer"),t._v(" "),e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[e("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(n){return t.$router.push("/dashboard/profile")}}},"v-btn",r,!1),o),[e("v-icon",[t._v("mdi-account")])],1)]}}])},[t._v(" "),e("span",[t._v("profile")])]),t._v(" "),e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[e("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(n){return t.$router.push("/")}}},"v-btn",r,!1),o),[e("v-icon",[t._v("mdi-eye")])],1)]}}])},[t._v(" "),e("span",[t._v("Go to Home")])])],1),t._v(" "),e("v-main",[e("div",{staticClass:"dashboardContent"},[e("nuxt-child")],1)]),t._v(" "),e("v-footer",{attrs:{fixed:t.fixed,app:""}},[e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(n){var o=n.on,r=n.attrs;return[e("v-btn",t._g(t._b({attrs:{icon:""},on:{click:t.logout}},"v-btn",r,!1),o),[e("v-icon",[t._v("mdi-logout")])],1)]}}])},[t._v(" "),e("span",[t._v("Logout")])]),t._v(" "),e("span",[t._v("© 2021")])],1)],1)}),[],!1,null,"58fb615e",null);n.default=component.exports;v()(component,{VAppBar:l.a,VAppBarNavIcon:m.a,VBtn:d.a,VFooter:_.a,VIcon:h.a,VList:f.a,VListItem:k.a,VListItemAction:V.a,VListItemContent:x.a,VListItemSubtitle:x.b,VListItemTitle:x.c,VMain:S.a,VNavigationDrawer:$.a,VSpacer:w.a,VToolbarTitle:A.b,VTooltip:y.a})}}]);