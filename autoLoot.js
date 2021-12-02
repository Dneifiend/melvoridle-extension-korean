// 자동 전투인벤토리 비우기
var _lootInterval = setInterval(() => {
    var lootLimitCount
    lootLimitCount = 1
    if (game.combat.loot.drops.length >= lootLimitCount) {
        game.combat.loot.lootAll()
    }
}, 1000)