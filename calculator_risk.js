// Membuat Id unique untuk form yang baru dibuat
let formCount = 1


// Membuat form baru dengan "formCount"
function tambahRow() {
    // membuat elemen div untuk form baru (kedua & setelahnya)
    let newRow = document.createElement("div")
    newRow.classList.add("row", "gy-2", "gx-3", "align-items-center")

    // Mendapatkan elemen class="body-table" untuk di tambahkan ke baris/form baru
    let bodyTable = document.querySelector(".body-table")
    let formCount = bodyTable.childElementCount + 1

    // Memanggil fungsi tambahForm untuk membuat formulir baru dan menambahkannya ke baris/form baru
    tambahForm(newRow, "balance", formCount)
    tambahForm(newRow, "pair", formCount)
    tambahForm(newRow, "order", formCount)
    tambahForm(newRow, "openPrice", formCount)
    tambahForm(newRow, "stopLoss", formCount)
    tambahForm(newRow, "takeProfit", formCount)
    tambahForm(newRow, "risk", formCount)
    // Untuk tombol "x" menghapus form
    tambahHapusFormButton(newRow, formCount)

    bodyTable.appendChild(newRow)
}


function tambahForm(container, type, formCount) {
    // Membuat/memanggil elemen div class="col-auto" sebagai form di form baru
    let formCol = document.createElement("div")
    formCol.classList.add("col-auto")

    // Membuat atau memanggil elemen "label for"
    let label = document.createElement("label")
    label.textContent = type === "balance" ? "Balance:" : type === "pair" ? "Pair:" : type === "order" ? "Order:" : type === "openPrice" ? "Open Price:" : type === "stopLoss" ? "Stop Loss:" : type === "takeProfit" ? "Take Profit:" : "Risk:";
    label.setAttribute("for", type)
    

    // Membuat/memanggil elemen div class="input-group" sebagai form di form baru
    let formGroup
    if (type === "order") {
        formGroup = document.createElement("div")
        formGroup.classList.add("input-group")
    } else {
        formGroup = document.createElement("div")
        formGroup.classList.add("input-group", "lebar")
    }
    

    // Membuat/memanggil elemen div class="input-group-text" sebagai form di form baru
    let inputGroupText
    if (type === "balance") {
        inputGroupText = document.createElement("div")
        inputGroupText.classList.add("input-group-text")
        inputGroupText.textContent = "$"
    }
    

    // Membuat/memanggil elemen <input type=> sebagai form di form baru
    // Membuat/memanggil elemen <select class=> sebagai form di form baru
    let input
    let orderGroup
    if (type === "balance") {
        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("id", "balance-" + formCount)
        input.setAttribute("step", "1")
        input.setAttribute("required", "true")
        input.classList.add("form-control")
        input.setAttribute("placeholder", "100.000.000")
        input.setAttribute("aria-describedby", "addon-wrapping")
        input.setAttribute("oninput", "formatNumber(this)")
    } else if (type === "pair") {
        input = document.createElement("select")
        input.setAttribute("class", "form-select")

        if (formCount > 0) {
            input.setAttribute("id", "pairChoices-" + formCount)
        } else {
            input.setAttribute("id", "pairChoices")
        }
        

        input.setAttribute("aria-label", "Default select example")
        input.setAttribute("onchange", "gantiPlaceholders()")

        let pairOptions = ["Pilih Pair", "XAUUSD", "EURUSD", "GBPUSD", "NZDUSD", "USDJPY", "GBPJPY", "EURJPY"]
        for (let i = 0; i < pairOptions.length; i++ ) {
            let option = document.createElement("option")
            option.value = pairOptions[i]
            option.text = pairOptions[i]
            input.appendChild(option)
        }
    } else if (type === "order") {
        orderGroup = document.createElement("div")
        orderGroup.classList.add("input-group")

        // Untuk order "Buy"
        let buyOrder = document.createElement("input")
        buyOrder.setAttribute("type", "radio")
        buyOrder.classList.add("btn-check")
        buyOrder.setAttribute("name", `type-${formCount}`)
        buyOrder.setAttribute("id", `option5-${formCount}`)
        buyOrder.setAttribute("value", "Buy")
        buyOrder.setAttribute("autocomplete", "off")
        buyOrder.setAttribute("checked", "")

        // Label order "Buy"
        let buyLabel = document.createElement("label")
        buyLabel.classList.add("btn", "btn-outline-primary", "buy_sell")
        buyLabel.setAttribute("for", `option5-${formCount}`)
        buyLabel.textContent = "Buy"

        // untuk order "Sell"
        let sellOrder = document.createElement("input")
        sellOrder.setAttribute("type", "radio")
        sellOrder.classList.add("btn-check")
        sellOrder.setAttribute("name", `type-${formCount}`)
        sellOrder.setAttribute("id", `option6-${formCount}`)
        sellOrder.setAttribute("value", "Sell")
        sellOrder.setAttribute("autocomplete", "off")

        // Label order "Sell"
        let sellLabel = document.createElement("label")
        sellLabel.classList.add("btn", "btn-outline-danger", "buy_sell")
        sellLabel.setAttribute("for", `option6-${formCount}`)
        sellLabel.textContent = "Sell"

        orderGroup.appendChild(buyOrder)
        orderGroup.appendChild(buyLabel)
        orderGroup.appendChild(sellOrder)
        orderGroup.appendChild(sellLabel)

    } else if (type === "openPrice" || type === "stopLoss" || type === "takeProfit") {
        input = document.createElement("input")
        input.setAttribute("type", "text")

        input.setAttribute("id", `${type}-${formCount}`)
        
        input.setAttribute("step", "1")
        input.setAttribute("required", "true")
        input.classList.add("form-control")
        input.setAttribute("placeholder", `${type.charAt(0).toUpperCase()}${type.slice(1).replace(/([A-Z])/g, ' $1')}`)
    } else if (type === "risk") {
        inputGroup = document.createElement("div")
        inputGroup.classList.add("input-group")

        input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("id", "risk-" + formCount)
        input.setAttribute("required", "true")
        input.classList.add("form-control")
        input.setAttribute("placeholder", "2")
        input.setAttribute("oninput", "chooseNumber(this)")

        inputGroup.appendChild(input)

        inputGroupText = document.createElement("div")
        inputGroupText.classList.add("input-group-text")
        inputGroupText.textContent = "%"

        inputGroup.appendChild(inputGroupText)

        document.body.appendChild(inputGroup)

        formCount++;
    }
    
    if (inputGroupText) {
        formGroup.appendChild(input)
        formGroup.appendChild(inputGroupText)
    }

    if (input) {
        formGroup.appendChild(input)
    }

    formCol.appendChild(label)

    if (orderGroup) {
        formCol.appendChild(orderGroup)
    }
    

    formCol.appendChild(formGroup)

    // Menambahkan kolom form ke dalam baris
    container.appendChild(formCol)

    // Memberikan Id unik pada formulir
    formCol.id = `form-${formCount}`
}


// Membuat tombol "x" menghapus form yg memiliki "formCount"
function tambahHapusFormButton(container, formCount) {
    let deleteButton = document.createElement("button")
    deleteButton.type = "button"
    deleteButton.classList.add("btn", "btn-danger", "me-md-2", "tombol-x", "custom-x-btn")
    deleteButton.textContent = "x"
    deleteButton.dataset.formCount = formCount
    deleteButton.onclick = function () {
        hapusFormJS(this)
    }
    container.appendChild(deleteButton)
}


// Untuk tombol "x" dari HTML (untuk form tanpa "formCount")
function hapusForm(button) {
    let formDelete = button.closest('form')
    if (formDelete) {
        formDelete.remove()
    }
}

// Untuk tombol "x" dari Javascript (untuk form dengan "formCount")
function hapusFormJS(button) {
    let formsWithoutId = document.querySelectorAll('.row.gy-2.gx-3.align-items-center')
    let formDelete = formsWithoutId[formsWithoutId.length - 1]
    if (formDelete) {
        formDelete.remove()
    } else {
        console.error('Tidak ada form ditemukan untuk dihapus')
    }
}




// Buat function untuk gantiPlaceholders setiap pair dipilih
function gantiPlaceholders() {
    // Mendapatkan elemen select dengan Id pairChoices
    let pairSelect = document.getElementById("pairChoices")
    // Mendapatkan nilai/value pair yg dipilih
    let selectedPair = pairSelect.value
    
    // Mendapatkan elemen dengan Id openPrice
    let openPriceInput = document.getElementById("openPrice")
    let stopLossInput = document.getElementById("stopLoss")
    let takeProfitInput = document.getElementById("takeProfit")

    switch(selectedPair) {
        case 'XAUUSD':
            openPriceInput.setAttribute("placeholder", "1500.29")
            stopLossInput.setAttribute("placeholder", "1000.13")
            takeProfitInput.setAttribute("placeholder", "3012.48")
            break
        case 'EURUSD':
            openPriceInput.setAttribute("placeholder", "1.01211")
            stopLossInput.setAttribute("placeholder", "0.97436")
            takeProfitInput.setAttribute("placeholder", "1.05058")
            break
        case 'GBPUSD':
            openPriceInput.setAttribute("placeholder", "1.14831")
            stopLossInput.setAttribute("placeholder", "1.09668")
            takeProfitInput.setAttribute("placeholder", "1.20405")
            break
        case 'NZDUSD':
            openPriceInput.setAttribute("placeholder", "0.57458")
            stopLossInput.setAttribute("placeholder", "0.55598")
            takeProfitInput.setAttribute("placeholder", "0.63673")
            break
        case 'USDJPY':
            openPriceInput.setAttribute("placeholder", "111.100")
            stopLossInput.setAttribute("placeholder", "110.100")
            takeProfitInput.setAttribute("placeholder", "112.100")
            break
        case 'GBPJPY':
            openPriceInput.setAttribute("placeholder", "173.200")
            stopLossInput.setAttribute("placeholder", "172.200")
            takeProfitInput.setAttribute("placeholder", "174.200")
            break
        case 'EURJPY':
            openPriceInput.setAttribute("placeholder", "148.500")
            stopLossInput.setAttribute("placeholder", "147.200")
            takeProfitInput.setAttribute("placeholder", "149.700")
            break
    }

    for (let i = 1; i <= formCount; i++) {
        console.log('Iterasi ke-', i)
        // Mendapatkan elemen select dengan Id pairChoices
        let pairSelect = document.getElementById(`pairChoices-${i}`)
        // Mendapatkan nilai/value pair yg dipilih
        let pairChosen = pairSelect.value
        
        // Mendapatkan elemen dengan Id openPrice
        let openPriceInput = document.getElementById(`openPrice-${i}`)
        let stopLossInput = document.getElementById(`stopLoss-${i}`)
        let takeProfitInput = document.getElementById(`takeProfit-${i}`)

        switch(pairChosen) {
            case 'XAUUSD':
                openPriceInput.setAttribute("placeholder", "1500.29")
                stopLossInput.setAttribute("placeholder", "1000.13")
                takeProfitInput.setAttribute("placeholder", "3012.48")
                break
            case 'EURUSD':
                openPriceInput.setAttribute("placeholder", "1.01211")
                stopLossInput.setAttribute("placeholder", "0.97436")
                takeProfitInput.setAttribute("placeholder", "1.05058")
                break
            case 'GBPUSD':
                openPriceInput.setAttribute("placeholder", "1.14831")
                stopLossInput.setAttribute("placeholder", "1.09668")
                takeProfitInput.setAttribute("placeholder", "1.20405")
                break
            case 'NZDUSD':
                openPriceInput.setAttribute("placeholder", "0.57458")
                stopLossInput.setAttribute("placeholder", "0.55598")
                takeProfitInput.setAttribute("placeholder", "0.63673")
                break
            case 'USDJPY':
                openPriceInput.setAttribute("placeholder", "111.100")
                stopLossInput.setAttribute("placeholder", "110.100")
                takeProfitInput.setAttribute("placeholder", "112.100")
                break
            case 'GBPJPY':
                openPriceInput.setAttribute("placeholder", "173.200")
                stopLossInput.setAttribute("placeholder", "172.200")
                takeProfitInput.setAttribute("placeholder", "174.200")
                break
            case 'EURJPY':
                openPriceInput.setAttribute("placeholder", "148.500")
                stopLossInput.setAttribute("placeholder", "147.200")
                takeProfitInput.setAttribute("placeholder", "149.700")
                break
            default:
                openPriceInput.setAttribute("placeholder", "Open Price")
                stopLossInput.setAttribute("placeholder", "Stop Loss")
                takeProfitInput.setAttribute("placeholder", "Take Profit")
                break
        }
        console.log(`Pair yang dipilih ${i}:`, pairChosen)
    }
    formCount++
}



// //Fungsi untuk menghapus value di form yg baru ditambahkan
function clearFormFields(form) {
    const inputElements = form.querySelectorAll('input')
    inputElements.forEach((input) => {
        input.value = '';
    })
}


// Function untuk membuat type(BUY&SELL) dapat dipilih secara berbeda di setiap form
function updateFormAttributes(form) {
    formCounter++;

    form.querySelectorAll('[id]').forEach((element) => {
        element.id = element.id + formCounter
    })

    form.querySelectorAll('[for]').forEach((element) => {
        element.setAttribute('for', element.getAttribute('for') + formCounter)
    })

    const typeRadioButtons = form.querySelectorAll('input[name="type"]')
    typeRadioButtons.forEach((radio) => {
        radio.addEventListener('change', function() {
            updatePlaceholders()
        })
    })
    // Memastikan placeholders di reset setelah melakukan clone/tombol "add"
    updatePlaceholders()
}



// Fungsi untuk memformat angka, otomatis ada titik setelah 3 angka
function formatNumber(input) {
    // Menghapus karakter selain angka
    const cleanedValue = input.value.replace(/[^0-9]/g, '')

    // Format untuk titik setiap 3 angka digit
    const formattedValue = parseFloat(cleanedValue).toLocaleString('en-US')
    // Update otomatis nilai yg diinput dengan hasil format
    input.value = formattedValue
}

document.getElementById('balance').addEventListener('input', function() {
    formatNumber(this)
})



function calculateRiskReward() {
    let balance = parseFloat(document.getElementById("balance").value.replace(/[^0-9]/g, ''))
    let type = document.querySelector('input[name="type"]:checked').value
    let openPrice = parseFloat(document.getElementById("openPrice").value.replace(/[^0-9]/g, ''))
    let takeProfit = parseFloat(document.getElementById("takeProfit").value.replace(/[^0-9]/g, ''))
    let stopLoss = parseFloat(document.getElementById("stopLoss").value.replace(/[^0-9]/g, ''))
    let risk = parseFloat(document.getElementById("risk").value)

    // Menampilkan pair
    // Mendapatkan elemen select dengan Id pairChoices
    let pairSelect = document.getElementById("pairChoices")
    // Mendapatkan nilai/value pair yg dipilih
    let selectedPair = pairSelect.value
    
    // Mendapatkan elemen dengan Id openPrice
    let openPriceInput = document.getElementById("openPrice")
    let stopLossInput = document.getElementById("stopLoss")
    let takeProfitInput = document.getElementById("takeProfit")

    switch(selectedPair) {
        case 'XAUUSD':
            openPriceInput.setAttribute("placeholder", "1500.29")
            stopLossInput.setAttribute("placeholder", "1000.13")
            takeProfitInput.setAttribute("placeholder", "3012.48")
            break
        case 'EURUSD':
            openPriceInput.setAttribute("placeholder", "1.01211")
            stopLossInput.setAttribute("placeholder", "0.97436")
            takeProfitInput.setAttribute("placeholder", "1.05058")
            break
        case 'GBPUSD':
            openPriceInput.setAttribute("placeholder", "1.14831")
            stopLossInput.setAttribute("placeholder", "1.09668")
            takeProfitInput.setAttribute("placeholder", "1.20405")
            break
        case 'NZDUSD':
            openPriceInput.setAttribute("placeholder", "0.57458")
            stopLossInput.setAttribute("placeholder", "0.55598")
            takeProfitInput.setAttribute("placeholder", "0.63673")
            break
        case 'USDJPY':
            openPriceInput.setAttribute("placeholder", "111.100")
            stopLossInput.setAttribute("placeholder", "110.100")
            takeProfitInput.setAttribute("placeholder", "112.100")
            break
        case 'GBPJPY':
            openPriceInput.setAttribute("placeholder", "173.200")
            stopLossInput.setAttribute("placeholder", "172.200")
            takeProfitInput.setAttribute("placeholder", "174.200")
            break
        case 'EURJPY':
            openPriceInput.setAttribute("placeholder", "148.500")
            stopLossInput.setAttribute("placeholder", "147.200")
            takeProfitInput.setAttribute("placeholder", "149.700")
            break
        default:
            openPriceInput.setAttribute("placeholder", "Open Price")
            stopLossInput.setAttribute("placeholder", "Stop Loss")
            takeProfitInput.setAttribute("placeholder", "Take Profit")
            break
    }

    let slPips, tpPips, riskPerTrade

    if (type === "Buy") {
        slPips = Math.round((stopLoss - openPrice) * 10) / 100
        tpPips = Math.round((takeProfit - openPrice) * 10) / 100
    } else if (type === "Sell") {
        slPips = Math.round((openPrice - stopLoss) * 10) / 100
        tpPips = Math.round((openPrice - takeProfit) * 10) / 100
    }

    riskPerTrade = balance * (risk/100)


    const selectedPairSpan = document.getElementById('selectedPair')
    selectedPairSpan.textContent = selectedPair

    document.getElementById("slPips").textContent = slPips.toFixed()
    document.getElementById("tpPips").textContent = tpPips.toFixed()
    document.getElementById("riskPerTrade").textContent = '$' + riskPerTrade.toFixed()
    

    // Menghubungkan dengan elemen tabel hasil calculate di html
    let tableBody = document.querySelector('#resultTable tbody')


    for (let i = 1; i <= formCount; i++) {
        let balance = parseFloat(document.getElementById(`balance-${i}`).value.replace(/[^0-9]/g, ''))
        let type = document.querySelector(`input[name="type-${i}"]:checked`).value
        let openPrice = parseFloat(document.getElementById(`openPrice-${i}`).value.replace(/[^0-9]/g, ''))
        let takeProfit = parseFloat(document.getElementById(`takeProfit-${i}`).value.replace(/[^0-9]/g, ''))
        let stopLoss = parseFloat(document.getElementById(`stopLoss-${i}`).value.replace(/[^0-9]/g, ''))
        let risk = parseFloat(document.getElementById(`risk-${i}`).value)

        // Menampilkan pair di hasil kalkulasi(dengan SL, TP, dan Risk)
        // ----------------------------------------------------------
        
        // Mendapatkan elemen select dengan Id pairChoices
        let pairSelect = document.getElementById(`pairChoices-${i}`)
        // Mendapatkan nilai/value pair yg dipilih
        let pairChosen = pairSelect.value
        
        // Mendapatkan elemen dengan Id openPrice
        let openPriceInput = document.getElementById(`openPrice-${i}`)
        let stopLossInput = document.getElementById(`stopLoss-${i}`)
        let takeProfitInput = document.getElementById(`takeProfit-${i}`)

        switch(pairChosen) {
            case 'XAUUSD':
                openPriceInput.setAttribute("placeholder", "1500.29")
                stopLossInput.setAttribute("placeholder", "1000.13")
                takeProfitInput.setAttribute("placeholder", "3012.48")
                break
            case 'EURUSD':
                openPriceInput.setAttribute("placeholder", "1.01211")
                stopLossInput.setAttribute("placeholder", "0.97436")
                takeProfitInput.setAttribute("placeholder", "1.05058")
                break
            case 'GBPUSD':
                openPriceInput.setAttribute("placeholder", "1.14831")
                stopLossInput.setAttribute("placeholder", "1.09668")
                takeProfitInput.setAttribute("placeholder", "1.20405")
                break
            case 'NZDUSD':
                openPriceInput.setAttribute("placeholder", "0.57458")
                stopLossInput.setAttribute("placeholder", "0.55598")
                takeProfitInput.setAttribute("placeholder", "0.63673")
                break
            case 'USDJPY':
                openPriceInput.setAttribute("placeholder", "111.100")
                stopLossInput.setAttribute("placeholder", "110.100")
                takeProfitInput.setAttribute("placeholder", "112.100")
                break
            case 'GBPJPY':
                openPriceInput.setAttribute("placeholder", "173.200")
                stopLossInput.setAttribute("placeholder", "172.200")
                takeProfitInput.setAttribute("placeholder", "174.200")
                break
            case 'EURJPY':
                openPriceInput.setAttribute("placeholder", "148.500")
                stopLossInput.setAttribute("placeholder", "147.200")
                takeProfitInput.setAttribute("placeholder", "149.700")
                break
            default:
                openPriceInput.setAttribute("placeholder", "Open Price")
                stopLossInput.setAttribute("placeholder", "Stop Loss")
                takeProfitInput.setAttribute("placeholder", "Take Profit")
                break
        }

        // -----------------------------------------------------------------------

        // Menghitung 
        let slTotal, tpTotal, riskTotal

        if (type === "Buy") {
            slTotal = Math.round((stopLoss - openPrice) * 10) / 100
            tpTotal = Math.round((takeProfit - openPrice) * 10) / 100
        } else if (type === "Sell") {
            slTotal = Math.round((openPrice - stopLoss) * 10) / 100
            tpTotal = Math.round((openPrice - takeProfit) * 10) / 100
        }

        riskTotal = balance * (risk/100)

        // Membuat elemen-elemen untuk di setiap baris form yg memiliki "formCount" yang ditampilkan di website
        let pairChosenSpan = document.createElement('span')
        pairChosenSpan.id = `pairChosen-${i}`
        pairChosenSpan.textContent = pairChosen

        let slTotalSpan = document.createElement('span')
        slTotalSpan.id = `slTotal-${i}`
        slTotalSpan.textContent = slTotal

        let tpTotalSpan = document.createElement('span')
        tpTotalSpan.id = `tpTotal-${i}`
        tpTotalSpan.textContent = tpTotal

        let riskTotalSpan = document.createElement('span')
        riskTotalSpan.id = `riskTotal-${i}`
        riskTotalSpan.textContent = riskTotal

        // Menambahkan row baru untuk hasil data calculate
        let tr = document.createElement('tr')

        // Menambahkan elemen span baru untuk menunjukkan hasil calculate
        tr.appendChild(document.createElement('td')).appendChild(pairChosenSpan)
        tr.appendChild(document.createElement('td')).appendChild(slTotalSpan)
        tr.appendChild(document.createElement('td')).appendChild(tpTotalSpan)

        // Menambahkan elemen span baru untuk riskTotal menunjukkan hasil calculate
        let riskTotalId = document.createElement('td')
        let riskTotalSpanWithSymbol = document.createElement('span')
        riskTotalSpanWithSymbol.id = `riskTotal-${i}`
        riskTotalSpanWithSymbol.textContent = '$' + riskTotal
        riskTotalId.appendChild(riskTotalSpanWithSymbol)
        tr.appendChild(riskTotalId)
        
        // Menambahkan baris ke dalam tabel
        // tableBody.appendChild(tr)


        let elements = document.querySelectorAll('span')

        // Loop untuk menghapus elemen duplikat
        for (let i = 0; i < elements.length; i++) {
            let currentElement = elements[i]
            let currentElementId = currentElement.getAttribute('id')

            if (currentElementId !== null ) {
                let duplicateElements = document.querySelectorAll(`span[id="${currentElementId}"]`)

                if (duplicateElements.length > 1) {
                    for (let el = 1; el < duplicateElements.length; el++) {
                        let duplicateElement = duplicateElements[el]
                                                
                        // Menghapus tr yg memiliki id span yg samma
                        let targetTr = duplicateElement.closest('tr')
                        if (targetTr) {
                            targetTr.parentNode.removeChild(targetTr)
                        }
                    }
                }
            }
        }
    }    
    formCount++
}

