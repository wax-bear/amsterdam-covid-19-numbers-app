const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const amsC19DayReportSchema = new Schema(
  {
    Date_of_report: Date,
    Date_of_publication: Date,
    Municipality_code: String,
    Municipality_name: String,
    Province: String,
    Security_region_code: String,
    Security_region_name: String,
    Municipal_health_service: String,
    ROAZ_region: String,
    Total_reported: Number,
    Hospital_admission: Number,
    Deceased: Number
  },
  {
    timestamps: true
  }
);

exports.Report = model("Report", amsC19DayReportSchema);
