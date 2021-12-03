function issuerRequest() {
  const apiURL = "https://05d3-2407-c800-4f13-105-3546-dbac-4661-2759.ngrok.io/issue";
  const secret = "secret"

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('manage VC');
  const VCcreated = sheet.getRange('J:J').getValues();
  const cellB = sheet.getRange('B:B').getValues();
  let result = [];

  for (let i = 1; i < VCcreated.length; i++) {
    if (VCcreated[i] == "" && cellB[i] != "") {
      let col = sheet.getRange(i + 1, 2, 1, 8).getValues().flat()
      if (col[8] =="Yes"){
        col[8]=true
      }else if (col[8]=="No"){
        col[8]=false
      }else{
        col[8]=undefined
      }
      result = [
        ...result,
        {
          "index": i + 1,
          "borrower": col[1],
          "age_over_16": col[2] == 'Yes' ? true : false,
          "loan_count": Number(col[3]),
          "identity_proofing": col[4],
          "address": col[5] == "" ? undefined : col[5],
          "loan_amount": Number(col[6]) =="" ? undefined : Number(col[6]),
          "times_received_loan": Number(col[7]) =="" ? undefined : Number(col[7]),
          "training_completed": col[8]
        }
      ];
    }
  }
  Logger.log(result)

  //post部分 
  for (var i = 0; i < result.length; i++) {
    let payload = {
      credentialSubject: {
        "address": result[i].address,
        "age_over_16": result[i].age_over_16,
        "borrower": result[i].borrower,
        "identity_proofing": result[i].identity_proofing,
        "loan_count": result[i].loan_count,
        "loan_amount": result[i].loan_amount,
        "times_received_loan": result[i].times_received_loan,
        "training_completed": result[i].training_completed,
      },
      displayElements:["borrower"],
      userId: "1",
    }

    const contentString = JSON.stringify(payload)
    const signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, contentString, secret);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization':  "HMAC_SHA_256 " + Utilities.base64Encode(signature)
    }

    //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
    const options = {
      'method': 'post',
      'payload': contentString,
      'headers': headers,
      muteHttpExceptions: true,
    };

    const responseDataPOST = UrlFetchApp.fetch(apiURL, options);
    Logger.log(responseDataPOST.getResponseCode())

    if (responseDataPOST.getResponseCode() == "200") {
      sheet.getRange(result[i].index, 10).setValue("〇")
      const nowDate =  Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
      sheet.getRange(result[i].index, 11).setValue(nowDate)
    }
  }
};

