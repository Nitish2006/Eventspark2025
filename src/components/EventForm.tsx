
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Event } from "@/contexts/EventContext";
import FileUpload from "./FileUpload";

// Updated schema to make registrationLink conditionally required
const eventSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  organizer: z.string().min(1, { message: "Organizer is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  category: z.string().min(1, { message: "Category is required" }),
  registrationRequired: z.boolean().default(false),
  registrationLink: z.union([
    z.string().url({ message: "Please enter a valid URL" }),
    z.string().length(0) // Allow empty string when registration not required
  ]).optional(),
}).refine((data) => {
  // If registration is required, then registration link must be provided
  if (data.registrationRequired) {
    return !!data.registrationLink;
  }
  return true;
}, {
  message: "Registration link is required when registration is enabled",
  path: ["registrationLink"]
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<Event>;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  isEditing = false,
  isSubmitting = false 
}) => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      date: defaultValues?.date || "",
      time: defaultValues?.time || "",
      location: defaultValues?.location || "",
      organizer: defaultValues?.organizer || "",
      imageUrl: defaultValues?.imageUrl || "",
      category: defaultValues?.category || "",
      registrationRequired: defaultValues?.registrationRequired || false,
      registrationLink: defaultValues?.registrationLink || "",
    },
  });

  const registrationRequired = form.watch("registrationRequired");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Event Poster</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <FileUpload onUploadComplete={(url) => field.onChange(url)} />
                    {field.value && (
                      <div className="relative w-full max-w-sm">
                        <img
                          src={field.value}
                          alt="Event poster preview"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    <Input
                      placeholder="Or enter image URL manually"
                      {...field}
                      className="mt-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Academic, Sports, Arts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3:00 PM - 5:00 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organizer</FormLabel>
                <FormControl>
                  <Input placeholder="Department or organization name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter event description"
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationRequired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Registration Required</FormLabel>
                  <FormDescription>
                    Check if attendees need to register for this event
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {registrationRequired && (
            <FormField
              control={form.control}
              name="registrationLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/register" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button 
          type="submit" 
          className="bg-college-primary hover:bg-college-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            (isEditing ? "Updating..." : "Creating...") : 
            (isEditing ? "Update Event" : "Create Event")
          }
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
