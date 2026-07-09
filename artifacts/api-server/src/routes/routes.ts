import { Router } from "express";
import rateLimit from "express-rate-limit";
import { storage } from "../storage";
import { insertContactSchema, insertProjectSchema } from "@workspace/db";
import { ZodError } from "zod/v4";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, sendProjectEmail } from "../email";

const router = Router();

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions, please try again later." },
});

router.post("/contact", submissionLimiter, async (req, res) => {
  try {
    const data = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(data);
    sendContactEmail(data).catch((err) =>
      req.log.error({ err, contactId: contact.id }, "Failed to send contact notification email"),
    );
    res.json({ success: true, id: contact.id });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: fromZodError(error).message });
    } else {
      req.log.error({ err: error }, "Contact submission error");
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  }
});

router.post("/project", submissionLimiter, async (req, res) => {
  try {
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(data);
    sendProjectEmail({ ...data, features: data.features ?? [] }).catch((err) =>
      req.log.error({ err, projectId: project.id }, "Failed to send project notification email"),
    );
    res.json({ success: true, id: project.id });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: fromZodError(error).message });
    } else {
      req.log.error({ err: error }, "Project submission error");
      res.status(500).json({ error: "Failed to submit project" });
    }
  }
});

export default router;
