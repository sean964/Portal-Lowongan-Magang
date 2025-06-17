import fs from 'fs'
export default function handler(req, res) {
  const filePath = `${process.cwd()}/public/mahasiswa.xlsx`;

  res.setHeader('Content-Disposition', 'attachment; filename=mahasiswa.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}
