import { Router } from "express";
import { storage } from "../storage";
import { insertContactSchema, insertProjectSchema } from "@workspace/db";
import { ZodError } from "zod/v4";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, sendProjectEmail } from "../email";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const data = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(data);
    sendContactEmail(data).catch(console.error);
    res.json({ success: true, id: contact.id });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: fromZodError(error).message });
    } else {
      console.error("Contact submission error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  }
});

router.post("/project", async (req, res) => {
  try {
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(data);
    sendProjectEmail(data).catch(console.error);
    res.json({ success: true, id: project.id });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: fromZodError(error).message });
    } else {
      console.error("Project submission error:", error);
      res.status(500).json({ error: "Failed to submit project" });
    }
  }
});

export default router;
