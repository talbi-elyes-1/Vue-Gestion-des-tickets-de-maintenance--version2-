<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    getTicket,
    updateTicket,
    deleteTicket
} from '../services/ticketService';

const route = useRoute();
const router = useRouter();

const ticket = ref(null);
const erreur = ref('');
const isSaving = ref(false);
const isLoading = ref(true);

const chargerTicket = async () => {
    try {
        ticket.value = await getTicket(route.params.id);
    } catch (error) {
        erreur.value = 'Ticket introuvable ou erreur de connexion.';
    } finally {
        isLoading.value = false;
    }
};

const modifierTicket = async () => {
    erreur.value = '';
    isSaving.value = true;

    try {
        await updateTicket(route.params.id, ticket.value);
        router.push('/tickets');
    } catch (error) {
        erreur.value = 'Erreur lors de la modification du ticket.';
    } finally {
        isSaving.value = false;
    }
};

const supprimerTicket = async () => {
    const confirmation = window.confirm(
        'Voulez-vous vraiment supprimer ce ticket ?'
    );

    if (!confirmation) return;

    try {
        await deleteTicket(route.params.id);
        router.push('/tickets');
    } catch (error) {
        erreur.value = 'Erreur lors de la suppression du ticket.';
    }
};

onMounted(chargerTicket);
</script>

<template>
    <section>
        <h2>Détails du ticket</h2>

        <p v-if="isLoading">Chargement...</p>

        <div v-else-if="ticket">
            <form @submit.prevent="modifierTicket">
                <div>
                    <label>Titre</label>
                    <input v-model="ticket.titre" required>
                </div>

                <div>
                    <label>Description</label>
                    <textarea v-model="ticket.description" required></textarea>
                </div>

                <div>
                    <label>Demandeur</label>
                    <input v-model="ticket.demandeur" required>
                </div>

                <div>
                    <label>Priorité</label>
                    <select v-model="ticket.priorite">
                        <option>Basse</option>
                        <option>Moyenne</option>
                        <option>Haute</option>
                    </select>
                </div>

                <div>
                    <label>Statut</label>
                    <select v-model="ticket.statut">
                        <option>Ouvert</option>
                        <option>En cours</option>
                        <option>Résolu</option>
                        <option>Fermé</option>
                    </select>
                </div>

                <p>Date de création : {{ ticket.dateCreation }}</p>

                <button type="submit" :disabled="isSaving">
                    {{ isSaving ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                </button>

                <button type="button" @click="supprimerTicket">
                    Supprimer
                </button>
            </form>
        </div>

        <p v-if="erreur" style="color: red;">{{ erreur }}</p>

        <RouterLink to="/tickets">Retour à la liste</RouterLink>
    </section>
</template>