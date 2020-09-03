exports.uploadImage = (req, res) => {
  if (req.files === null) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.avatar;
  console.log(req.files.avatar);

  //Make a random string for image name
  const makeid = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const name = makeid(20) + file.name;

  const dir = `${__dirname}/../uploads/${name}`;

  // Use the mv() method to place the file somewhere on your server
  file.mv(dir, (err) => {
    if (err) return res.status(501).send(err);

    res.json({
      uploaded: true,
      fileName: file.name,
      filePath: dir,
    });
  });
};
