<template>
  <div v-if="isAdmin && dashboardData">
    <v-row>
      <v-col>
        <v-card elevation="10" outlined tile>
          <v-card-title>Orders</v-card-title>
          <v-card-title>{{dashboardData.totalOrders}}</v-card-title></v-card
        >
      </v-col>
      <v-col>
        <v-card elevation="10" outlined tile>
          <v-card-title>Deliveried Orders</v-card-title>
          <v-card-title>{{dashboardData.totalDeliveriedOrders}}</v-card-title></v-card
        >
      </v-col>
      <v-col>
        <v-card elevation="10" outlined tile>
          <v-card-title>Products</v-card-title>
          <v-card-title>{{dashboardData.totalProducts}}</v-card-title></v-card
        >
      </v-col>
      <v-col>
        <v-card elevation="10" outlined tile>
          <v-card-title>Customers</v-card-title>
          <v-card-title>{{dashboardData.totalUser}}</v-card-title></v-card
        >
      </v-col>
    </v-row>
    <br />


 
    <v-row>
      <v-col>
              <AppOnlineOrder />
      </v-col>
      <v-col>
              <AppDeliveriedOrder />
      </v-col>
    </v-row>
    <br>
        <v-row>
      <v-col>
           <h4 class="text-center pt-10 pb-10">Customer List</h4>
           <v-data-table
      :headers="headers"
      :items="dashboardData.users"
     
      class="elevation-1"
    >
      <template v-slot:dashboardData.users.id="{ item }">{{
        dashboardData.users.indexOf(item) + 1
      }}</template>

      <template v-slot:dashboardData.users.name="{ item }">
   
          {{ item.name }}
     
      </template>

      <template v-slot:dashboardData.users.email="{ item }">
        {{ item.email }}
      
      </template>




    </v-data-table>
      </v-col>
      <v-col>
  <AppProduct />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import AppProduct from "@/components/Dashboard/Product/AppProduct";
import AppOnlineOrder from "@/components/Dashboard/Order/AppOnlineOrder";
import AppDeliveriedOrder from "@/components/Dashboard/Order/AppDeliveriedOrder";
export default {
  middleware: "AdminGaurd",
    components: {
    AppProduct,
    AppOnlineOrder,
    AppDeliveriedOrder,
  },
  data: () => ({
    isAdmin: false,
    admin: null,
    dashboardData: null,
     headers: [
      {
        text: "Name",
        sortable: true,
        value: "name",
      },
      {
        text: "email",
        sortable: false,
        value: "email",
      },
    
    ],
  }),

  mounted() {
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
      this.admin = JSON.parse(localStorage.admin);
      this.ctoken = localStorage.token;
      this.getDashboardData();
    }
  },

  methods: {
    getDashboardData() {
      const config = {
        headers: { Authorization: `Bearer ${this.ctoken}` },
      };
      this.$axios.$get("/admin/dashboard", config).then((res) => {
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
