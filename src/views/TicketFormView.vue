<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createTicket } from '../services/ticketService';

const router = useRouter();

const titre = ref('');
const description = ref('');
const demandeur = ref('');
const priorite = ref('Moyenne');

const erreur = ref('');
const isSaving = ref(false);

const ajouterTicket = async () => {
    erreur.value = '';

    if (!titre.value.trim() || !description.value.trim() || !demandeur.value.trim()) {
        erreur.value = 'Veuillez remplir tous les champs obligatoires.';
        return;
    }

    isSaving.value = true;

    const today = new Date();
    const dateCreation = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0')
    ].join('-');

    const nouveauTicket = {
        titre: titre.value,
        description: description.value,
        demandeur: demandeur.value,
        priorite: priorite.value,
        statut: 'Ouvert',
        dateCreation
    };

    try {
        await createTicket(nouveauTicket);
        router.push('/tickets');
    } catch (error) {
        erreur.value = 'Erreur lors de la création du ticket.';
    } finally {
        isSaving.value = false;
    }
};
</script>

<template>
    <section>
        <h2>Nouveau ticket</h2>

        <form @submit.prevent="ajouterTicket">
            <div>
                <label for="titre">Titre *</label>
                <input id="titre" v-model="titre" type="text" required>
            </div>

            <div>
                <label for="description">Description *</label>
                <textarea id="description" v-model="description" required></textarea>
            </div>

            <div>
                <label for="demandeur">Demandeur *</label>
                <input id="demandeur" v-model="demandeur" type="text" required>
            </div>

            <div>
                <label for="priorite">Priorité</label>
                <select id="priorite" v-model="priorite">
                    <option value="Basse">Basse</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                </select>
            </div>

            <p v-if="erreur" style="color: red;">{{ erreur }}</p>

            <button type="submit" :disabled="isSaving">
                {{ isSaving ? 'Enregistrement...' : 'Créer le ticket' }}
            </button>
        </form>
    </section>
</template>