class melvorIdleLanguage {
    constructor() {
        var targetKeys = ["AGILITY",
            "ASTROLOGY",
            "DUNGEON",
            "MONSTER_NAME",
            "EQUIPMENT_STAT",
            "EQUIP_SLOT",
            "FARMING_MISC",
            "FISHING",
            "GOLBIN_RAID",
            "ITEM_DESCRIPTION",
            "ITEM_NAME",
            "MAGIC",
            "ORE_NAME",
            "PAGE_NAME",
            "PAGE_NAME_MISC",
            "POTION_NAME",
            "PET_NAME",
            "SHOP_CAT",
            "SHOP_NAME",
            "SKILL_NAME",
            "THIEVING",
            "TREE_NAME"]

        var ko = fetch('https://melvoridle.com/lang/ko.json')
            .then(res => res.json())
        var en = fetch('https://melvoridle.com/lang/en.json')
            .then(res => res.json())

        Promise.all([ko, en]).then(res => {
            this.enKo = {}
            targetKeys.forEach((Category, idx) => {

                Object.keys(res[0][Category]).forEach(key => {
                    try { var enKey = res[1][Category][key].toUpperCase() || key }

                    catch { console.log(Category, key) }

                    this.enKo[enKey] = res[0][Category][key]
                })
            })
        })

    }

    enToKoEvent() {
        document.querySelectorAll('h1, span, p, dt, a, figcaption, font, th').forEach((ele, idx) => {
            if (ele.childElementCount === 0) {
                var kr = this.enKo[ele.textContent.trim().replace(/\s/g, " ").toUpperCase()]
                if (kr) {
                    ele.textContent = kr
                }
            }
        })
    }

    monitor(onoff) {
        if (onoff === "on") {
            var transOb = new MutationObserver(evts => {
                wikitrans.enToKoEvent()
            })
            transOb.observe(document.querySelector('body'), { subtree: true, childList: true })
            return "translator is on"
        }
        if (onoff === "off") {
            transOb.disconnect()
            return "translator is off"
        }


    }

}

var wikitrans = new melvorIdleLanguage()
wikitrans.monitor("on")