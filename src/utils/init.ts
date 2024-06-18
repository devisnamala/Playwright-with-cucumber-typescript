const fss= require("fs-extra");

try{
    fss.ensureDir("test-results");
    fss.emptyDir("test-results");
}
catch(error){
    console.log("Folder not created! "+error);
}
