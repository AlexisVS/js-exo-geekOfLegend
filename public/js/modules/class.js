
// ! Il faut absolument appeler le boss: boss et les 3 personnages: guerrier archer et mage

export class Boss {
    constructor(name, health, attackDamage) {
        this.name = name,
            this.health = health,
            this.currentHealth = this.health,
            this.attackDamage = attackDamage
    }
    enigme = (personnages) => {
        let random = Math.round(Math.random() * 2);
        let date = new Date();
        let currentTime = `${date.getHours()}h${date.getMinutes()}`
        let enigma;
        let increment = 0
        switch (random) {
            case 0:
                do {
                    enigma = prompt('Quelle (heure)h(minute) est il ?').toLowerCase().replace(/\s/g, '');
                    increment++
                } while (increment != 3 && enigma != currentTime)

                if (enigma == currentTime) {
                    this.health = 0;
                } else {
                    // mes personnages tombe a 0 PDV
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                }
                break;
            case 1:
                do {
                    enigma = +prompt("Quelle est l'indice 'i' de cette question ?");
                    increment++
                } while (increment != 3 && enigma != 1);
                if (enigma == 1) {
                    this.health = 0
                } else {
                    // mes personnages tombe a 0 PDV
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                }
            case 2:
                do {
                    enigma = prompt("Je suis d'eau,je suis d'air,et je suis d'électricité. Qui suis-je ?").replace(/\s/g, '');
                    increment++
                } while (increment != 3 && enigma.match(/homme/g) == false);
                if (enigma.match(/homme/g) == true) {
                    return this.health = 0
                } else {
                    // mes personnages tombe a 0 PDV
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                    personnages[0].currentHealth = 0;
                }
        }
        return finish = true
    }
    attack = (personnages) => {
        let random;
        random = Math.round(Math.random() * personnages.length -1);
        let joueur;
        joueur = personnages[random];
        joueur.currentHealth -= this.attackDamage;
        return alert(`Le joueur ${joueur.name} a perdu ${this.attackDamage} points de vie \n
        Point de vie de ${joueur.name} : ${joueur.currentHealth}/${joueur.health}`)
    }
}

export class Heros {
    constructor(classe, name, health, attackDamage, posture) {
        this.classe = classe,
            this.name = name,
            this.health = health,
            this.currentHealth = this.health,
            this.attackDamage = attackDamage,
            this.posture = posture

        /* ----------------------------- stats de classe ---------------------------- */
        // gerrier
        if (this.classe == "guerrier") {
            this.rage = 0
        }
        // mage
        if (this.classe == "mage") {
            let random = Math.round(Math.random() * 2);
            let mana = [7, 9, 11];
            this.mana = mana[random];
            this.currentMana = mana;
        }
        // archer
        if (this.classe == "archer") {
            let random = Math.round(Math.random() * 4);
            let arrows = [7, 8, 9, 10, 11];
            this.nbrArrows = arrows[random];
            this.currentNbrArrows = this.nbrArrows;
        }
        /* ---------------- Sort de récupération pour mage et archer ---------------- */
        if (this.classe == "mage" || this.classe == "archer") {
            this.recuperation = () => {
                this.classe == "mage" ? this.currentMana += 7 : this.currentNbrArrows += 6;
            }
        }

        /* ------------------------- Posture Défence et attaque -- VIE ------------------------- */
        switch (this.posture) {
            case "attaque":
                this.health = this.health - (this.health / 4);
                this.currentHealth = this.health;
                break;
            case "defence":
                this.health = this.health * 2.5;
                this.currentHealth = this.health;
                break;
        }
    }

    /* --------------------------------- attaque -------------------------------- */

    attack = (boss, tourNumber) => {
        let attack = this.attackDamage;
        // Attaque conversion pour posture
        if (this.posture == "defence") {
            attack = attack / 2;
        }
        if (this.posture == "attaque") {
            attack = attack * 1.4;
        }
        // v    ********* */
        // Guerrier
        if (this.classe == "guerrier") {
            if (tourNumber % 4 == 0) {
                boss.currentHealth -= attack * 1.25;
                console.log(`Le boss s'est prit ${attack * 1.25} de dégats`)
                return alert(`Le boss s'est prit ${attack * 1.25} de dégats`)
            } else {
                boss.currentHealth -= attack;
                console.log(`Le boss s'est prit ${attack} de dégats`)
                return alert(`Le boss s'est prit ${attack} de dégats`)
            }
        }
        // Mage
        if (this.classe == "mage" && this.currentMana >= 2) {
            this.currentMana -= 2;
            boss.currentHealth -= attack;
            console.log(`Le boss s'est prit ${attack} de dégats`)
            return alert(`Le boss s'est prit ${attack} de dégats`)
        } else {
            console.log(`${this.classe} utilise le sort de récuperation`);
            this.recuperation();
        }
        // Archer
        if (this.classe == "archer" && this.currentNbrArrows >= 2) {
            this.currentNbrArrows -= 2;
            boss.currentHealth -= attack;
            console.log(`Le boss s'est prit ${attack} de dégats`)
            return alert(`Le boss s'est prit ${attack} de dégats`)
        } else {
            console.log(`${this.classe} utilise le sort de récuperation`);
            this.recuperation()
        }
    }
}
