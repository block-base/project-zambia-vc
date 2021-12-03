function issuerRequest() {
  const apiURL = "https://18a6-2407-c800-4f13-105-3546-dbac-4661-2759.ngrok.io/issue";
  const secret = "secret"

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('manage VC');
  const maxRow = sheet.getLastRow();
  const maxColumn = sheet.getLastColumn();
  const isVcIssued = sheet.getRange('K:K').getValues();

  // 1行目の文字列をKeyにしたjsonの配列を作成
  const keys = [];
  const data = [];
  for (let x = 1; x <= maxColumn - 2; x++) {
    keys.push(sheet.getRange(1, x).getValue());
  }
  for (let y = 2; y <= maxRow; y++) {
    let json = {};
    for (let x = 1; x <= maxColumn -2 ; x++) {
      json[keys[x-1]] = sheet.getRange(y, x).getValue() || undefined;
    }    
    data.push(json);
  }

  for (let i = 0; i < data.length; i++) {
    if (isVcIssued[i + 1] == "〇") return
    console.log(data[i])
    const training_completed = data[i].training_completed =="Yes" ? true : data[i].training_completed =="No" ? false:  undefined;
    const payload = {
      credentialSubject: {
        "address": data[i].address,
        "age_over_16": data[i].age_over_16 == "Yes",
        "borrower": data[i].borrower,
        "identity_proofing": data[i].identity_proofing,
        "loan_count": data[i].loan_count,
        "loan_amount": data[i].loan_amount,
        "times_received_loan": data[i].times_received_loan,
        "training_completed": training_completed,
      },
      displayElements:["borrower"],
      userId: data[i].uid,
    }

    const contentString = JSON.stringify(payload)
    const signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, contentString, secret);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization':  "HMAC_SHA_256 " + Utilities.base64Encode(signature)
    }

    const options = {
      'method': 'post',
      'payload': contentString,
      'headers': headers,
      muteHttpExceptions: true,
    };
    const responseDataPOST = UrlFetchApp.fetch(apiURL, options);
    Logger.log(responseDataPOST.getResponseCode())

    if (responseDataPOST.getResponseCode() == "200") {
      sheet.getRange(i + 2, maxColumn - 1).setValue("〇")
      const nowDate =  Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
      sheet.getRange(i + 2, maxColumn).setValue(nowDate)
    }

  }

};

