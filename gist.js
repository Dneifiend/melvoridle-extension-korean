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




// 자동 루팅
var _lootInterval = setInterval(() => {
    var lootLimitCount
    lootLimitCount = 1
    if (game.combat.loot.drops.length >= lootLimitCount) {
        game.combat.loot.lootAll()
    }
}, 1000)




// 아이템 획득 토스트 확장
function processItemNotify(itemID, qty) {
    let access = "";
    let bankCount = Object.values(bank).find(e => e.id === itemID).qty

    if (enableAccessibility)
        access = items[itemID].name;
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + getItemMedia(itemID) + '" alt="' + items[itemID].name + '"><span class="badge badge-success">' + items[itemID].name + ' +' + qty + " (" + bankCount.toLocaleString() + ")</span></div>",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}