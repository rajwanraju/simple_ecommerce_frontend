(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1002:function(t,e,r){"use strict";r.r(e);r(17),r(55),r(56);var n={data:function(){return{script:"https://sandbox.sslcommerz.com/embed.min.js?"+Math.random().toString(36).substring(7)}},computed:{scriptSrc:function(){return this.script}},mounted:function(){var t=document.createElement("script");t.setAttribute("src","https://sandbox.sslcommerz.com/embed.min.js?"+Math.random().toString(36).substring(7)),document.body.appendChild(t)},methods:{sslPay:function(){var t={cus_name:"rajwan",cus_phone:"01737909454",cus_email:"rajwan.diu@gmail.com",cus_addr1:"dhaka",amount:100};$("#sslczPayBtn").prop("postdata",t);var e=document.createElement("script");e.setAttribute("src","https://sandbox.sslcommerz.com/embed.min.js?"+Math.random().toString(36).substring(7)),document.body.appendChild(e),window.addEventListener?window.addEventListener("load",e,!1):window.attachEvent("onload",e)}}},o=(r(921),r(23)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[t._m(0),t._v(" "),r("div",{staticClass:"row"},[t._m(1),t._v(" "),r("div",{staticClass:"col-md-8 order-md-1"},[r("h4",{staticClass:"mb-3"},[t._v("Billing address")]),t._v(" "),r("form",{staticClass:"needs-validation",attrs:{novalidate:""},on:{submit:function(e){return e.preventDefault(),t.sslPay.apply(null,arguments)}}},[t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),r("hr",{staticClass:"mb-4"}),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),r("hr",{staticClass:"mb-4"}),t._v(" "),r("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{order:"123456789",endpoint:"/payment",id:"sslczPayBtn"}},[t._v("\n          Pay Now\n        ")])])])])])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"py-5 text-center"},[r("h2",[t._v("EasyCheckout (Popup) - SSLCommerz")]),t._v(" "),r("p",{staticClass:"lead"},[t._v("\n      Below is an example form built entirely with Bootstrap’s form controls.\n      We have provided this sample form for understanding EasyCheckout (Popup)\n      Payment integration with SSLCommerz.\n    ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-md-4 order-md-2 mb-4"},[r("h4",{staticClass:"d-flex justify-content-between align-items-center mb-3"},[r("span",{staticClass:"text-muted"},[t._v("Your cart")]),t._v(" "),r("span",{staticClass:"badge badge-secondary badge-pill"},[t._v("3")])]),t._v(" "),r("ul",{staticClass:"list-group mb-3"},[r("li",{staticClass:"list-group-item d-flex justify-content-between lh-condensed"},[r("div",[r("h6",{staticClass:"my-0"},[t._v("Product name")]),t._v(" "),r("small",{staticClass:"text-muted"},[t._v("Brief description")])]),t._v(" "),r("span",{staticClass:"text-muted"},[t._v("1000")])]),t._v(" "),r("li",{staticClass:"list-group-item d-flex justify-content-between lh-condensed"},[r("div",[r("h6",{staticClass:"my-0"},[t._v("Second product")]),t._v(" "),r("small",{staticClass:"text-muted"},[t._v("Brief description")])]),t._v(" "),r("span",{staticClass:"text-muted"},[t._v("50")])]),t._v(" "),r("li",{staticClass:"list-group-item d-flex justify-content-between lh-condensed"},[r("div",[r("h6",{staticClass:"my-0"},[t._v("Third item")]),t._v(" "),r("small",{staticClass:"text-muted"},[t._v("Brief description")])]),t._v(" "),r("span",{staticClass:"text-muted"},[t._v("150")])]),t._v(" "),r("li",{staticClass:"list-group-item d-flex justify-content-between"},[r("span",[t._v("Total (BDT)")]),t._v(" "),r("strong",[t._v("1200 TK")])])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12 mb-3"},[r("label",{attrs:{for:"firstName"}},[t._v("Full name")]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"text",name:"customer_name",id:"customer_name",placeholder:"",value:"John Doe",required:""}}),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n              Valid customer name is required.\n            ")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("label",{attrs:{for:"mobile"}},[t._v("Mobile")]),t._v(" "),r("div",{staticClass:"input-group"},[r("div",{staticClass:"input-group-prepend"},[r("span",{staticClass:"input-group-text"},[t._v("+88")])]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"text",name:"customer_mobile",id:"mobile",placeholder:"Mobile",value:"01711xxxxxx",required:""}}),t._v(" "),r("div",{staticClass:"invalid-feedback",staticStyle:{width:"100%"}},[t._v("\n              Your Mobile number is required.\n            ")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("label",{attrs:{for:"email"}},[t._v("Email "),r("span",{staticClass:"text-muted"},[t._v("(Optional)")])]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"email",name:"customer_email",id:"email",placeholder:"you@example.com",value:"you@example.com",required:""}}),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n            Please enter a valid email address for shipping updates.\n          ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("label",{attrs:{for:"address"}},[t._v("Address")]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"text",id:"address",placeholder:"1234 Main St",value:"93 B, New Eskaton Road",required:""}}),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n            Please enter your shipping address.\n          ")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("label",{attrs:{for:"address2"}},[t._v("Address 2 "),r("span",{staticClass:"text-muted"},[t._v("(Optional)")])]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"text",id:"address2",placeholder:"Apartment or suite"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-5 mb-3"},[r("label",{attrs:{for:"country"}},[t._v("Country")]),t._v(" "),r("select",{staticClass:"custom-select d-block w-100",attrs:{id:"country",required:""}},[r("option",{attrs:{value:""}},[t._v("Choose...")]),t._v(" "),r("option",{attrs:{value:"Bangladesh"}},[t._v("Bangladesh")])]),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n              Please select a valid country.\n            ")])]),t._v(" "),r("div",{staticClass:"col-md-4 mb-3"},[r("label",{attrs:{for:"state"}},[t._v("State")]),t._v(" "),r("select",{staticClass:"custom-select d-block w-100",attrs:{id:"state",required:""}},[r("option",{attrs:{value:""}},[t._v("Choose...")]),t._v(" "),r("option",{attrs:{value:"Dhaka"}},[t._v("Dhaka")])]),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n              Please provide a valid state.\n            ")])]),t._v(" "),r("div",{staticClass:"col-md-3 mb-3"},[r("label",{attrs:{for:"zip"}},[t._v("Zip")]),t._v(" "),r("input",{staticClass:"form-control",attrs:{type:"text",id:"zip",placeholder:"",required:""}}),t._v(" "),r("div",{staticClass:"invalid-feedback"},[t._v("\n              Zip code required.\n            ")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"custom-control custom-checkbox"},[r("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"same-address"}}),t._v(" "),r("input",{attrs:{type:"hidden",value:"1200",name:"amount",id:"total_amount",required:""}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"same-address"}},[t._v("Shipping address is the same as my billing address")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"custom-control custom-checkbox"},[r("input",{staticClass:"custom-control-input",attrs:{type:"checkbox",id:"save-info"}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"save-info"}},[t._v("Save this information for next time")])])}],!1,null,null,null);e.default=component.exports},822:function(t,e,r){var content=r(922);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(13).default)("e4c6015e",content,!0,{sourceMap:!1})},921:function(t,e,r){"use strict";r(822)},922:function(t,e,r){var n=r(12)(!1);n.push([t.i,".app-container{height:660px;width:350px;background-image:linear-gradient(#580e8f,#9200ff);top:45%;left:50%;transform:translate(-50%,-50%);position:absolute}.top-box{height:150px;background-color:#9100fb;border-bottom-left-radius:80px;border-bottom-right-radius:80px;text-align:center;padding-top:20px;color:#fff}.left-icon{float:left;margin-left:30px}.right-icon{float:right;margin-right:30px}.middle-box{height:150px;background-image:linear-gradient(#580e8f,#9200ff);margin:-70px 30px 20px;text-align:center;font-size:12px;border-radius:10px;color:#fff}.middle-box h1{padding-top:30px;padding-bottom:30px;font-size:50px;font-weight:400}.middle-box h1 span{font-size:20px;margin-left:5px;bottom:18px;position:relative}.payment-option-btn{color:#fff;margin:5px 30px;height:30px;width:290px;background-color:#9100fd;border:none;cursor:pointer}.card-details{background:#fff;color:#555;margin:10px 30px;padding:10px}.card-details p{font-size:14px}.card-details label{font-size:10px;line-height:20px}.card-num-field-group{margin-top:10px}.cvc-field-group,.date-field-group{margin-top:10px;display:inline-block}.cvc-field-group{float:right}.name-field-group{margin-top:10px}.card-num-field,.name-field{width:260px}.cvc-field,.date-field{width:70px}.card-details input{border:1px solid #ccc;height:22px;padding:5px;font-size:10px}.card-details input::-moz-placeholder{color:#ccc}.card-details input:-ms-input-placeholder{color:#ccc}.card-details input::placeholder{color:#ccc}.pay-btn{width:270px;color:#fff;margin-top:20px;height:30px;background-color:#9100fd;border:none;cursor:pointer}",""]),t.exports=n}}]);