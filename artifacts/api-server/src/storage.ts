import {
  type Contact,
  type InsertContact,
  type Project,
  type InsertProject,
  contactSubmissions,
  projectSubmissions,
} from "@workspace/db";
import { db } from "@workspace/db";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  createProject(project: InsertProject): Promise<Project>;
}

export class DatabaseStorage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contactSubmissions).values(contact).returning();
    return result;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [result] = await db.insert(projectSubmissions).values(project).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
