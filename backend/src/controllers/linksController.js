import prisma from "../db.js";

export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;

    if (!url) return res.status(400).json({ error: "URL required" });

    const exists = await prisma.link.findUnique({ where: { code } });
    if (exists) return res.status(409).json({ error: "Short code already exists" });

    const link = await prisma.link.create({
      data: { url, code }
    });

    return res.json(link);
  } catch (e) {
    return res.status(500).json({ error: "Server failed" });
  }
};

export const listLinks = async (req, res) => {
  const links = await prisma.link.findMany({ orderBy: { createdAt: "desc" } });
  return res.json(links);
};

export const getStats = async (req, res) => {
  const { code } = req.params;
  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) return res.status(404).json({ error: "Not found" });

  return res.json(link);
};

export const deleteLink = async (req, res) => {
  const { code } = req.params;

  await prisma.link.delete({ where: { code } }).catch(() => {
    return res.status(404).json({ error: "Not found" });
  });

  return res.json({ success: true });
};

export const redirect = async (req, res) => {
  const { code } = req.params;

  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) return res.status(404).send("Not found");

  await prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 }, lastClicked: new Date() }
  });

  return res.redirect(302, link.url);
};
