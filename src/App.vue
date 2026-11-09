<template>
  <div class="app">
    <header>
      <h1>Gestion des tickets de maintenance</h1>

      <nav>
        <RouterLink to="/tickets">Liste des tickets</RouterLink>
        |
        <RouterLink to="/tickets/nouveau">Nouveau ticket</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>