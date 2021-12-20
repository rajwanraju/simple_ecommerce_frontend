<template>
  <footer class="site-footer" >
    <div class="footer-upper">
      <div class="container">
        <div class="footer-upper-sec1 footer-sec-p">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="footer-upper-sec1-part1">
                <div class="footer-upper-sec1-part1-logo">
                  <a  href="/"
                    ><img
                      src="/logo.png"
                      alt="logo"
                      class="footer-logo"
                  /></a>
                </div>
                <div class="footer-upper-sec1-part1-content">
                  <p>
                   Estore, Your Trusted Ecommerce
                  </p>
                  <div class="contact">
                    <div class="m-0">
                      <label>ADDRESS:</label>
                      <p>
             Dhaka Bangladesh
                      </p>
                    </div>
                    <p class="m-0">
                      <label>Phone:</label
                      ><a href="#" class="norm-a"
                        >&nbsp;+8801234567890</a
                      >
                    </p>
                    <p class="m-0">
                      <label>Email:</label
                      ><a href="#" class="norm-a"
                        >&nbsp; info@estore.com</a
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
              <div class="footer-upper-sec1-part2 mt-30">
                <div class="footer-upper-sec1-part2-title">
                  <h3 class="small-title">INFORMATION</h3>
                </div>
                <ul class="footer-upper-sec1-part2-info">
                  <li><nuxt-link to="/about">About Us</nuxt-link></li>
                
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-sm-12">
              <div class="footer-upper-sec1-part3 mt-30">
                <div class="footer-upper-sec1-part3-title">
                  <h3 class="small-title">MY ACCOUNT</h3>
                </div>
                <ul class="footer-upper-sec1-part3-info">
                  <li><a href="#">My Account</a></li>
                  <li><nuxt-link to="/cart">Shopping Cart</nuxt-link></li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="footer-upper-sec1-part4 mt-30">
                <div>
                  <div class="footer-upper-sec1-part4-title">
                    <h3 class="small-title">FOLLOW US</h3>
                  </div>
                  <ul class="socil-icon mb-40">
                    <li>
                      <a
                        title="Facebook"
                        class="facebook"
                        target="_blank"
                        href="#"
                        ><svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="facebook-f"
                          class="svg-inline--fa fa-facebook-f fa-w-10"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          style="width: 1em"
                        >
                          <path
                            fill="currentColor"
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                          ></path></svg
                      ></a>
                    </li>
                    <li>
                      <a
                        title="Twitter"
                        class="twitter"
                        target="_blank"
                        href="#"
                        ><svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="twitter"
                          class="svg-inline--fa fa-twitter fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          style="width: 1em"
                        >
                          <path
                            fill="currentColor"
                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                          ></path></svg
                      ></a>
                    </li>
                    <li>
                      <a
                        title="YouTube"
                        class="youtube"
                        target="_blank"
                      href="#"
                        ><svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="youtube"
                          class="svg-inline--fa fa-youtube fa-w-18"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          style="width: 1em"
                        >
                          <path
                            fill="currentColor"
                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                          ></path></svg
                      ></a>
                    </li>
                    <li>
                      <a title="LinkedIn" class="linkedin" target="_blank"
                        ><svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="linkedin-in"
                          class="svg-inline--fa fa-linkedin-in fa-w-14"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style="width: 1em"
                        >
                          <path
                            fill="currentColor"
                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                          ></path></svg
                      ></a>
                    </li>
                  </ul>
                </div>
            
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </div>
    <div class="footer-lower mt-30">
      <div class="container pt-0 pb-0">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div class="footer-lower-copyr">
              <p class="m-0" style="color: white">
                Copyright © {{ new Date().getFullYear() }},<a
                  href="/"
                  class="logo-btn"
                >
                  eSTORE</a
                >
              </p>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
  
  },
  data() {
    return {
      newsletter: "",
      isCustomer: false,
      customer: null,
    };
  },
  mounted() {
    if (localStorage.isCustomer) {
      this.isCustomer = localStorage.isCustomer;
      this.customer = JSON.parse(localStorage.customer);
    }
  },
  methods: {
 
  },
};
</script>

<style lang="scss" scoped>
// .footer-logo{
//   border: 1px solid #000;
//   border-radius: 5px;
// }
.small-title {
  color: #fff !important;
}
.socil-icon {
  display: flex;
}
.mtx-10 {
  margin-top: 10px;
}
.site-footer {
  background: #FF1493;
}

.footer-sec-p {
  padding: 10px 0;
}

.footer-upper {
  border-top: 1px solid #ebebeb;
}
.footer-upper-sec1-part1-logo {
  max-width: 100px;
  margin-bottom: 10px;
}
.footer-upper-sec1-part1-logo a {
  padding: 0;

  img {
    width: 100% !important;
  }
}

.app-image {
  border-radius: 5px;
}

.footer-upper-sec1-part1-content p {
  font-size: 12px;
  color: #fff;
}
.footer-upper-sec1-part1-content div {
  color: #fff;
}
.footer-upper-sec1-part1-content label {
  margin-bottom: 5px;
  color: #fff;
}
.footer-upper-sec1-part1-content .norm-a {
  font-size: 14px;
  color: #fff;
}
.footer-upper-sec1-part2-title h3,
.footer-upper-sec1-part3-title h3 {
  margin-bottom: 5px;
}
ul {
  margin: 0;
  padding: 0;
}

.footer-upper-sec1-part2-info li,
.footer-upper-sec1-part3-info li {
  list-style: none;
  margin-bottom: 0;
}
.footer-upper-sec1-part2-info li a,
.footer-upper-sec1-part3-info li a {
  display: block;
  padding: 5px 0;
  line-height: 1.2rem;
  font-size: 14px;
  color: #fff;
}
.footer-upper-sec1-part2 .sslLogoFooter,
.footer-upper-sec1-part3 .sslLogoFooter {
  display: block;
  max-width: 200px;
}
.footer-upper-sec1-part4 {
  height: calc(100% - 30px);
}
.footer-upper-sec1-part4-title h3 {
  margin-bottom: 5px;
}
@media all and (max-width: 420px) {
  .footer-upper-sec1-part4 .download-apps {
    display: none;
  }
}
.footer-upper-sec1-part4 .facebook {
  color: #4e71a8;
  border-radius: 5px;
}
.footer-upper-sec1-part4 .twitter {
  color: #1cb7eb;
  border-radius: 5px;
}
.footer-upper-sec1-part4 .youtube {
  color: #ca3737;
  border-radius: 5px;
}
.footer-upper-sec1-part4 .linkedin {
  color: #1686b0;
  border-radius: 5px;
}
.footer-upper-sec1-part4 ul li {
  margin: 0px 6px 0 0;
}
.footer-upper-sec1-part4 ul li a {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 1px 0 #ebebeb;
  width: 30px;
  height: 30px;
  text-align: center;
  color: #79d1e7;
  font-size: 10px;
}
.footer-upper-sec1-part4-content a {
  float: left;
  width: 50%;
  padding-right: 5px;
  padding-top: 10px;
  display: block;
}
.footer-upper-sec1-part4-content a img {
  max-width: 100%;
  transition: all 0.3s ease-out 0s;
}
.footer-upper-sec1-part4-content:after {
  content: "";
  display: block;
  clear: both;
}
.footer-upper-sec2 {
  padding: 15px;
  background: #fff;
  border-radius: 5px;
}
.footer-upper-sec2-l {
  margin-left: 15px;
}
.footer-upper-sec2-l-icon {
  margin-right: 25px;
}
.footer-upper-sec2-l-text h1 {
  font-size: 1.2rem;
  font-weight: bold;
}
.footer-upper-sec2-l-text p {
  margin: 0;
  line-height: 1.2rem;
}
.footer-upper-sec2-r {
  margin-right: 15px;
}
.footer-upper-sec2-r-search {
  position: relative;
  width: 100%;
}
.footer-upper-sec2-r-search input {
  background: #f3f3f3 !important;
  color: #898d90 !important;
  border: 0;
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-radius: 30px 0 0 30px;
}
.footer-upper-sec2-r-search button {
  background: #363f4d;
  border: 0;
  border-radius: 0 30px 30px 0;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  padding: 0;
  height: 50px;
  width: 67px;
  transition: all 0.4s ease-out;
}
.footer-upper-sec2-r-search button .svg-inline--fa.fa-w-16 {
  width: 1rem;
}
.footer-upper-sec3-linkset ul {
  margin: 0;
}
.footer-upper-sec3-linkset ul li {
  display: inline-block;
  line-height: 15px;
}
.footer-upper-sec3-linkset ul li a {
  text-transform: capitalize;
  display: block;
}

.footer-lower {
  padding: 10px 0;
  background: #000000;
}
.footer-lower .container .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.footer-lower-copyr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.footer-lower-imgs {
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
}
.footer-lower-imgs-img {
  margin-right: 3px;
  margin-left: 3px;
}
.footer-lower-imgs-img img {
  width: 100%;
  box-shadow: 1px 1px 2px #ebebeb !important;
  padding: 2px;
  background: #fff;
}

.search-wrapper {
  position: relative;
  width: 100%;

  .search-result {
    position: absolute;
    z-index: 999999;
    width: 100%;
  }
}

.search-box {
  position: relative;
  width: 100%;

  .search-button {
    position: absolute;
    width: 35px;
    height: 35px;
    border: 0;
    background: #FF1493;
    display: block;
    color: #ffffff;
    font-size: 16px;
    z-index: 95;
    top: 2px;
    right: 2px;
    border-radius: 25px;
    transition: all 0.3s ease-in-out;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.product-search {
  border: 1px solid #FF1493;
  padding: 8px 42px 8px 16px;
  border-radius: 30px;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%) inset;
  width: 100%;
}
.logo-btn {
  color: #fff;
  text-decoration: none;
}
.logo-btn:hover {
  color: #FF1493 !important;
}
</style>
