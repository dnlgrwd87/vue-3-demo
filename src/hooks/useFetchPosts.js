import { ref } from '@vue/composition-api';
import axios from 'axios';

export const useFetchPosts = () => {
    const posts = ref([]);
    const loading = ref(false);
    const error = ref('');

    const fetchPosts = async () => {
        try {
            loading.value = true;
            posts.value = [];
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            posts.value = res.data;
        } catch (err) {
            error.value = 'Error fetching posts!';
        }
        
        setTimeout(() => {
            loading.value = false;
        }, 1000);
    };

    return { posts, loading, error, fetchPosts };
};
