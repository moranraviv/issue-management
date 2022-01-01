const SUPPORTED_METHOD = [ "GET", "POST", "PUT", "PATCH", "DELETE" ]
const SUPPORTED_STATUS = [ "OPEN", "PENDING", "RESOLVED", "CLOSED" ]
const SUPPORTED_SEVERITY = [ "HIGH", "MEDIUM", "LOW" ]
const SUPPORTED_TYPE = [ 
    "Broken Object Level Authorization", 
    "Broken User Authentication", 
    "Excessive Data Exposure", 
    "Lack of Resources & Rate Limiting", 
    "Broken Function Level Authorization", 
    "Mass Assignment", 
    "OTHER" 
]


module.exports = {
    SUPPORTED_METHOD,
    SUPPORTED_STATUS,
    SUPPORTED_SEVERITY,
    SUPPORTED_TYPE
};