<template>
  <div>
    <div uk-grid>
      <div class="uk-width-1-4 uk-dark">
        <sidebars />
      </div>
      <div class="uk-width-3-4 uk-dark uk-padding">
        <div class="uk-align-right">
          <button
            class="uk-button uk-button-primary uk-button-small"
            type="button"
            uk-toggle="target: #modal-add-user"
          >Tambah User</button>
        </div>
        <table class="uk-table uk-table-justify uk-table-divider">
          <thead>
            <tr>
              <th class="uk-width-medium">Nama</th>
              <th class="uk-width-small">Status</th>
              <th class="uk-width-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rbb, rbb_i) in response.backend_user" :key="'rbb_i' + rbb_i">
              <td>{{ rbb.name }}</td>
              <td>{{ rbb.status_user | capitalize }}</td>
              <td class="uk-text-center">
                <button
                  class="uk-button uk-button-default uk-button-small"
                  type="button"
                  uk-toggle="target: #modal-edit-user"
                  @click="put_backend_user.id_user = rbb.id_user; put_backend_user.status_user = rbb.status_user;"
                >Edit</button>
                <button
                  class="uk-button uk-button-danger uk-button-small"
                  type="button"
                  uk-toggle="target: #modal-delete-user"
                  @click="delete_backend_user.id_user = rbb.id_user;delete_backend_user.name = rbb.name;"
                >Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="modal-add-user" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Tambah User</h2>
        <form class="uk-form-stacked" @submit.prevent="postBackendUser()">
          <div class="uk-margin">
            <label class="uk-form-label" for="post-user-login-nik">Username</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="post-user-login-nik"
                type="text"
                placeholder="Username"
                v-model="post_backend_user.username"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="post-user-login-nik">Nama</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="post-user-login-nik"
                type="text"
                placeholder="Nama Lengkap"
                v-model="post_backend_user.name"
              />
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="post-user-login-nik">Password</label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="post-user-login-nik"
                  type="password"
                  v-model="post_backend_user.password"
                />
              </div>
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="post-user-login-password">Email</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="post-user-login-password"
                type="email"
                v-model="post_backend_user.email"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-select">Status User</label>
            <div class="uk-form-controls">
              <select
                class="uk-select"
                id="form-stacked-select"
                v-model="post_backend_user.status_user"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </form>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Batal</button>
          <button class="uk-button uk-button-primary" type="button" @click="postBackendUser()">Kirim</button>
        </p>
      </div>
    </div>

    <div id="modal-edit-user" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Edit User</h2>
        <form class="uk-form-stacked" @submit.prevent="putBackendUser()">
          <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-select">Status User</label>
            <div class="uk-form-controls">
              <select
                class="uk-select"
                id="form-stacked-select"
                v-model="put_backend_user.status_user"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </form>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Batal</button>
          <button class="uk-button uk-button-primary" type="button" @click="putBackendUser()">Kirim</button>
        </p>
      </div>
    </div>

    <div id="modal-delete-user" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Hapus User ({{ delete_backend_user.name }})</h2>
        <p class="uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close" type="button">Batal</button>
          <button
            class="uk-button uk-button-primary"
            type="button"
            @click="deleteBackendUser()"
          >Kirim</button>
        </p>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import sidebars from "~/components/sidebars.vue";

export default {
  auth: true,
  components: {
    sidebars
  },
  data() {
    return {
      response: {
        backend_user: []
      },
      post_backend_user: {
        username: "",
        name: "",
        password: "",
        email: "",
        status_user: ""
      },
      put_backend_user: {
        id_user: "",
        name: "",
        status_user: ""
      },
      delete_backend_user: {
        id_user: "",
        name: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let self = this;
      self.$axios
        .$get("/user/")
        .then(response => {
          self.response.backend_user = response.data;
          console.log(response.data);
        })
        .catch(function(error) {
          // self.$toasted.error(error.message);
          alert(error.message);
        })
        .finally(function() {});
    },
    postBackendUser() {
      let self = this;
      try {
        if (self.post_backend_user.username == "") {
          throw "username tidak boleh kosong";
        }
      } catch (e) {
        alert(e);
        return;
      }
      self.$axios
        .$post("/user/backend/register", self.post_backend_user)
        .then(response => {
          UIkit.modal("#modal-add-user").hide();
          self.post_backend_user = {
            username: "",
            name: "",
            password: "",
            email: "",
            status_user: ""
          };
          self.init();
        })
        .catch(function(error) {
          alert(error.message);
        })
        .finally(function() {});
      // if (
      //   self.post_backend_user.password != "" &&
      //   self.post_backend_user.name != "" &&
      //   self.post_backend_user.email != "" &&
      //   self.post_backend_user.phone != "" &&
      //   self.post_backend_user.status_user != ""
      // ) {
      // }
    },
    putBackendUser() {
      let self = this;
      if (
        self.put_backend_user.id_user != "" &&
        self.put_backend_user.status_user != ""
      ) {
        self.$axios
          .$put(
            "/user/edit/" + self.put_backend_user.id_user,
            self.put_backend_user
          )
          .then(response => {
            UIkit.modal("#modal-edit-user").hide();
            self.put_backend_user = {
              id_user: "",
              name: "",
              status_user: ""
            };
            self.init();
          })
          .catch(function(error) {
            alert(error.message);
          })
          .finally(function() {});
      }
    },
    deleteBackendUser() {
      let self = this;
      if (self.delete_backend_user.id_user != "") {
        self.$axios
          .$delete("/user/delete/" + self.delete_backend_user.id_user)
          .then(response => {
            UIkit.modal("#modal-delete-user").hide();
            self.delete_backend_user = {
              id_user: "",
              name: ""
            };
            self.init();
          })
          .catch(function(error) {
            alert(error.message);
          })
          .finally(function() {});
      }
    }
  }
};
</script>