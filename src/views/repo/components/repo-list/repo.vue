<template>
  <div class="repo">
    <div class="repo-card">
      <div class="content">
        <h3 class="mt-0 ell">
          <VueDropdown buttonClass="icon-button round flat small" class="r" icon-right="more_vert">
            <VueDropdownButton @click="handleDelete(repo.id)">Delete</VueDropdownButton>
          </VueDropdown>
          <span v-if="repo.visibility === 'deleted'" class="delete"
            >#{{ repo.id }} {{ repo.name }}</span
          >
          <span v-else class="cp" @click="toDetail">{{ repo.name }}</span>
        </h3>
        <div class="clear">
          <vue-button
            v-if="repo.visibility === 'deleted'"
            class="icon-button red mr-10 round"
            iconLeft="do_not_disturb"
          />
          <vue-avatar v-else class="mr-10" :src="repo.avatar_url || gitlab" />
          <vue-tag>
            <vue-tag-item>{{ repo.namespace.name }}</vue-tag-item>
            <vue-tag-item class="detail">
              {{ repo.visibility }}
            </vue-tag-item>
          </vue-tag>
        </div>
      </div>
      <div class="footer sm secondary">
        <span class="mr-5">Last Activity</span
        ><span>
          {{ repo.last_activity_at | dateformat }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as UserService from '@/services/userService';
import gitlab from '../../../../assets/imgs/gitlab.png';

export default {
  name: 'Repo',
  props: ['repo'],
  data() {
    return {
      gitlab,
    };
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'RepoDetail', params: { id: this.repo.id } });
    },
    handleDelete(id) {
      UserService.deleteProject(id).then(() => {
        this.$emit('handleFetch');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.repo {
  padding: 0 10px 10px 10px;
}
.repo-card {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  .delete {
    opacity: 0.7;
    text-decoration: line-through;
  }
  .content {
    padding: 15px 15px 10px;
  }
  .footer {
    padding: 10px 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>
