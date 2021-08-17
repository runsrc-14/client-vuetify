<template>
  <v-app-bar
    app
    dark
    dense
    color="purple darken-4"
    elevate-on-scroll
    height="60em"
  >
    <v-app-bar-nav-icon class="draw" @click="drawer = !drawer"
      ><v-icon>mdi-transfer-right</v-icon></v-app-bar-nav-icon
    >

    <v-toolbar-title
      ><span style="cursor: pointer" @click="$router.push('/home')">Home</span>
      / {{ $route.meta.title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-if="!currentUser && $route.meta.title != 'เข้าสู่ระบบ'"
      small
      color="blue"
      id="login"
      to="/login"
      link
    >
      <v-icon left>mdi-login</v-icon>เข้าสู่ระบบ
    </v-btn>

    <v-menu open-on-hover left offset-y rounded="b-xl t-lg" v-if="currentUser">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue-grey" v-bind="attrs" v-on="on" small fab>
          <v-avatar size="30" v-bind="attrs" v-on="on">
            <img
              src="../../assets/avatar (1).png"
              alt="alt"
              v-if="currentUser && showAdminBoard"
            />
            <img
              src="../../assets/avatar2.png"
              alt="alt"
              v-if="currentUser && !showAdminBoard"
            />
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="text-center pa-2">
        <v-avatar size="44">
          <img
            src="../../assets/avatar (1).png"
            alt="alt"
            v-if="currentUser && showAdminBoard"
          />
          <img
            src="../../assets/avatar2.png"
            alt="alt"
            v-if="currentUser && !showAdminBoard"
          />
        </v-avatar>
        <v-list-item-title class="purple--text"
          >@{{ currentUser.username }}</v-list-item-title
        >
        <v-list-item-title class="font-weight-light">{{
          currentUser.email
        }}</v-list-item-title>

        <v-list-item-title class="font-weight-light"
          ><v-divider class="mx-4"></v-divider
          ><v-btn
            text
            class="logout mt-2"
            color="cyan"
            @click="getData(currentUser.id)"
            >แก้ไขข้อมูลส่วนตัว</v-btn
          ></v-list-item-title
        >
        <v-btn text small color="red" dark class="logout" @click="logOut">
          ออกจากระบบ
        </v-btn>
      </v-list>
    </v-menu>
    <!-- //edit  -->
    <v-dialog v-model="dialog" max-width="320px">
      <v-card>
        <v-card-title>
          <v-row justify="space-between">
            <v-btn text disabled color="warning">แก้ไขข้อมูลส่วนตัว</v-btn>
          </v-row>
          <!-- <span class="headline">{{ formTitle }}</span> -->
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-col ref="form" lazy-validation>
                  <v-text-field
                    v-model="item.username"
                    label="ชื่อผู้ใช้งาน"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="item.email"
                    label="อีเมลล์"
                  ></v-text-field>
                </v-col>
                <!-- <v-col>
                  <v-text-field
                    v-model="item.password"
                    type="password"
                    label="รหัสผ่านเดิม"
                  ></v-text-field>
                </v-col> -->
                <v-col>
                  <v-text-field
                    type="password"
                    v-model="password"
                    label="รหัสผ่านใหม่"
                  ></v-text-field>
                  <!-- <code v-show="item.password !== ''">{{ item.password }}</code> -->
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="save(currentUser.id)">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script>
import TutorialDataService from "../../services/TutorialDataService";
import bcrypt from "bcryptjs";
import debounce from "lodash.debounce";
const METHODS = { BCRYPT: "bcrypt" };
export default {
  data() {
    return {
      item: "",
      selectedMethod: METHODS.BCRYPT,
      password: "",
      saltLength: 8,
      defaultItem: {
        id: "",
        username: "",
        email: "",
        password: "",
        createdAt: "",
      },
      drawer: true,
      mini: true,
      dialog: false,
      model: 1,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/home");
    },
    save(_id) {
      console.log(_id);
      TutorialDataService.update(this.item.id, this.item)
        .then((response) => {
          console.log(response.data);
          this.message = "The User was updated successfully!";
        })
        .then(() => {
          this.password = "";
          this.dialog = false;
        })
        .then(this.close())
        .catch((e) => {
          console.log(e);
        });
    },
    getData(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.item = response.data;
          this.dialog = true;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.item = Object.assign({}, this.defaultItem);
      });
    },
    generatePassword() {
      const self = this;
      if (self.password !== "") {
        if (this.selectedMethod === METHODS.BCRYPT) {
          this.debouncedBcrypt();
        }
      } else {
        self.item.password = "";
      }
    },
    setBcryptHash() {
      const self = this;
      self.calculating = true;
      bcrypt.genSalt(self.saltLength, (err, salt) => {
        if (!err) {
          bcrypt.hash(self.password, salt, (err, hash) => {
            if (!err) {
              self.item.password = `${hash}`;
              self.calculating = false;
            }
          });
        }
      });
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
  watch: {
    password() {
      this.generatePassword();
    },
    saltLength() {
      this.generatePassword();
    },
    selectedMethod() {
      this.generatePassword();
    },
  },
  created() {
    this.debouncedBcrypt = debounce(this.setBcryptHash, this.debounceTimer);
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
