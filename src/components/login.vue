<template>
  <v-layout justify-center class="mt-5 pt-5">
    <v-col cols="12" sm="6" md="4">
      <v-card
        v-on:keyup.enter="handleLogin"
        :class="`rounded-xl`"
        dark
        color="#0B0742"
        style="box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
      >
        <v-card-text class="text-center">
          <v-avatar vatar size="128">
            <img src="../assets/avatar.png" alt="alt" />
          </v-avatar>
          <v-toolbar-title
            class="d-flex justify-center"
            style="font-family: 'Yomogi', cursive;"
          >
            Wellcome <p v-if="user.username" class="ml-2">{{ user.username }}</p>
          </v-toolbar-title>
          <v-form class="ml-5 mr-5"
            >
            <v-text-field
              prepend-icon="mdi-account-circle"
              name="username"
              label="ชื่อผู้ใช้งาน"
              v-model="user.username"
              :rules="[rules.requiredUsers]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-lock"
              name="password"
              label="รหัสผ่าน"
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.requiredPassword]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <!-- hint="รหัสผ่านต้องไม่น้อยกว่า 8 ตัว" counter -->
            <v-card-actions class="d-flex justify-space-around">
              <v-btn
                small
                color="purple lighten-1"
                @click="handleLogin"
                :disabled="user.username.length < 1 || user.password.length < 1"
                >เข้าสู่ระบบ</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      label="Right"
      value="right"
      :timeout="timeout"
      :right="x === 'right'"
      :top="y === 'top'"
      elevation="0"
    >
      <span v-if="message">{{ message }}</span>

      <template v-slot:action="{ on, attrs }">
        <v-icon
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
          v-on="on"
        >
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
// import User from "../models/user";

export default {
  data() {
    return {
      // user: new User("", ""),
      user:{
        username:"",
        password:""
      },
      message: "",
      show1: false,
      password: "",
      snackbar: false,
      x: "right",
      y: "top",
      text: "",
      timeout: 2000,
      rules: {
        required: (value) => !!value || "กรอกรหัสผ่าน.",
        emailMatch: () => `รูปแบบอีเมลล์ไม่ถูกต้อง`,
        requiredUsers: (value) => !!value || "กรอกชื่อผู้ใช้งาน.",
        requiredPassword: (value) => !!value || "กรอกรหัสผ่าน.",
      },
    };
  },
  methods: {
    // login() {
    //   this.$router.push({ path: `/home` });
    // },
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/home");
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.snackbar = true;
          }
        );
      }
    },
  },

  name: "Login",
  props: {
    source: String,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scope>
.v-application .error--text {
  color: #cf02a3 !important;
}
#user {
  font-size: 10px !important;
}
</style>
