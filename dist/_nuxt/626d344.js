(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{827:function(t,e,r){var content=r(933);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("0ea58af2",content,!0,{sourceMap:!1})},828:function(t,e,r){var content=r(935);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("6a8c17a0",content,!0,{sourceMap:!1})},931:function(t,e,r){t.exports=r.p+"img/discount-bg.22c03a9.png"},932:function(t,e,r){"use strict";r(827)},933:function(t,e,r){var n=r(12)(!1);n.push([t.i,".image-upper[data-v-6321e0a6]{position:relative}.image-upper .discount-tag-line[data-v-6321e0a6]{position:absolute;top:-29px;left:-20px;width:98px;font-size:12px}.image-upper .discount-tag-line>img[data-v-6321e0a6]{max-width:100%}.productCard[data-v-6321e0a6]{box-shadow:0 5px 5px rgba(165,167,185,.05),0 5px 5px rgba(165,167,185,.25)!important;border-radius:5px!important;background-color:#fff!important}.productCard[data-v-6321e0a6]:hover{cursor:pointer}.image[data-v-6321e0a6]{width:100%;min-height:360px;max-height:360px}@media screen and (max-width:600px){.image[data-v-6321e0a6]{min-height:210px;max-height:210px}}.name[data-v-6321e0a6]{min-height:1.5em;max-height:1.5em;overflow-y:hidden}",""]),t.exports=n},934:function(t,e,r){"use strict";r(828)},935:function(t,e,r){var n=r(12)(!1);n.push([t.i,".nodata[data-v-2c64d882]{height:100%;display:flex;justify-content:center;align-items:center}",""]),t.exports=n},997:function(t,e,r){"use strict";r.r(e);var n=r(3),c=(r(21),r(30),{props:["data"],data:function(){return{image:this.data.thumbnail}},computed:{getVatAmount:function(){return this.data.vat?this.data.price*this.data.vat/100:0},getDiscountedPrice:function(){if(1==this.data.discount.type)return this.data.price-this.data.discount.amount;if(2==this.data.discount.type){var t=this.data.price*this.data.discount.amount/100;return this.data.price-t}return 0},getUrl:function(){return"".concat(this.getBaseUrl,"/product/").concat(this.data.slug,"?affiliate=").concat(this.getAffiliateUser)},getDiscountAmount:function(){return 1==this.data.discount.type?this.data.discount.amount:2==this.data.discount.type?this.data.price*this.data.discount.amount/100:0},getAffiliateUser:function(){return localStorage.getItem("customer")?JSON.parse(localStorage.getItem("customer")).username:null},getBaseUrl:function(){return window.location.origin}},methods:{changeImage:function(){this.image=this.data.images[0]},resetImage:function(){this.image=this.data.thumbnail}}}),o=(r(932),r(23)),l=r(34),d=r.n(l),v=r(119),m=r(593),h=r(157),f=r(193),_=r(610),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("v-card",{staticClass:"text-center ma-1 productCard"},[n("nuxt-link",{attrs:{to:"/product/"+t.data.slug}},[n("div",{staticClass:"image-upper"},[n("v-img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],staticClass:"image",attrs:{"data-src":"https://testapi.jmc.shopping/"+t.image},on:{mouseover:t.changeImage,mouseout:t.resetImage},scopedSlots:t._u([{key:"placeholder",fn:function(){return[n("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)]},proxy:!0}])}),t._v(" "),t.data.discount.amount?n("div",{staticClass:"discount-tag-line"},[n("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],attrs:{"data-src":r(931),alt:""}})]):t._e()],1),t._v(" "),n("v-card",{staticClass:"px-5 py-4"},[n("div",{staticClass:"h3 ma-0"},[t._v(t._s(t.data.name))]),t._v(" "),n("p",{staticClass:"caption ma-0"},[t._v("Sku "+t._s(t.data.sku))]),t._v(" "),n("p",{staticClass:"subtitle-2 mb-2"},[n("span",[t.getDiscountAmount>0?n("strike",[t._v("৳ "+t._s(t.data.price))]):t._e(),t._v(" "),0==t.getDiscountAmount?n("span",[t._v("৳ "+t._s(t.data.price))]):t._e()],1),t._v(" "),t.getDiscountAmount>0?n("span",[n("b",[t._v("৳ "+t._s(t.getDiscountedPrice))])]):t._e(),t._v(" "),n("br"),t._v(" "),t.getVatAmount>0?n("span",{staticClass:"caption"},[t._v("Vat Applicable ৳ "+t._s(t.getVatAmount))]):t._e()]),t._v(" "),0!=t.data.currentStock?n("v-btn",{attrs:{small:"",depressed:""},on:{click:function(e){return t.$router.push("/product/"+t.data.slug)}}},[t._v("Buy Now")]):t._e(),t._v(" "),0===t.data.currentStock?n("v-btn",{attrs:{small:"",depressed:"",color:"error"}},[t._v("Sold Out")]):t._e(),t._v(" "),t.getAffiliateUser?n("v-btn",{directives:[{name:"clipboard",rawName:"v-clipboard",value:t.getUrl,expression:"getUrl"}],attrs:{small:"",depressed:""}},[t._v("Copy")]):t._e()],1)],1)],1)],1)}),[],!1,null,"6321e0a6",null),x=component.exports;d()(component,{VBtn:v.a,VCard:m.a,VImg:h.a,VProgressCircular:f.a,VRow:_.a});var C={layout:"landingpage",watch:{"$route.query":"$fetch"},fetch:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:t.route,console.log(e.$route);case 2:case"end":return r.stop()}}),r)})))()},components:{AppProductCard:x},data:function(){return{data:null,searchByName:null,selectedCategory:[],selectedBrand:[],cardLoading:!1,availabilityChecked:!1,discountChecked:!1,priceSlider:[]}},mounted:function(){this.searchByName=this.$route.params.name},asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.params,n=t.$axios,e.abrupt("return",n.$post("/product/find/"+r.name,{}).then((function(t){return{data:t.data,priceSlider:t.data.price}})));case 2:case"end":return e.stop()}}),e)})))()},methods:{searchClicked:function(){console.log(this.searchByName),this.$router.push("/find/"+this.searchByName)},filter:function(){var t=this;console.log("F"),this.cardLoading=!0;var data={};this.availabilityChecked&&(data.availability=!0),this.discountChecked&&(data.discount=!0),data.category=this.selectedCategory,data.brand=this.selectedBrand,data.lowPrice=this.priceSlider[0],data.highPrice=this.priceSlider[1];var e="/product/find/"+this.$route.params.name;this.$axios.$post(e,data).then((function(e){t.data=e.data,t.cardLoading=!1,t.priceSlider=e.data.price}))}}},y=(r(934),r(843)),k=r(783),w=r(608),V=r(757),B=r(614),S=r(812),P=r(813),A=r(814),$=r(815),N=r(1010),j=r(592),D=Object(o.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[t._v("\n  "+t._s(this.$route.params.name)+"\n  "),t._v(" "),r("v-container",[r("v-row",[r("v-col",{attrs:{md:"3",cols:"12"}},[r("p",{staticClass:"title mb-5"},[t._v("Search Product")]),t._v(" "),r("v-breadcrumbs",[r("v-breadcrumbs-item",{staticClass:"jmcText",attrs:{href:"/"}},[t._v("Home")])],1),t._v(" "),r("v-text-field",{attrs:{id:"searchProduct","append-icon":"search",label:"Search Product's",solo:""},on:{"click:append":t.searchClicked},model:{value:t.searchByName,callback:function(e){t.searchByName=e},expression:"searchByName"}}),t._v(" "),r("v-expansion-panels",{staticClass:"mt-5",attrs:{accordion:"",flat:""}},[r("v-expansion-panel",[r("v-expansion-panel-header",[r("p",{staticClass:"overline ma-0"},[t._v("Category")])]),t._v(" "),r("v-expansion-panel-content",t._l(t.data.category,(function(e,i){return r("v-checkbox",{key:i,attrs:{label:e.name,value:e._id},on:{click:t.filter},model:{value:t.selectedCategory,callback:function(e){t.selectedCategory=e},expression:"selectedCategory"}})})),1)],1),t._v(" "),r("v-expansion-panel",[r("v-expansion-panel-header",[r("p",{staticClass:"overline ma-0"},[t._v("Brands")])]),t._v(" "),r("v-expansion-panel-content",t._l(t.data.brand,(function(e,i){return r("v-checkbox",{key:i,attrs:{label:e.name,value:e._id},on:{click:t.filter},model:{value:t.selectedBrand,callback:function(e){t.selectedBrand=e},expression:"selectedBrand"}})})),1)],1)],1),t._v(" "),r("p",{staticClass:"overline mt-5"},[t._v("Availability")]),t._v(" "),r("v-checkbox",{attrs:{label:"In Stock"},on:{click:t.filter},model:{value:t.availabilityChecked,callback:function(e){t.availabilityChecked=e},expression:"availabilityChecked"}}),t._v(" "),r("p",{staticClass:"overline mt-5"},[t._v("Discount")]),t._v(" "),r("v-checkbox",{attrs:{label:"Discount"},on:{click:t.filter},model:{value:t.discountChecked,callback:function(e){t.discountChecked=e},expression:"discountChecked"}}),t._v(" "),r("p",{staticClass:"overline mt-5"},[t._v("Price")]),t._v(" "),r("v-range-slider",{staticClass:"align-center mt-10",attrs:{"thumb-label":"always",max:t.data?t.data.price[1]:"",min:t.data?t.data.price[0]:"","hide-details":""},model:{value:t.priceSlider,callback:function(e){t.priceSlider=e},expression:"priceSlider"}}),t._v(" "),r("v-btn",{staticClass:"btn my-3",attrs:{text:""},on:{click:t.filter}},[t._v("Get Products")])],1),t._v(" "),r("v-col",{attrs:{md:"9",cols:"12"}},[r("v-card",{attrs:{depressed:"",flat:"",loading:t.cardLoading}},[t.data.product.length>0?r("v-row",t._l(t.data.product,(function(t,i){return r("v-col",{key:i,attrs:{cols:"12",md:"4"}},[r("AppProductCard",{attrs:{data:t}})],1)})),1):t._e()],1),t._v(" "),0==t.data.product?r("div",{staticClass:"nodata"},[r("p",{staticClass:"title pa-5"},[t._v("No products match selected filters. Try adjusting filters to widen your search.")])]):t._e()],1)],1)],1)],1)}),[],!1,null,"2c64d882",null);e.default=D.exports;d()(D,{VBreadcrumbs:y.a,VBreadcrumbsItem:k.a,VBtn:v.a,VCard:m.a,VCheckbox:w.a,VCol:V.a,VContainer:B.a,VExpansionPanel:S.a,VExpansionPanelContent:P.a,VExpansionPanelHeader:A.a,VExpansionPanels:$.a,VRangeSlider:N.a,VRow:_.a,VTextField:j.a})}}]);