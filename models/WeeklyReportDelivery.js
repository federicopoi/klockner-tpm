const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyReportDeliverySchema = new Schema(
  {
    reportKey: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: "sending" },
    recipients: [{ type: String }],
    providerMessageId: { type: String },
    sentAt: { type: Date },
  },
  { collection: "weeklyReportDeliveries", timestamps: true }
);

module.exports = mongoose.model("weeklyReportDelivery", WeeklyReportDeliverySchema);
