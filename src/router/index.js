import { createRouter, createWebHistory } from 'vue-router';

import TicketListView from '../views/TicketListView.vue';
import TicketFormView from '../views/TicketFormView.vue';
import TicketDetailView from '../views/TicketDetailView.vue';

const routes = [
    {
        path: '/',
        redirect: '/tickets'
    },
    {
        path: '/tickets',
        component: TicketListView
    },
    {
        path: '/tickets/nouveau',
        component: TicketFormView
    },
    {
        path: '/tickets/:id',
        component: TicketDetailView,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;