export async function withConnection(req, res) {
  res.setHeader("Cache-Control", "no-cache, no-store, no-transform");
  // res.setHeader("Connection", "close");
}
