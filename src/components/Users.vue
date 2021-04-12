<template>
    <div class="users">
        <h2>Users</h2>

        <b-table v-if="items" striped hover :items="items"></b-table>
    </div>
</template>
        
<script>
    import axios from 'axios';

    export default {
        name: `Users`,
        components: {
            
        },
        props: {
            
        },
        data() {
            return {
                items: null
            }
        },
        computed: {
            
        },
        created() {
            axios.get('/users')
                    .then((res) => {
                        this.items = res.data.map((item) => {
                            delete item.__v;
                            delete item._id;
                            return item
                        })}
                        )
                    .catch((e) => console.warn(e));
        },
        methods: {
            
        }
    }
</script>

<style>
    .table {
        display: block;
        overflow: auto;
    }
</style>