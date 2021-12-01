class AutoFood {
    #autofoodInterval;
    constructor() {
        this.stat = "off"
    }

    get status() {
        return {
            "foodcount": this.foodcount,
            "currentHealth": this.currentHealth,
            "currentFoodRestoreValue": this.currentFoodRestoreValue,
            "maxHealth": this.maxHealth
        }
    }

    get foodcount() {
        try { return parseInt(document.querySelector('#combat-food-container').textContent.match(/(?<=\()\d+(?=\))/)[0]) }
        catch (e) { throw e }
    }

    get currentHealth() {
        try { return parseInt(document.querySelector('#combat-player-hitpoints-current-1').textContent) }
        catch (e) { throw e }

    }

    get currentFoodRestoreValue() {
        try { return parseInt(document.querySelector('#combat-food-container').textContent.match(/\+\d+/)[0]) }
        catch (e) { throw e }
    }

    get maxHealth() {
        try { return parseInt(document.querySelector('#combat-player-hitpoints-max').textContent) }
        catch (e) { throw e }
    }


    get on() {
        if (this.stat === "off") {
            this.stat = "on"
            this.autoFood()
            return "auto food is on"
        }
    }
    get off() {
        this.stat = "off"
        clearInterval(this.#autofoodInterval)
        return "auto food is off"
    }


    autoFood() {
        this.#autofoodInterval = setInterval(() => {
            if (this.foodcount == 0) {
                clearInterval(_autofood)
                game.combat.runButton.click()
                console.log("food count is 0. auto food is off and escape from combat.")
                return
            }

            if (this.foodcount > 0) {
                if (this.currentHealth < this.maxHealth) {
                    if (this.currentHealth + this.currentFoodRestoreValue <= this.maxHealth) {
                        document.querySelector('#combat-food-container button').click()
                    }
                }
            }

        }, 100);
    }

    // TODO 
    // game.combat.runButton.click()


}




var af = new AutoFood()
af.on