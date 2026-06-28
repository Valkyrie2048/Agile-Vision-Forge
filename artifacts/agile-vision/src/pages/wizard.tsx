import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Globe,
  BarChart3,
  Gamepad2,
  Cog,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Wand2,
  Send,
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

const featureOptions: Record<string, string[]> = {
  mobile: ["Push Notifications", "Offline Mode", "Biometric Auth", "In-App Payments", "Social Sharing", "AR Features", "AI Assistant"],
  webapp: ["User Dashboard", "Admin Panel", "Real-time Updates", "API Integrations", "File Management", "Team Collaboration", "AI Search"],
  dataapp: ["Data Pipelines", "ML Models", "Custom Dashboards", "Predictive Analytics", "Data Export", "Anomaly Detection", "Auto Reports"],
  game: ["Multiplayer", "Leaderboards", "In-App Purchases", "AI Opponents", "Physics Engine", "Level Editor", "Social Features"],
  automation: ["Email Automation", "CRM Integration", "Smart Routing", "Document Processing", "Scheduled Tasks", "AI Classification", "API Webhooks"],
  chatbot: ["Multi-language", "Voice Support", "CRM Integration", "Knowledge Base", "Sentiment Analysis", "Human Handoff", "Analytics Dashboard"],
};

const wizardSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  description: z.string().min(10, "Describe your project (min 10 chars)"),
  features: z.array(z.string()).default([]),
});

type WizardValues = z.infer<typeof wizardSchema>;

export default function Wizard() {
  usePageTitle("Project Wizard");
  const [step, setStep] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      features: [],
    },
  });

  const projectType = form.watch("projectType");
  const watchedName = form.watch("name");
  const watchedEmail = form.watch("email");
  const watchedBudget = form.watch("budget");
  const watchedTimeline = form.watch("timeline");
  const watchedDescription = form.watch("description");

  const mutation = useMutation({
    mutationFn: async (data: WizardValues) => {
      const res = await apiRequest("POST", "/api/project", { ...data, features: selectedFeatures });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Project submitted!",
        description: "We'll review your project scope and get back to you soon.",
      });
      setStep(4);
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const totalSteps = 4;

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!projectType;
      case 1:
        return selectedFeatures.length > 0 && !!watchedBudget && !!watchedTimeline;
      case 2:
        return true;
      case 3:
        return !!watchedName && !!watchedEmail && (watchedDescription || "").length >= 10;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      form.setValue("features", selectedFeatures);
      form.handleSubmit((data) => mutation.mutate(data))();
    }
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Wand2 className="w-3 h-3 mr-1" />
            Project Wizard
          </Badge>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            data-testid="text-wizard-title"
          >
            Scope Your Project
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Answer a few questions and see an interactive preview of what we'll build for you.
          </p>
        </motion.div>

        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-8" data-testid="wizard-progress">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    s < step
                      ? "bg-primary text-primary-foreground"
                      : s === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-4 h-4" /> : s + 1}
                </div>
                {s < 3 && (
                  <div className={`w-12 sm:w-20 h-0.5 ${s < step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-1">What are you building?</h2>
                    <p className="text-sm text-muted-foreground">Select the type of product that best fits your vision</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
                    {projectTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`p-5 cursor-pointer transition-all hover-elevate ${
                          projectType === type.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : ""
                        }`}
                        onClick={() => form.setValue("projectType", type.id)}
                        data-testid={`card-type-${type.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${
                            projectType === type.id ? "bg-primary text-primary-foreground" : "bg-primary/10"
                          }`}>
                            <type.icon className={`w-5 h-5 ${projectType === type.id ? "" : "text-primary"}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{type.label}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{type.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-1">Define Your Scope</h2>
                    <p className="text-sm text-muted-foreground">Select features, budget, and timeline</p>
                  </div>
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div>
                      <h3 className="font-medium text-sm mb-3">Select Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {(featureOptions[projectType] || []).map((feature) => (
                          <Badge
                            key={feature}
                            variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                            className="cursor-pointer py-1.5 px-3"
                            onClick={() => toggleFeature(feature)}
                            data-testid={`badge-feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {selectedFeatures.includes(feature) && (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            )}
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

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
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-1">Your Product Preview</h2>
                    <p className="text-sm text-muted-foreground">
                      Here's an interactive preview of what we'll build for you
                    </p>
                  </div>
                  <div className="max-w-3xl mx-auto">
                    <Card className="p-6" data-testid="card-demo-preview">
                      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">
                            {projectTypes.find((t) => t.id === projectType)?.label} Demo
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {selectedFeatures.slice(0, 3).map((f) => (
                            <Badge key={f} variant="secondary" className="text-xs">
                              {f}
                            </Badge>
                          ))}
                          {selectedFeatures.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{selectedFeatures.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <DemoPreview projectType={projectType} />
                    </Card>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-1">Your Details</h2>
                    <p className="text-sm text-muted-foreground">
                      Tell us about yourself and your project goals
                    </p>
                  </div>
                  <Card className="p-6 max-w-2xl mx-auto" data-testid="card-wizard-details">
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
                                  data-testid="input-wizard-name"
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
                                  data-testid="input-wizard-email"
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
                                data-testid="input-wizard-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                                data-testid="input-wizard-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-2" data-testid="text-wizard-success">
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
                        setStep(0);
                        setSelectedFeatures([]);
                        form.reset();
                        mutation.reset();
                      }}
                      data-testid="button-wizard-restart"
                    >
                      Start New Project
                    </Button>
                    <Button
                      onClick={() => window.location.href = "/"}
                      data-testid="button-wizard-home"
                    >
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  data-testid="button-wizard-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed() || mutation.isPending}
                  data-testid="button-wizard-next"
                >
                  {mutation.isPending ? (
                    "Submitting..."
                  ) : step === 3 ? (
                    <>
                      Submit Project
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
