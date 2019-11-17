<template>
  <div class="uk-card uk-card-default uk-card-body" uk-sticky style="height: 100vh;">
    <client-only>
      <h4>Halo, {{ $auth.user.name }}</h4>

      <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
        <li class="uk-nav-header">Menu</li>
        <li>
          <nuxt-link to="/backend/blog" tag="a">
            <span class="uk-margin-small-right" uk-icon="icon: album"></span> Gojek
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/backend/desa" tag="a">
            <span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Tokopedia
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/backend/data" tag="a">
            <span class="uk-margin-small-right" uk-icon="icon: file-text"></span> Informasi Data Desa
          </nuxt-link>
        </li>
        <li v-if="$auth.user.status_user == 'admin'">
          <nuxt-link to="/backend/user" tag="a">
            <span class="uk-margin-small-right" uk-icon="icon: user"></span> User
          </nuxt-link>
        </li>
        <li>
          <a href="javascript:void()" @click="$auth.logout().then(() => {location.reload()})">
            <span class="uk-margin-small-right" uk-icon="icon: sign-out"></span> Keluar
          </a>
        </li>
      </ul>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  async mounted() {
    let self = this;
    if (this.$auth.loggedIn) {
      await this.$auth.fetchUser();
    }
  }
};
</script>