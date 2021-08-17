<template>
  <v-navigation-drawer v-model="draw" :mini-variant.sync="mini" app>
    <v-card class="mx-auto" width="300">
      <v-list>
        <!-- list band -->
        <v-list-item>
          <!-- <v-avatar size="40" class="mr-2">
              <img src="./assets/noun_smart farm_2700314.png" alt="alt" />
            </v-avatar> -->
          <v-list-item-avatar>
            <v-img src="../../assets/noun_smart farm_2700314.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>
            ระบบสมาร์ทฟาร์ม
          </v-list-item-title>
          <v-btn
            icon
            @click.stop="mini = !mini"
            style="
            box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            height:30px;
            width:30px;
            margin-right:8px;
          "
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <!-- list Dashboard -->
        <v-list-item active-class="light-green--text" to="/home" link>
          <!-- @click="mini = !mini" -->
          <v-icon>mdi-monitor-dashboard</v-icon>
          <v-list-item-title class="ml-3">Dashboard </v-list-item-title>
        </v-list-item>
        <!-- list สถานนี -->
        <v-list-group :value="true" no-action>
          <template v-slot:activator>
            <v-icon>mdi-home-assistant</v-icon>
            <v-list-item-title class="ml-3">สถานี</v-list-item-title>
          </template>
          <v-list-item
            active-class="light-green--text"
            v-for="(item, i) in stations"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-icon>
              <v-icon color="blue-grey" dark v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <!-- list Edit Users -->
        <v-list-group v-if="showAdminBoard" :value="true" no-action>
          <template v-slot:activator
            ><v-icon>mdi-account-edit</v-icon>
            <v-list-item-title class="ml-3"
              >จัดการผู้ใช้งานระบบ</v-list-item-title
            >
          </template>
          <v-list-item
            active-class="light-green--text"
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <!-- list edit data -->
        <v-list-group
          v-if="!showAdminBoard && currentUser"
          :value="true"
          no-action
        >
          <template v-slot:activator
            ><v-icon>mdi-home-group</v-icon>
            <v-list-item-title class="ml-3"
              >จัดการข้อมูลสถานี</v-list-item-title
            >
          </template>
          <v-list-item
            active-class="light-green--text"
            v-for="(item, i) in EditSt1"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list> </v-card
  ></v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/home");
    },
    addDrawer() {
      this.draw = this.drawer2;
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  // data: () => ({ drawer: null }),
  data() {
    return {
      draw: null,
      mini: true,
      dialog: false,
      items: [
        {
          icon: "mdi-account-multiple-outline",
          text: "ข้อมูลเจ้าหน้าที่",
          link: "/editUser",
        },
      ],

      stations: [
        {
          icon: "mdi-home-floor-1",
          text: "weather stations",
          link: "/stations1",
        },
        {
          icon: "mdi-home-floor-3",
          text: "weather stations",
          link: "/stations2",
        },
        {
          icon: "mdi-home-floor-3",
          text: "weather stations",
          link: "/stations3",
        },
      ],
      EditSt1: [
        {
          icon: "mdi-home-edit",
          text: "จัดการข้อมูลสถานี",
          link: "/stations",
        },
      ],
      model: 1,
    };
  },
  props: {
    drawer2: {},
  },
  mounted() {
    this.addDrawer();
  },
};
</script>
<style scoped>
#pt {
  color: #000 !important;
}
@media only screen and (min-width: 600px) {
  .draw {
    display: none !important;
  }
}
@media only screen and (max-width: 600px) {
  #login span {
    display: none;
  }
}
.draw {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  max-width: 2rem;
  max-height: 2rem;
  margin-right: 8px;
}

* {
  font-size: 15px !important;
}
.logout {
  font-size: 10px !important;
}
</style>
