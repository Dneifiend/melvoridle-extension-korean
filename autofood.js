class AutoFight {
    #autofoodInterval;
    #autoLootInterval;

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
        try { return player.food.currentSlot.quantity }
        catch (e) { throw e }
    }

    get currentHealth() {
        try { return player.hitpoints }
        catch (e) { throw e }

    }

    get currentFoodRestoreValue() {
        try { return getNumberMultiplierValue(player.food.currentSlot.item.healsFor) }
        catch (e) { throw e }
    }

    get maxHealth() {
        try { return player.stats.maxHitpoints }
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
            var eatCount = Math.floor((this.maxHealth - this.currentHealth) / this.currentFoodRestoreValue)
            if (eatCount === 0) return

            // 음식 갯수가 eatCount보자 모자르면 전투 중단
            if (this.foodcount == 0 || this.foodcount < eatCount) {
                this.off
                clearInterval(this.#autofoodInterval)

                game.combat.stopCombat()
                game.thieving.stop()

                alert("음식이 부족하여 전투/절도를 중단합니다.")
                return
            }

            player.eatFood(eatCount, false)

        }, 100);
    }
}

var af = new AutoFight()
af.on