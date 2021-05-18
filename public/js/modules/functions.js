export let launch = (Boss, Heros, boss, archer, mage, guerrier, tourNumber, personnages) => {
    personnages = initBossHero(Boss, Heros, boss, archer, mage, guerrier);
    fight(personnages, tourNumber);
}
// Boss,Heros,boss,archer,mage,guerrier
export var initBossHero = (Boss, Heros, boss, archer, mage, guerrier) => {

    /* -------------------------------------------------------------------------- */
    /*                             Initiation du boss                             */
    /* -------------------------------------------------------------------------- */
    let random = Math.round(Math.random() * 2);
    let health;
    let damage;
    switch (random) {
        case 0:
            alert(`Le boss Sauron à été choist par dieu transistor`);
            health = +prompt('Choisissez le nombre de point de vie que le boss aura')
            damage = +prompt('Choisissez le nombre de point de degat que le boss aura')
            boss = new Boss("Sauron", health, damage)
            break;
        case 1:
            alert(`Le boss Chronos à été choist par dieu transistor`);
            health = +prompt('Choisissez le nombre de point de vie que le boss aura')
            damage = +prompt('Choisissez le nombre de point de degat que le boss aura')
            boss = new Boss("Chronos", health, damage)
            break;
        case 2:
            alert(`Le boss Lilith à été choist par dieu transistor`);
            health = +prompt('Choisissez le nombre de point de vie que le boss aura')
            damage = +prompt('Choisissez le nombre de point de degat que le boss aura')
            boss = new Boss("Lilith", health, damage)
            break;
    }

    /* -------------------------------------------------------------------------- */
    /*                            Initiation des heros                            */
    /* -------------------------------------------------------------------------- */
    // nom
    // point de vie et attaque a distribuez
    let healthPoint = +prompt("Définissez un nombre de point de vie a distribuez entre vos 3 personnages");
    let attackDamagePoint = +prompt("Définissez un nombre de point d'attaque a distribuez entre vos 3 personnages");
    // archer
    let archerName = prompt('choisissez le nom de votre archer');
    let archerHealth = +prompt(`Définissez un nombre de point de vie a attribuez a votre personnages sachant qui vous reste ${healthPoint} point de vie a distribuez`)
    let archerattackDamage = +prompt(`Définissez un nombre de point d'attaque a attribuez a votre personnages sachant qui vous reste ${attackDamagePoint}`)
    let archerPosture = prompt("Choisissez votre posture pour votre archer entre normale attaque ou defence");
    if (archerPosture != "normale" || archerPosture != "attaque" || archerPosture != "defence") {
        archerPosture = "normale"
    }
    healthPoint -= archerHealth;
    attackDamagePoint -= archerattackDamage
    // guerrier
    let guerrierName = prompt('choisissez le nom de votre guerrier');
    let guerrierHealth = +prompt(`Définissez un nombre de point de vie a attribuez a votre personnages sachant qui vous reste ${healthPoint} point de vie a distribuez`)
    let guerrierattackDamage = +prompt(`Définissez un nombre de point d'attaque a attribuez a votre personnages sachant qui vous reste ${attackDamagePoint}`)
    let guerrierPosture = prompt("Choisissez votre posture pour votre guerrier entre normale attaque ou defence");
    if (guerrierPosture != "normale" || guerrierPosture != "attaque" || guerrierPosture != "defence") {
        guerrierPosture = "normale"
    }
    healthPoint -= guerrierHealth
    attackDamagePoint -= guerrierattackDamage
    // mage
    let mageName = prompt('choisissez le nom de votre mage');
    let mageHealth = +prompt(`Définissez un nombre de point de vie a attribuez a votre personnages sachant qui vous reste ${healthPoint} point de vie a distribuez`)
    let mageattackDamage = +prompt(`Définissez un nombre de point d'attaque a attribuez a votre personnages sachant qui vous reste ${attackDamagePoint}`);
    let magePosture = prompt("Choisissez votre posture pour votre mage entre normale attaque ou defence");
    if (magePosture != "normale" || magePosture != "attaque" || magePosture != "defence") {
        magePosture = "normale"
    }

    archer = new Heros("archer", archerName, archerHealth, archerattackDamage, archerPosture);
    guerrier = new Heros("guerrier", guerrierName, guerrierHealth, guerrierattackDamage, guerrierPosture);
    mage = new Heros("mage", mageName, mageHealth, mageattackDamage, magePosture);

    return [[archer, guerrier, mage], boss];
    //mettre personnages
}
export var fight = (personnages, tourNumber) => {
    let boss = personnages[1];
    let heros = personnages[0];
    let finish = false
    while (finish != true) {
        for (let j = 0; j < heros.length; j++) {
            console.log(`scan de la vie de ${heros[j].classe}`);
            if (heros[j].currentHealth <= 0) {
                console.log(`Notre ${heros[j].classe} est mort`);
                heros.splice(heros.indexOf(heros[j]), 1);
            }
        }
        for (let i = 0; i < heros.length; i++) {
            heros[i].classe == "guerrier" ? heros[i].attack(boss, tourNumber) : heros[i].attack(boss)
            if (boss.currentHealth <= boss.health / 5) {
                boss.enigme(heros);
                break;
            };
            if (boss.currentHealth <= 0 || (archer.currentHealth <= 0 && mage.currentHealth <= 0 && guerrier.currentHealth <= 0)) {
                finish = true;
                break;
            }
        }
        boss.attack(heros);
        if (boss.currentHealth <= 0 || (archer.currentHealth <= 0 && mage.currentHealth <= 0 && guerrier.currentHealth <= 0)) {
            finish = true;
        }
        tourNumber++
    }
    boss.currentHealth <= 0 ? alert("le joueur a gagner") : alert('le boss a gagner');
}