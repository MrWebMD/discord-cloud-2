const axios = require('axios');
const AdmZip = require("adm-zip");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const getDownloadLink = async (req, res) => {
  console.log("Download link requested", req.body);

  const files = req.body;

  var zip = new AdmZip();
  
  let PromiseArray = files.map(file => {
    return axios({
        url: file.url,
        method: 'GET',
        responseType: 'arraybuffer',
    })
  })

  let data = await Promise.all(PromiseArray);

  data.map((response, index) => {
    console.log(response.data);
    zip.addFile(`${Date.now()}_${files[index].name}`, response.data);
  })

  const fileName = `dc-download-${uuidv4()}.zip`;

  const link = `http://localhost:${process.env.PORT}/downloads/${fileName}`;

  zip.writeZip(`./public/downloads/${fileName}`);


  res.json({ link, name:fileName });
};

module.exports = getDownloadLink;
