var _lootInterval = setInterval(() => {
    var lootLimitCount
    lootLimitCount = 1
    if (game.combat.loot.drops.length >= lootLimitCount) {
        game.combat.loot.lootAll()
    }
}, 1000)