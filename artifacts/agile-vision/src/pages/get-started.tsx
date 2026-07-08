import { useState } from "react";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/use-page-title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  BarChart3,
  Gamepad2,
  Cog,
  MessageSquare,
  CheckCircle2,
  Send,
  Sparkles,
  BrainCircuit,
  ShoppingCart,
  GraduationCap,
  ArrowDown,
} from "lucide-react";
import { ProductPlayground } from "@/components/interactive-demos";

const projectTypes = [
  { id: "mobile", label: "Mobile App", description: "iOS & Android with AI", icon: Smartphone },
  { id: "webapp", label: "Web Application", description: "SaaS, dashboards & portals", icon: Globe },
  { id: "chatbot", label: "AI Chatbot", description: "Conversational AI assistants", icon: MessageSquare },
  { id: "automation", label: "Automation", description: "Intelligent workflow agents", icon: Cog },
  { id: "dataapp", label: "Data & Analytics", description: "ML pipelines & insights", icon: BarChart3 },
  { id: "agentic", label: "Agentic AI", description: "Autonomous AI systems", icon: BrainCircuit },
  { id: "ecommerce", label: "E-Commerce", description: "AI-powered storefronts", icon: ShoppingCart },
  { id: "game", label: "Games", description: "Interactive AI-driven games", icon: Gamepad2 },
  { id: "edtech", label: "EdTech", description: "AI learning platforms", icon: GraduationCap },
];

const budgetRanges = [
  { value: "5k-15k", label: "$5K - $15K" },
  { value: "15k-50k", label: "$15K - $50K" },
  { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k+", label: "$100K+" },
];

const timelines = [
  { value: "1-2months", label: "1-2 Months" },
  { value: "3-4months", label: "3-4 Months" },
  { value: "5-6months", label: "5-6 Months" },
  { value: "6months+", label: "6+ Months" },
];

const projectFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(10, "Please describe your project (min 10 characters)"),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function GetStarted() {
  usePageTitle("Get Started");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
    },
  });

  const selectedType = form.watch("projectType");

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      const res = await apiRequest("POST", "/api/project", { ...data, features: [] });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Project submitted!",
        description: "We'll review your project scope and get back to you soon.",
      });
      setSubmitted(true);
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-[100svh] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2" data-testid="text-project-success">
              Project Submitted!
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Thank you! We've received your project details and will be in
              touch within 24 hours with a detailed proposal.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                  mutation.reset();
                }}
                data-testid="button-restart-project"
              >
                Start New Project
              </Button>
              <Link href="/">
                <Button data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] pt-24 pb-16">
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24" data-testid="section-playground">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(250 85% 60% / 0.5), transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Product Playground
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Try Before You Build
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Interact with live demos of the products we create. Type, click, and explore -- these are working prototypes of what we build.
          </p>
          <p className="text-primary font-medium mt-3 text-base" data-testid="text-live-prototype">
            This is a live prototype. Try it here...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 rounded-2xl opacity-30 blur-md pointer-events-none" style={{ background: "linear-gradient(135deg, hsl(250 85% 60% / 0.3), hsl(280 80% 60% / 0.2), hsl(200 80% 50% / 0.15))" }} />
          <ProductPlayground />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <p className="text-sm text-muted-foreground mb-3">Ready to bring your idea to life?</p>
          <Button
            size="lg"
            onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-scroll-to-form"
          >
            Start Your Project
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </section>

      <div className="relative">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, transparent 0%, hsl(250 85% 60% / 0.03) 30%, hsl(250 85% 60% / 0.05) 50%, hsl(250 85% 60% / 0.03) 70%, transparent 100%)" }} />

        <section id="inquiry-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-testid="section-inquiry-form">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              <Send className="w-3 h-3 mr-1" />
              Project Inquiry
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Tell Us About Your Vision
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select what you'd like to build and share your requirements. We'll craft a tailored proposal within 24 hours.
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-1 text-center">What are you building?</h3>
                <p className="text-sm text-muted-foreground mb-5 text-center">
                  Select the type of product that best fits your vision
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`p-3 sm:p-4 cursor-pointer transition-all hover-elevate ${
                        selectedType === type.id
                          ? "ring-2 ring-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => form.setValue("projectType", type.id, { shouldValidate: true })}
                      data-testid={`card-type-${type.id}`}
                    >
                      <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center shrink-0 ${
                            selectedType === type.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10"
                          }`}
                        >
                          <type.icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              selectedType === type.id ? "" : "text-primary"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-xs sm:text-sm">{type.label}</h3>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                {form.formState.errors.projectType && (
                  <p className="text-sm text-destructive mt-2 text-center">
                    {form.formState.errors.projectType.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Your Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" {...field} data-testid="input-project-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} data-testid="input-project-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} data-testid="input-project-company" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Project Scope</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-budget">
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetRanges.map((b) => (
                                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-timeline">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timelines.map((t) => (
                                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project goals, target audience, and any specific requirements..."
                              className="min-h-[120px] resize-none"
                              {...field}
                              data-testid="input-project-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={mutation.isPending}
                    data-testid="button-submit-project"
                  >
                    {mutation.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Your Project
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
}
