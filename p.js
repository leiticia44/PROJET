function calculer() {
    let montantEmprunte = parseFloat(document.getElementById("montant").value);
    let tauxInteretAnnuel = parseFloat(document.getElementById("taux").value);
    let dureeAnnees = parseFloat(document.getElementById("duree").value);
    
    let tauxMensuel = tauxInteretAnnuel / 100 / 12;
    let nombreEcheances = dureeAnnees * 12;
    let echeance = (montantEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nombreEcheances));

    let resultat = '';

    for (let annee = 1; annee <= dureeAnnees; annee++) {
        resultat += `<details><summary>Année ${annee}</summary>`;
        resultat += `<table><thead><tr><th>Période</th><th>Capital amorti</th><th>Intérêts</th><th>Capital restant dû</th><th>Mensualité</th></tr></thead><tbody>`;

        let capitalRestant = montantEmprunte;

        for (let periode = 1; periode <= 12; periode++) {
            let interets = capitalRestant * tauxMensuel;
            let capitalAmorti = echeance - interets;
            capitalRestant -= capitalAmorti;

            resultat += `<tr><td>${periode}</td><td>${capitalAmorti.toFixed(2)}</td><td>${interets.toFixed(2)}</td><td>${capitalRestant.toFixed(2)}</td><td>${echeance.toFixed(2)}</td></tr>`;
        }

        resultat += '</tbody></table></details>';
    }

    document.getElementById("resultat").innerHTML = resultat;

    // Scroll to the opened year summary
    let details = document.querySelectorAll('details');
    details.forEach((detail) => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
