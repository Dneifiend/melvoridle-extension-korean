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
bank.filter(itemInfo => items[itemInfo.id].type === "Junk").map(e => getItemName(e.id))