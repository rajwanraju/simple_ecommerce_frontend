<template>
  <section>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="agentList"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.id="{ item }">{{
        agentList.indexOf(item) + 1
      }}</template>

      <template v-slot:item.agentName="{ item }">
        <a @click="agentDetails(item)" class="order-link">
          {{ item.agentName }}
          <br />
          {{ item.agentPhone }}
        </a>
      </template>

      <template v-slot:item.agent_address="{ item }">
        {{ item.agent_address }}
        <br />
        {{ item.agent_dis }},{{ item.agent_div }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">mdi-table-edit</v-icon>
        <v-btn elevation="2" x-small color="error" @click="blockUser(item)">{{
          item.isBlocked ? "Unblock" : "Block"
        }}</v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>All Customer List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <v-card>
              <v-toolbar dark color="primary">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
              </v-toolbar>

              <v-container>
                <v-row>
                  <v-col cols="6">
                    <span class="overline">Full Name</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="editedItem.name"
                      label="Full Name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <span class="overline">Email</span>
                    <v-text-field
                      label="Email"
                      :rules="usernameRules"
                      append-icon="email"
                      solo-inverted
                      color="primary"
                      depressed
                      v-model="editedItem.email"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6" v-if="editedIndex === -1">
                    <span class="overline">Password</span>
                    <v-text-field
                      outlined
                      dense
                      :rules="passwordRules"
                      :append-icon="
                        passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="passwordVisibility ? 'text' : 'password'"
                      @click:append="passwordVisibility = !passwordVisibility"
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <span class="overline">Phone</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="editedItem.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <span class="overline">Address</span>
                    <v-text-field
                      outlined
                      dense
                      v-model="editedItem.address"
                      label="Address"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-card-actions>
                <v-btn color="blue darken-1" large text @click="close()"
                  >Cancel</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="primary" large @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import moment from "moment";
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {},
  data: () => ({
    moment: moment,
    employeeList: [],
    menu: false,
    showDialog: false,
    search: "",
    modal: false,
    date: new Date().toISOString().substr(0, 10),
    cashIn: [],
    cashOut: [],
    dialog: false,
    emiDialog: false,
    emiAgentId: "",
    isCustomer: false,
    customer: null,
    ctoken: null,
    emiAmount: 0,
    paymentAgentId: "",
    paymentDialog: false,
    paymentAmount: 0,
    agentPaymentModal: false,
    usernameRules: [
      (v) => !!v || "Name is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
    passwordVisibility: false,
    editedIndex: -1,
    showIndex: -1,
    agentData: [],
    editedItem: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      district_incharge: "",
      division_incharge: "",
    },
    defaultItem: {
      name: null,
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      district_incharge: "",
      division_incharge: "",
    },
    agentList: [],
    headers: [
      {
        text: "Name",
        sortable: true,
        value: "name",
      },
      {
        text: "Phone",
        sortable: false,
        value: "phone",
      },
      { text: "Agent", value: "agentName", sortable: true },
      { text: "Agent Details", value: "agent_address", sortable: true },
      { text: "Address.", value: "address", sortable: true },
      { text: "Actions", value: "action", sortable: false },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Customer" : "Edit Customer";
    },

    getValidation() {
      const { name, email, password, phone, address } = this.editItem;

      if (name && email && password && phone && address) {
        return true;
      } else {
        return false;
      }
    },
  },

  mounted() {
    if (localStorage.admin) {
      this.isCustomer = localStorage.admin;
      this.customer = JSON.parse(localStorage.admin);
      this.ctoken = localStorage.token;
    }
    this.getAllUserCustomers();
  },

  methods: {
    ...mapActions({
      successMessage: "snackbar/successMessage",
      errorMessage: "snackbar/errorMessage",
    }),
    close() {
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.showDialog = false;
      this.showedItem = Object.assign({}, this.defaultItem);
      this.showIndex = -1;
      this.newImage = false;
    },

    editItem(item) {
      this.editedIndex = this.agentList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    agentDetails(item) {
      this.$router.push("/dashboard/agent/" + item.agent);
    },

    getAllUserCustomers() {
      const url = "/agent/allUsers";
      this.$axios.setToken(localStorage.getItem("token"));
      this.$axios.$get(url).then((res) => {
        this.agentList = res.data;
        this.successMessage("All Agent User");
      });
    },

    blockUser(item) {
      this.$axios
        .$get(`/agent/block/${item._id}/${item.isBlocked ? 1 : 0}`)
        .then((res) => {
          this.getAllUserCustomers();
        });
    },

    save() {
      if (this.editedIndex > -1) {
        const paylod = JSON.parse(JSON.stringify(this.editedItem));
        paylod["_id"] = this.editedItem._id;
        this.$axios.setToken(localStorage.getItem("token"));
        this.$axios.$post(`/agent/updateBasic`, paylod).then((res) => {
          if (res.success) {
            this.getAllUserCustomers();
            this.close();
          }
        });
      } else {
        this.errorMessage = "Some Thing Went Wrong";
      }
    },

  },
};
</script>
