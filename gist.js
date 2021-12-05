class AutoFight {
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


            // 현재 선택한 음식 갯수가 0이면 다른 슬롯에서 음식을 찾아서 선택한다.
            if (this.foodcount === 0) {
                for (let i = 0; i < player.food.slots.length; i++) {
                    if (player.food.slots[i].quantity > 0) {
                        return player.selectFood(i);
                    }
                }
            }

            // 음식 갯수가 eatCount보다 부족하면 전투를 중지한다.
            if (this.foodcount == 0 || this.foodcount < eatCount) {
                this.off
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




// 아이템 획득 노티피케이션
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





// TODO 잡템 필터해서 팔거나 옮기거나 하는 기능 추가
// bank.filter(itemInfo => items[itemInfo.id].type === "Junk").map(e => getItemName(e.id))


// 자동 전투인벤토리 비우기
var _lootInterval = setInterval(() => {
    var lootLimitCount
    lootLimitCount = 1
    if (game.combat.loot.drops.length >= lootLimitCount) {
        game.combat.loot.lootAll()
    }
}, 1000)

