<template>
  <v-container fluid>
    <v-col v-if="!loader">
      <st1loader></st1loader>
    </v-col>
    <v-col v-if="loader">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="tutorials"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:[`item.row`]="{ item }">
            {{
        tutorials
          .map(function (index) {
            return index.id;
          }).indexOf(item.id)+1,

            }}
          </template>
          //disable-pagination :hide-default-footer="true"
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>สภาพอากาศ</v-toolbar-title>
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
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn color="teal" dark class="mb-2" v-bind="attrs" v-on="on">
                  เพิ่มข้อมูล
                </v-btn>
              </template> -->

                <v-card>
                  <v-card-title>
                    <v-row justify="space-between">
                      <v-btn color="warning">{{ formTitle }}</v-btn>
                    </v-row>
                    <!-- <span class="headline">{{ formTitle }}</span> -->
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          ref="form"
                          lazy-validation
                        >
                          <v-text-field
                            v-model="editedItem.STA"
                            label="สถานี"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.MaxTemp"
                            label="ค่า..."
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.MinTemp"
                            label="ค่า..."
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      ยกเลิก
                    </v-btn>
                    <v-btn
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
            <!-- <v-icon
              small
              class="mr-2"
              color="lime lighten-2"
              @click="editItem(item)"
              >mdi-pencil</v-icon
            > -->
            <v-icon
              small
              color="orange darken-3"
              @click="deleteTutorial(item.id, item.title)"
              >mdi-delete</v-icon
            >
          </template>

          <template v-slot:[`item.date`]="{ item }">
            {{
              moment(item.date)
                .locale("th")
                .add(543, "year")
                .format("LL")
            }}
            <v-snackbar
              v-model="snackbar"
              label="Right"
              value="right"
              :timeout="timeout"
              :right="x === 'right'"
              :top="y === 'top'"
              elevation="0"
            >
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
          <template v-slot:footer>
            <v-col cols="12"
              ><v-row>
                <v-card-actions>
                  <v-btn small color="light-blue darken-4">
                    <download-csv
                      class="ma-2 white--text"
                      :data="tutorials"
                      name="ตัวอย่างข้อมูล.csv"
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
                  @change="upFile()"
                  hidden
                />
                <v-btn
                  id="btn"
                  small
                  color="blue-grey"
                  class="ma-2 white--text"
                  type="file"
                  @click="chooseFiles()"
                >
                  นำเข้าไฟล์ CSV

                  <v-icon right dark>
                    mdi-cloud-upload
                  </v-icon>
                </v-btn>
                <v-card-actions v-if="tutorials.length > 0">
                  <v-btn small color="error" @click="removeAllTutorials">
                    ลบข้อมูลทั้งหมด
                  </v-btn>
                </v-card-actions>
              </v-row></v-col
            >
          </template>
          <template v-slot:no-data>
            <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
            <p>ไม่พบข้อมูล</p>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import weatherDataService from "../services/weatherDataService";
import st1loader from "../components/loader/st1-loader.vue";
// import { upload } from "../services/upload";
import moment from "moment-timezone";
import swal from "sweetalert";
// import axios from "axios";
// import http from "../http-common";
export default {
  components: {
    st1loader,
  },
  created() {
    if (this.showAdminBoard) {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
    // this.refreshList();
    // this.timer = setInterval(this.refreshList, 5000);
  },
  name: "tutorials-list",

  data() {
    return {
      loader: false,
      file: "",
      dialog: false,
      search: "",
      tutorials: [],
      title: "",
      percent: {},
      headers: [
        // { text: "ลำดับ",sortable: false, align: "start", value: "row" },
        { text: "Date(DATE/MONTH/YEAR)", value: "date" },
        { text: "MaxTemp", value: "MaxTemp" },
        { text: "MinTemp", value: "MinTemp" },
        { text: "Rainfall", value: "Rainfall" },
        { text: "Evaporation", value: "Evaporation" },
        { text: "Sunshine", value: "Sunshine" },
        { text: "WindGustDir", value: "WindGustDir" },
        { text: "WindGustSpeed", value: "WindGustSpeed" },
        { text: "WindDir9am", value: "WindDir9am" },
        { text: "WindDir3pm", value: "WindDir3pm" },
        { text: "WindSpeed9am", value: "WindSpeed9am" },
        { text: "WindSpeed3pm", value: "WindSpeed3pm" },
        { text: "Humidity9am", value: "Humidity9am" },
        { text: "Humidity3pm", value: "Humidity3pm" },
        { text: "Pressure9am", value: "Pressure9am" },
        { text: "Pressure3pm", value: "Pressure3pm" },
        { text: "Cloud9am", value: "Cloud9am" },
        { text: "Cloud3pm", value: "Cloud3pm" },
        { text: "Temp9am", value: "Temp9am" },
        { text: "Temp3pm", value: "Temp3pm" },
        { text: "RainToday", value: "RainToday" },
        { text: "RISK_MM", value: "RISK_MM" },
        { text: "RainTomorrow", value: "RainTomorrow" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        // id: "",
        // title: "",
        // description: "",
        // published: false,
        // createdAt: "",
      },
      defaultItem: {
        id: "",
        title: "",
        description: "",
        published: false,
        createdAt: "",
      },
      timer: "",
      editedIndex: -1,
      snackbar: false,
      x: "right",
      y: "top",
      text: "ลบข้อมูลเรียบร้อย",
      timeout: 2000,
    };
  },
  methods: {
    // },
    upFile() {
      this.snackbar = false;
      this.selectFile();
      this.sendFile().then(() => {
        this.refreshList();
      });
      // location.reload();
      // console.log(this.file);
    },
    chooseFiles() {
      document.getElementById("input").click();
    },
    selectFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async sendFile() {
      this.refreshList();
      const formData = new FormData();
      formData.append("file", this.file);
      console.log(formData);
      try {
        await weatherDataService.csv(formData);
      } catch (err) {
        console.log(err);
      }
    },
    save(_id) {
      //update
      if (this.editedIndex > -1) {
        console.log(_id);
        weatherDataService
          .update(this.editedItem.id, this.editedItem)
          .then((response) => {
            console.log(response.data);
            this.message = "ลบข้อมมูลแล้ว!";
          })
          .then(() => {
            this.editTutorial;
            this.refreshList();
            this.dialog = false;
          })
          .then(this.close())
          .catch((e) => {
            console.log(e);
          });
      } //add
      else {
        // this.desserts.push(this.editedItem);
        if (this.editedItem.title) {
          // let payload = {
          //   title: this.editedItem.title,
          //   description: this.editedItem.description,
          //   Date: this.editedItem.Date,
          // };
          this.snackbar = false;
          weatherDataService
            .create(this.editedItem)
            .then(() => {
              this.refreshList();
              this.dialog = false;
            })
            .then(this.close())
            .catch((e) => {
              console.log(e);
            });
        }
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
    // date(date) {
    //   return moment(date).format("MMMM Do YYYY");
    // },
    retrieveTutorials() {
      weatherDataService
        .getAll("/csv2")
        .then((response) => {
          this.tutorials = response.data;
          this.loader = true;
          // .map(this.getDisplayTutorial);
          console.log(this.tutorials);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
    },

    removeAllTutorials() {
      weatherDataService
        .deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    editTutorial() {
      swal("Good job!", "You clicked the button!", "success");
    },

    deleteTutorial(id) {
      this.$confirm({
        title: "ยืนยันการลบข้อมูล",
        message: `ต้องการลบหรือไม่`,
        button: {
          no: "ยกเลิก",
          yes: "ยืนยัน",
        },
        callback: (confirm) => {
          if (confirm) {
            weatherDataService
              .delete(id)
              .then(() => {
                this.snackbar = true;
                this.refreshList();
              })
              .catch((e) => {
                console.log(e);
              });
            this.snackbar = true;
          }
        },
      });
    },

    getDisplayTutorial(tutorials) {
      return {
        id: tutorials.id,
        STA: tutorials.STA,
        Date: tutorials.Date,
        // Precip: tutorials.Precip,
        // WindGustSpd: tutorials.WindGustSpd,
        MaxTemp: tutorials.MaxTemp,
        MinTemp: tutorials.MinTemp,
        MeanTemp: tutorials.MeanTemp,
        // Snowfall: tutorials.Snowfall,
        // PoorWeather: tutorials.PoorWeather,
        // title: tutorials.title,
        // DA: tutorials.DA,
        // PRCP: tutorials.PRCP,
        // DR: tutorials.DR,
        // SPD: tutorials.SPD,
        // MAX: tutorials.MAX,
        // MIN: tutorials.MIN,
        // MEA: tutorials.MEA,
        // SNF: tutorials.SNF,
      };
    },
    close() {
      this.dialog = false;
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
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
    // if (this.showAdminBoard) {
    //   this.$store.dispatch("auth/logout");
    //   this.$router.push("/login");
    // }
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
th {
  color: rgb(55, 0, 92) !important;
  background: #eeeeee !important;
}
/* .list {
  max-width: 750px;
} */
</style>
