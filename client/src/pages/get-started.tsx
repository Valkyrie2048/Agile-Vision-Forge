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
  Clock,
  DollarSign,
  Shield,
} from "lucide-react";
import { DemoPreview } from "@/components/demo-previews";

const projectTypes = [
  {
    id: "mobile",
    label: "Mobile App",
    description: "iOS & Android applications with AI features",
    icon: Smartphone,
  },
  {
    id: "webapp",
    label: "Web Application",
    description: "SaaS platforms, dashboards, and portals",
    icon: Globe,
  },
  {
    id: "dataapp",
    label: "Data & Analytics",
    description: "AI analytics, ML pipelines, and data tools",
    icon: BarChart3,
  },
  {
    id: "game",
    label: "3D Game",
    description: "Interactive games with AI-driven mechanics",
    icon: Gamepad2,
  },
  {
    id: "automation",
    label: "Automation",
    description: "Workflow automation with intelligent agents",
    icon: Cog,
  },
  {
    id: "chatbot",
    label: "AI Chatbot",
    description: "Conversational AI and virtual assistants",
    icon: MessageSquare,
  },
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
      <div className="min-h-screen pt-24 pb-16">
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
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Get Started
          </Badge>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Tell Us About Your Vision
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Share your project details and we'll craft a tailored proposal to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold mb-1">What are you building?</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the type of product that best fits your vision
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`p-4 cursor-pointer transition-all hover-elevate ${
                          selectedType === type.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => form.setValue("projectType", type.id, { shouldValidate: true })}
                        data-testid={`card-type-${type.id}`}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div
                            className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                              selectedType === type.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10"
                            }`}
                          >
                            <type.icon
                              className={`w-5 h-5 ${
                                selectedType === type.id ? "" : "text-primary"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{type.label}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {form.formState.errors.projectType && (
                    <p className="text-sm text-destructive mt-2">
                      {form.formState.errors.projectType.message}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Your Details</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Full name"
                                {...field}
                                data-testid="input-project-name"
                              />
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
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                data-testid="input-project-email"
                              />
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
                            <Input
                              placeholder="Your company name"
                              {...field}
                              data-testid="input-project-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Project Scope</h2>
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
                                  <SelectItem key={b.value} value={b.value}>
                                    {b.label}
                                  </SelectItem>
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
                                  <SelectItem key={t.value} value={t.value}>
                                    {t.label}
                                  </SelectItem>
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

                <Button
                  type="submit"
                  size="lg"
                  disabled={mutation.isPending}
                  className="w-full sm:w-auto"
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
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {selectedType && (
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Live Preview
                </h3>
                <DemoPreview projectType={selectedType} />
              </div>
            )}

            {!selectedType && (
              <Card className="p-6">
                <div className="text-center py-8">
                  <Sparkles className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a project type to see a live preview
                  </p>
                </div>
              </Card>
            )}

            <div className="space-y-3">
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Fast Turnaround</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      We respond within 24 hours with a detailed project proposal
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Transparent Pricing</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      No hidden fees. Clear milestones and deliverables upfront
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Quality Guaranteed</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Production-ready code with comprehensive testing and support
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
