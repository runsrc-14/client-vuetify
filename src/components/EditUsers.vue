<template>
  <v-col>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="tutorials"
        class="elevation-1"
        :search="search"
      >
        <!-- //disable-pagination :hide-default-footer="true" -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title><h6>เจ้าหน้าที่</h6> </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
            >
            </v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  color="teal"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  เพิ่มข้อมูล
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <v-row justify="space-between">
                    <v-btn color="warning">{{ formTitle }}</v-btn>
                  </v-row>
                  <!-- <span class="headline">{{ formTitle }}</span> -->
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          ref="form"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="editedItem.username"
                            :rules="rul.userRules"
                            label="ชื่อผู้ใช้งาน"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            :rules="rul.emailRules"
                            label="อีเมลล์"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.firstname"
                             :rules="rul.firstname"
                            label="ชื่อ"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.lastname"
                             :rules="rul.lastname"
                            label="นามสกุล"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-if="editedIndex == -1">
                          <v-text-field
                            v-model="editedItem.password"
                            :rules="rul.password"
                            type="password"
                            label="รหัสผ่าน"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-row>
                          <v-list-item v-if="error">
                            <!-- <v-list-item-icon> -->
                            <v-icon color="error" text left>info</v-icon>
                            <!-- </v-list-item-icon> -->
                            <v-list-item-title class="red--text">
                              {{ error }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-row>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    :disabled="
                      !valid || editedItem.username < 1 || editedItem.email < 1
                    "
                    color="blue darken-1"
                    text
                    @click="save(editedItem.id)"
                  >
                    บันทึก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="lime lighten-2"
            @click="editItem(item)"
            >mdi-pencil</v-icon
          >
          <v-icon
            small
            color="orange darken-3"
            @click="deleteTutorial(item.id, item.username)"
            >mdi-delete</v-icon
          >
          <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
            {{ text }}

            <template v-slot:action="{ on, attrs }">
              <v-icon
                small
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
        </template>

        <template v-slot:[`item.username`]="{ item }">
          <v-avatar size="40">
            <img src="../assets/avatar2.png" alt="avatar" />
          </v-avatar>
          {{ item.username }}
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a") }}
        </template>
        <template v-slot:footer>
          <!-- <v-card-actions v-if="tutorials.length > 0">
            <v-btn small color="error" @click="removeAllTutorials">
              Remove All
            </v-btn>
          </v-card-actions> -->
          <v-card-actions>
            <v-btn small color="light-blue darken-4">
              <download-csv
                class="white--text"
                :data="tutorials"
                name="ข้อมูลเจ้าหน้าที่.csv"
              >
                ดาวน์โหลดไฟล์ csv
                <v-icon right dark>
                  mdi-file-download
                </v-icon>
              </download-csv>
            </v-btn>
          </v-card-actions>

          <input
            id="input"
            ref="file"
            type="file"
            accept=".csv"
            @change="upFile"
            hidden
          />
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
          <p>ไม่พบข้อมูล</p>
        </template>
      </v-data-table>
    </v-card>
  </v-col>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
// import { upload } from "../services/upload";
import moment from "moment";
import swal from "sweetalert";
// import axios from "axios";
import http from "../http-common";
// import axios from "axios";
// import { response } from "express";
export default {
  // created() {
  //   this.timer = setInterval(this.retrieveTutorials, 500);
  // },
  name: "tutorials-list",

  data() {
    return {
      valid: true,
      rul: {
        emailRules: [
          (v) => !!v || "กรุณากรอกอีเมลล์",
          (v) => /.+@.+\..+/.test(v) || "รูปแบบอีเมลล์ไม่ถูกต้อง",
        ],
        userRules: [(v) => !!v || "กรุณากรอกชื่อผู้ใช้งาน"],
        password: [(v) => !!v || "กรุณากรอกรหัสผ่าน"],
        firstname: [(v) => !!v || "กรุณากรอกชื่อ"],
        lastname: [(v) => !!v || "กรุณากรอกนามสกุล"],
      },
      file: "",
      dialog: false,
      search: "",
      tutorials: [],
      title: "",
      headers: [
        { text: "ID", align: "start", sortable: false, value: "id" },
        { text: "Username", value: "username", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "ชื่อ", align: "start", sortable: false, value: "firstname" },
        { text: "นามสกุล", align: "start", sortable: false, value: "lastname" },
        { text: "created", value: "createdAt", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],

      editedItem: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        createdAt: "",
      },
      defaultItem: {
        id: "",
        username: "",
        email: "",
        password: "",
        createdAt: "",
      },
      timer: "",
      editedIndex: -1,
      snackbar: false,
      text: "ลบข้อมูลเรียบร้อย",
      timeout: 2000,
      color: "",
      error: false,
      verify: [],
      errorMSG: [
        {
          message: "",
        },
      ],
    };
  },
  methods: {
    upFile() {
      this.snackbar = false;
      this.selectFile();
      this.sendFile().then(() => {
        this.refreshList();
      });
      // console.log(this.file);
    },
    chooseFiles() {
      document.getElementById("input").click();
    },
    save(_id) {
      if (this.editedIndex > -1) {
        console.log(_id);
        TutorialDataService.update(this.editedItem.id, this.editedItem)
          //  this.$store.dispatch("auth/edit",this.editedItem.id,this.editedItem)
          .then(
            (response) => {
              console.log(response.data);
              this.snackbar = true;
              this.text = "แก้ไขข้อมูลเรียบร้อย";
              this.color = "success";
              this.dialog = false;
              this.close()
              this.refreshList();
            },
            (error) => {
              this.error =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          )
          // .then(() => {
          // this.refreshList();
          // this.dialog = false;
          // })
          // .then(this.close())
          .catch((error) => {
            console.log(error);
          });
      } else {
        // this.desserts.push(this.editedItem);

        this.snackbar = false;
        this.$store.dispatch("auth/register", this.editedItem).then(
          () => {
            this.snackbar = true;
            this.text = "เพิ่มข้อมูลเจ้าหน้าที่เรียบร้อย";
            this.color = "success";
            this.dialog = false;
            this.refreshList();
          },
          (error) => {
            this.error =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    editItem(item) {
      this.editedIndex = this.tutorials.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    moment(date) {
      return moment(date);
    },

    retrieveTutorials() {
      http
        .get("/usersAll/") // TutorialDataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          // .map(this.getDisplayTutorial);
          // this.cancelAutoUpdate();
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      // this.rul = false;
      // this.editedItem = "";
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.error = false;
      this.retrieveTutorials();
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editTutorial() {
      // this.$router.push({ name: "tutorial-details", params: { id: id } });
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    },
    deleteTutorial(id, title) {
      this.$confirm({
        title: "ยืนยันการลบผู้ใช้งาน",
        message: `ต้องการลบผู้ใช้งาน` + " " + title + "  " + `หรือไม่`,
        button: {
          no: "ยกเลิก",
          yes: "ยืนยัน",
        },
        callback: (confirm) => {
          if (confirm) {
            TutorialDataService.delete(id)
              .then(() => {
                this.refreshList();
                this.snackbar = true;
                this.text = "ลบข้อมูลเรียบร้อย";
                this.color = "black";
              })
              .catch((e) => {
                console.log(e);
              });
            // this.snackbar = true;
          }
        },
      });
    },

    getDisplayTutorial(tutorials) {
      return {
        id: tutorials.id,
        title:
          tutorials.title.length > 10
            ? tutorials.title.substr(0, 10) + "..."
            : tutorials.title,
        createdAt: tutorials.createdAt,
        description:
          tutorials.description.length > 30
            ? tutorials.description.substr(0, 30) + "..."
            : tutorials.description,
        status: tutorials.published ? "Published" : "Pending",
      };
    },
    close() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.error = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // cancelAutoUpdate() {
    //   clearInterval(this.timer);
    // },
  },

  computed: {
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน";
    },
  },
  mounted() {
    if (!this.showAdminBoard) {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
    this.retrieveTutorials();
  },
  // beforeDestroy() {
  //   this.cancelAutoUpdate();
  // },
};
</script>

<style scope>
/* .v-input__slot {
  width: 30%;
} */

.list {
  max-width: 750px;
}
/* .v-messages {
  flex: none;
} */
</style>
