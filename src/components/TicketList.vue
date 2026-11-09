
<script setup>
import { ref, onMounted, computed } from 'vue';
import { getTickets } from '../services/ticketService';

const tickets = ref([]);
const loading = ref(true);
const error = ref('');

const recherche = ref('');
const filtreStatut = ref('');
const filtrePriorite = ref('');

const ticketsFiltres = computed(() => {
    return tickets.value.filter(ticket => {
        const titreCorrespond = ticket.titre
            .toLowerCase()
            .includes(recherche.value.toLowerCase());

        const statutCorrespond = filtreStatut.value === ''
            || ticket.statut === filtreStatut.value;

        const prioriteCorrespond = filtrePriorite.value === ''
            || ticket.priorite === filtrePriorite.value;

        return titreCorrespond && statutCorrespond && prioriteCorrespond;
    });
});

const chargerTickets = async () => {
    try {
        tickets.value = await getTickets();
    } catch (err) {
        error.value = 'Erreur lors du chargement des tickets. Vérifiez que le serveur JSON est démarré.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    chargerTickets();
});
</script>

<template>
    <div class="page">
        <header class="header">
            <div>
                <p class="subtitle">ESPACE ADMINISTRATION</p>
                <h1>Gestion des tickets</h1>
                <p class="description">
                    Suivez et consultez les demandes de maintenance.
                </p>
            </div>
            <div class="header-icon">🎫</div>
        </header>

        <main class="content">
            <section class="filters">
                <h2>Recherche et filtres</h2>

                <div class="filter-row">
                    <input
                        type="text"
                        v-model="recherche"
                        placeholder="Rechercher un ticket..."
                        aria-label="Rechercher par titre"
                    />

                    <select v-model="filtreStatut" aria-label="Filtrer par statut">
                        <option value="">Tous les statuts</option>
                        <option value="Ouvert">Ouvert</option>
                        <option value="En cours">En cours</option>
                        <option value="Résolu">Résolu</option>
                        <option value="Fermé">Fermé</option>
                    </select>

                    <select v-model="filtrePriorite" aria-label="Filtrer par priorité">
                        <option value="">Toutes les priorités</option>
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                    </select>
                </div>
            </section>

            <section class="results">
                <div class="results-header">
                    <h2>Liste des tickets</h2>
                    <span class="counter">
                        {{ ticketsFiltres.length }} ticket(s)
                    </span>
                </div>

                <p v-if="loading" class="message">
                    Chargement...
                </p>

                <p v-else-if="error" class="message error">
                    {{ error }}
                </p>

                <p v-else-if="ticketsFiltres.length === 0" class="message">
                    Aucun ticket trouvé.
                </p>

                <div v-else class="ticket-grid">
                    <RouterLink
                        v-for="ticket in ticketsFiltres"
                        :key="ticket.id"
                        :to="`/tickets/${ticket.id}`"
                        class="ticket-card"
                    >
                        <div class="card-top">
                            <span class="ticket-id">
                                Ticket #{{ ticket.id }}
                            </span>

                            <span :class="['badge', 'priorite-' + ticket.priorite.toLowerCase()]">
                                {{ ticket.priorite }}
                            </span>
                        </div>

                        <h3>{{ ticket.titre }}</h3>

                        <p class="requester">
                            Demandeur : {{ ticket.demandeur }}
                        </p>

                        <div class="card-bottom">
                            <span :class="['badge', 'statut-' + ticket.statut.toLowerCase().replace(' ', '-')]">
                                {{ ticket.statut }}
                            </span>

                            <span class="date">
                                {{ ticket.dateCreation }}
                            </span>
                        </div>
                    </RouterLink>
                </div>
            </section>
        </main>

        <footer>
            Application de gestion des tickets de maintenance
        </footer>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.page {
    min-height: 100vh;
    background: #f1f5f9;
    color: #0f172a;
    font-family: Arial, sans-serif;
}

.header {
    background: #172554;
    color: white;
    padding: 40px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.subtitle {
    color: #bfdbfe;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.header h1 {
    font-size: 32px;
    margin: 10px 0;
    color: white;
    font-weight: bold;
}

.description {
    color: #e2e8f0;
}

.header-icon {
    font-size: 55px;
}

.content {
    max-width: 1150px;
    margin: 35px auto;
    padding: 0 20px;
}

.filters, .results {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 25px;
    box-shadow: 0 3px 12px #0000000a;
}

.filters h2, .results h2 {
    font-size: 19px;
    margin-top: 0;
    color: #0f172a;
    font-weight: 700;
}

.filter-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

input, select {
    flex: 1;
    min-width: 180px;
    padding: 12px;
    border: 1px solid #94a3b8;
    border-radius: 7px;
    font-size: 14px;
    background: white;
    color: #0f172a;
}

input::placeholder {
    color: #475569;
    opacity: 1;
}

input:focus, select:focus {
    outline: 2px solid #2563eb;
    border-color: #2563eb;
}

.results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.counter {
    background: #dbeafe;
    color: #1e40af;
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
}

.ticket-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
}

.ticket-card {
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 20px;
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;
}

.ticket-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px #00000012;
}

.card-top, .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.ticket-id {
    color: #334155;
    font-size: 13px;
    font-weight: 600;
}

.ticket-card h3 {
    font-size: 17px;
    margin: 20px 0 10px;
    color: #0f172a;
    font-weight: bold;
}

.requester {
    color: #334155;
    font-size: 14px;
}

.badge {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid transparent;
}

.priorite-haute {
    background: #fee2e2;
    color: #991b1b;
    border-color: #fecaca;
}

.priorite-moyenne {
    background: #fef3c7;
    color: #92400e;
    border-color: #fde68a;
}

.priorite-basse {
    background: #dcfce7;
    color: #166534;
    border-color: #bbf7d0;
}

.statut-ouvert {
    background: #f3e8ff;
    color: #6b21a8;
    border-color: #d8b4fe;
}

.statut-en-cours {
    background: #dbeafe;
    color: #1e40af;
    border-color: #bfdbfe;
}

.statut-résolu {
    background: #dcfce7;
    color: #166534;
    border-color: #bbf7d0;
}

.statut-fermé {
    background: #e2e8f0;
    color: #334155;
    border-color: #cbd5e1;
}

.date {
    color: #334155;
    font-size: 12px;
}

.message {
    text-align: center;
    padding: 30px;
    color: #334155;
}

.error {
    color: #b91c1c;
}

footer {
    text-align: center;
    padding: 25px;
    color: #334155;
    font-size: 13px;
}

@media (max-width: 600px) {
    .header {
        padding: 30px 20px;
    }

    .header h1 {
        font-size: 24px;
    }

    .header-icon {
        font-size: 35px;
    }

    .results-header {
        align-items: flex-start;
        gap: 10px;
    }
}
</style>
 