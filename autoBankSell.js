
// 자동 인벤토리 판매
var ignoreSellConfirm = false;
if (!sellItemMode) {
    toggleSellItemMode()
}
updateSellItemMode()
bank.filter(e => e.tab === 9).forEach(itemObj => {
    selectBankItem(itemObj.id)
    // addItemToItemSaleArray(itemObj)
})

confirmSellModeSelection(ignoreSellConfirm)