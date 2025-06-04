
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEvents } from "@/contexts/EventContext";
import EventForm from "@/components/EventForm";
import { supabase } from "@/integrations/supabase/client";

const CreateEventPage = () => {
  const { refetchEvents } = useEvents();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting event data:", data);
      
      // Format the event data for Supabase
      const eventData = {
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        location: data.location,
        organizer: data.organizer,
        image_url: data.imageUrl,
        category: data.category,
        registration_required: Boolean(data.registrationRequired), // Convert to boolean, false if undefined
        registration_link: data.registrationRequired ? data.registrationLink || null : null // Only include link if registration is required
      };
      
      console.log("Formatted event data for Supabase:", eventData);
      
      // Insert the event into Supabase
      const { data: newEvent, error } = await supabase
        .from('events')
        .insert([eventData])
        .select();

      if (error) {
        console.error("Error inserting event:", error);
        toast.error("Failed to create event: " + error.message);
        return;
      }

      console.log("Event created successfully:", newEvent);
      
      // Refetch events to update the local state
      await refetchEvents();
      
      toast.success("Event created successfully!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error("An unexpected error occurred: " + (error.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-gray-600">Fill out the form below to create a new campus event</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CreateEventPage;
