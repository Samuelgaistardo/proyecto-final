function checkCashRegister(price, cash, cid) {
    // Valores de las denominaciones de monedas y billetes disponibles
    var denominations = [
      { name: "PENNY", value: 0.01 },
      { name: "NICKEL", value: 0.05 },
      { name: "DIME", value: 0.1 },
      { name: "QUARTER", value: 0.25 },
      { name: "ONE", value: 1 },
      { name: "FIVE", value: 5 },
      { name: "TEN", value: 10 },
      { name: "TWENTY", value: 20 },
      { name: "ONE HUNDRED", value: 100 }
    ];
  
    var changeDue = cash - price;
  
    // Calcular el total en la caja registradora
    var totalCID = 0;
    for (var i = 0; i < cid.length; i++) {
      totalCID += cid[i][1];
    }
  
    // Verificar si hay suficiente dinero en efectivo en la caja registradora
    if (totalCID < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    // Verificar si el cambio es exacto
    if (totalCID === changeDue) {
      return { status: "CLOSED", change: cid };
    }
  
    // Calcular el cambio a devolver
    var change = [];
    for (var j = cid.length - 1; j >= 0; j--) {
      var denominationName = cid[j][0];
      var denominationValue = denominations[j].value;
      var denominationAmount = cid[j][1];
      var amountToReturn = 0;
  
      while (changeDue >= denominationValue && denominationAmount > 0) {
        changeDue -= denominationValue;
        changeDue = Math.round(changeDue * 100) / 100;
        cid[j][1] -= denominationValue;
        amountToReturn += denominationValue;
        denominationAmount -= denominationValue;
      }
  
      if (amountToReturn > 0) {
        change.push([denominationName, amountToReturn]);
      }
    }
  
    // Verificar si no se puede devolver el cambio exacto
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    return { status: "OPEN", change: change };
  }