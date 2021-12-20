<template>
<div>
 
  </div>
</template>
<script>

export default {
  middleware: "AdminGaurd",
  data: () => ({

    isAdmin:false,
    admin:null,

  }),

  mounted() {
     if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
      this.ctoken = localStorage.token;

      
    }
    
  },

  methods: {
    getDashboardData() {
      this.$axios.$get("/admin/dashboard").then((res) => {
        this.dashboardData = res.data;
        console.log(this.dashboardData);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-approval {
  display: flex;
  justify-content: flex-end;
}

.unapproved-product {
  position: relative;

  & > .tag {
    position: absolute;
    top: 0px;
    left: -10px;
    z-index: 9999;
    background: #ff5f5f;
    color: white;
    width: 25px;
    height: 25px;
    font-size: 11px;
    text-align: center;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}

.dashboard-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
  .card {
    width: 300px;
    text-align: center;
    padding: 20px 0px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background: #eeeeee;
    margin-right: 20px;
    margin-bottom: 20px;

    .count {
      font-size: 30px;
      font-weight: bold;
      margin: 0px;
    }

    .count-title {
      margin: 0px;
      text-transform: uppercase;
      font-weight: 500;
    }
  }
}
</style>
