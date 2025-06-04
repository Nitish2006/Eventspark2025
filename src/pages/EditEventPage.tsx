
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";
import EventForm from "@/components/EventForm";
import { supabase } from "@/integrations/supabase/client";

const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, updateEvent } = useEvents();
  const navigate = useNavigate();
  const [event, setEvent] = useState(getEventById(id || ""));
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error("Error fetching event:", error);
          toast.error("Failed to load event");
          return;
        }
        
        if (data) {
          // Transform database format to component format
          const formattedEvent = {
            id: data.id,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            location: data.location,
            organizer: data.organizer,
            imageUrl: data.image_url,
            category: data.category,
            registrationRequired: data.registration_required,
            registrationLink: data.registration_link
          };
          
          setEvent(formattedEvent);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading event...</h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-6">The event you're trying to edit doesn't exist or has been removed.</p>
        <Link to="/admin/dashboard">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Update the event in Supabase
      const { error } = await supabase
        .from('events')
        .update({
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
          organizer: data.organizer,
          image_url: data.imageUrl,
          category: data.category,
          registration_required: data.registrationRequired,
          registration_link: data.registrationLink
        })
        .eq('id', event.id);

      if (error) {
        console.error("Error updating event:", error);
        toast.error("Failed to update event: " + error.message);
        return;
      }

      // Also update local state for immediate UI update
      updateEvent(event.id, data);
      
      navigate(`/events/${event.id}`);
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Link to="/admin/dashboard" className="flex items-center text-college-secondary hover:text-college-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <p className="text-gray-600">Update the event details below</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <EventForm onSubmit={handleSubmit} defaultValues={event} isEditing={true} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default EditEventPage;
