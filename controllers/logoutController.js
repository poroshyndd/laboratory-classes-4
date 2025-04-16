const { getProcessLog } = require("../utils/logger");

const getLogoutView = (req, res) => {
  res.render("logout"); 
};

const killAplication = (req, res) => {
  getProcessLog("Application shutdown initiated via killAplication");
  
  res.send("Aplikacja zostanie zamknięta.");
  
  process.exit(0); 
};

module.exports = { getLogoutView, killAplication };
