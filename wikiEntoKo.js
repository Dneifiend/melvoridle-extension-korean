class melvorIdleLanguage {
    constructor() {
        this.ko = fetch('https://melvoridle.com/lang/ko.json')
            .then(res => res.json())
        this.en = fetch('https://melvoridle.com/lang/en.json')
            .then(res => res.json())

        this.enko = {}

        Promise.all([this.ko, this.en]).then(res => {
            var targetKeys = Object.keys(res[0])
            this.ko = res[0]
            this.en = res[1]
            targetKeys.forEach((Category, idx) => {
                Object.keys(res[0][Category]).forEach(key => {
                    try {
                        var enKey = res[1][Category][key]
                        this.enko[enKey] = res[0][Category][key]
                    }
                    catch (err) {
                        console.log("error", Category, key, err)
                    }

                })
            })
        })

    }

    enToKoEvent() {
        document.querySelectorAll('h1, span, p, dt, a, figcaption, font, th').forEach((ele, idx) => {
            if (ele.childElementCount === 0) {
                var findEn = Object.keys(this.enko).find(en => en.toUpperCase() === ele.innerText.toUpperCase())?.[0]
                if (findEn) {
                    ele.innerText = this.enko[findEn]
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
// wikitrans.monitor("on")