<template>
  <div>
    <div
      class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade"
      uk-height-viewport
    >
      <div class="uk-width-1-1">
        <div class="uk-container">
          <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
            <div class="uk-width-1-1@m" v-if="!($auth.loggedIn)">
              <div
                class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
              >
                <h3 class="uk-card-title uk-text-center">Selamat Datang!</h3>
                <form @submit.prevent="userLogin">
                  <div class="uk-margin">
                    <div class="uk-inline uk-width-1-1" for="post-user-login-nik">
                      <span class="uk-form-icon" uk-icon="icon: mail"></span>
                      <input
                        class="uk-input uk-form-large"
                        type="text"
                        v-model="post_user_login.email"
                      />
                    </div>
                  </div>
                  <div class="uk-margin">
                    <div class="uk-inline uk-width-1-1">
                      <span class="uk-form-icon" uk-icon="icon: lock"></span>
                      <input
                        class="uk-input uk-form-large"
                        type="password"
                        v-model="post_user_login.password"
                      />
                    </div>
                  </div>
                  <div class="uk-margin">
                    <button
                      class="uk-button uk-button-primary uk-button-large uk-width-1-1"
                      @click="userLogin"
                    >Masuk</button>
                  </div>
                  <div class="uk-text-small uk-text-center">
                    Belum Daftar?
                    <nuxt-link tag="a" to="/regist">Buat Akun</nuxt-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post_user_login: {
        email: "",
        password: ""
      },
      post_user_login_status: false
    };
  },
  async mounted() {
    let self = this;
    if (this.$auth.loggedIn) {
      await this.$auth.fetchUser();
    }
  },
  methods: {
    userLogin() {
      let self = this;
      if (!self.post_user_login_status) {
        self.post_user_login_status = true;
        self.$auth
          .loginWith("local", { data: self.post_user_login })
          .then(r => {
            console.log(r);
            // self.$toasted.success("Berhasil Masuk");
            // window.location = "/";
          })
          .catch(err => {
            console.log(err);
            if (err.message == "Request failed with status code 401") {
              self.post_user_login.password = "";
              // self.$toasted.show("Email atau Password salah");
              alert("Email atau Password salah");
            } else {
              // self.$toasted.error(err.message);
              alert(err.message);
            }
          })
          .finally(function() {
            self.post_user_login_status = false;
          });
      }
    }
  }
};
</script>