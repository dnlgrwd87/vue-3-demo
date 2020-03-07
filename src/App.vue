<template>
    <div class="container mt-4">
        <h3 v-if="!loading && error.length" class="text-danger">{{ error }}</h3>
        <div class="d-flex">
            <input
                v-if="posts.length && !loading"
                placeholder="search for a post"
                type="text"
                class="form-control form-control-sm w-50"
                v-model="searchInput"
            />
            <button
                :disabled="loading"
                class="btn btn-sm btn-primary ml-auto d-flex align-items-center"
                @click="fetchPosts"
            >
                <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
                {{ loading ? 'Loading' : 'Fetch posts' }}
            </button>
        </div>

        <div v-if="!loading && filteredPosts.length" class="list-group mt-2">
            <li class="list-group-item" v-for="post in filteredPosts" :key="post.id">
                {{ post.title }}
            </li>
        </div>
    </div>
</template>

<script>
import { useFetchPosts } from './hooks/useFetchPosts';
import { ref, computed } from '@vue/composition-api';

export default {
    setup() {
        const searchInput = ref('');
        const { posts, loading, error, fetchPosts } = useFetchPosts();
        const filteredPosts = computed(() =>
            posts.value.filter(p => {
                return p.title.toLowerCase().indexOf(searchInput.value) > -1;
            })
        );

        return { posts, filteredPosts, loading, error, fetchPosts, searchInput };
    }
};
</script>
