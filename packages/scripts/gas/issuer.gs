function issuerRequest() {
  let apiURL = "https://5e55-240d-1a-767-6100-390a-6482-be91-4224.ngrok.io/issue";

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Zambia_VC");
  var VCcreated = sheet.getRange("J:J").getValues();
  var cellB = sheet.getRange("B:B").getValues();
  var result = [];

  for (var i = 1; i < VCcreated.length; i++) {
    if (VCcreated[i] == "" && cellB[i] != "") {
      let col = sheet
        .getRange(i + 1, 2, 1, 8)
        .getValues()
        .flat();
      if (col[7] == "Yes") {
        col[7] = true;
      } else if (col[7] == "No") {
        col[7] = false;
      } else {
        col[7] = undefined;
      }
      result = [
        ...result,
        {
          index: i + 1,
          borrower: col[0],
          age_over_16: col[1] == "Yes" ? true : false,
          loan_count: Number(col[2]),
          identity_proofing: col[3],
          address: col[4] == "" ? undefined : col[4],
          loan_amount: Number(col[5]) == "" ? undefined : Number(col[5]),
          times_received_loan: Number(col[6]) == "" ? undefined : Number(col[6]),
          training_completed: col[7],
        },
      ];
    }
  }
  Logger.log(result);

  //post部分
  for (var i = 0; i < result.length; i++) {
    let payload = {
      credentialSubject: {
        borrower: result[i].borrower,
        age_over_16: result[i].age_over_16,
        loan_count: result[i].loan_count,
        identity_proofing: result[i].identity_proofing,
        address: result[i].address,
        loan_amount: result[i].loan_amount,
        times_received_loan: result[i].times_received_loan,
        training_completed: result[i].training_completed,
      },
    };
    var headers = {
      "Content-Type": "application/json",
    };

    //HTTP POSTで前述で設定したパラメーターをオプションで設定する。
    let options = {
      method: "post",
      payload: JSON.stringify(payload),
      headers: headers,
      muteHttpExceptions: true,
    };

    //APIにPOSTリクエストし、結果をログ出力する
    let responseDataPOST = UrlFetchApp.fetch(apiURL, options);
    console.log(responseDataPOST.getResponseCode());
    console.log(responseDataPOST.getContentText());

    if (responseDataPOST.getResponseCode() == "200") {
      sheet.getRange(result[i].index, 10).setValue("〇");

      //現在時刻を表示
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();

      //入力したい文字列に整形する
      var nowDate = year + "/" + month + "/" + date + "  " + hour + ":" + minute + ":" + second;
      sheet.getRange(result[i].index, 11).setValue(nowDate);
    }
  }
}
