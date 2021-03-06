<script>
import { mapActions } from 'vuex';
import CardContent from '@/components/card-content.vue';
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
    loggedIn: {
      type: Boolean,
      default: () => false,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    CardContent,
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions('catalog', ['postOrder']),
    // ...mapActions('userInfo', ['getUserInfo']),
    logUser(result) {
      this.loggedIn = true;
      console.log(result);
      return 'ok';
    },
    order(icecreamId) {
      getUserInfo()
        .then((result) => this.logUser(result));
      if (this.loggedIn) {
        const data = {
          id: icecreamId,
        };
        this.postOrder(data);
      }
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <div
        v-for="(icecream) in icecreams"
        :key="icecream.Id"
        role="presentation"
      >
        <div class="card" v-on:click="order(icecream.Id)">
          <CardContent
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
