const { google } = require("googleapis");
const fs = require("fs");

const key = require("./service-account.json"); // این فایل رو باید بعداً اضافه کنیم

const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

const indexing = google.indexing({
  version: "v3",
  auth,
});

const publishUrl = async (url) => {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });
    console.log("✅ Indexed:", response.data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

// آدرس صفحه‌ای که میخوای ایندکس بشه رو اینجا وارد کن
publishUrl("https://titrsanat.ir/your-post-url");
