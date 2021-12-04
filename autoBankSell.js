function sellBankTapAll(tabIdx, silence = false) {
    // 자동 인벤토리 판매
    if (!sellItemMode) {
        toggleSellItemMode()
    }
    updateSellItemMode()
    bank.filter(e => e.tab === tabIdx).forEach(itemObj => {
        selectBankItem(itemObj.id)
        // addItemToItemSaleArray(itemObj)
    })

    confirmSellModeSelection(silence)
}