
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  imageUrl: string;
  category: string;
  registrationRequired: boolean;
  registrationLink?: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  loading: boolean;
  refetchEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// ... keep existing code (INITIAL_EVENTS)

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log("Fetching events from Supabase...");
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
        
      if (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to load events");
        return;
      }
      
      if (data) {
        console.log("Events data received:", data);
        // Transform database format to component format
        const formattedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          organizer: event.organizer,
          imageUrl: event.image_url,
          category: event.category,
          registrationRequired: Boolean(event.registration_required), // Ensure boolean type
          registrationLink: event.registration_link || undefined // Convert null to undefined
        }));
        
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load events from Supabase
    fetchEvents();
  }, []);

  const addEvent = async (eventData: Omit<Event, "id">) => {
    // This is now handled in CreateEventPage
    console.log("addEvent called in context, but actual insertion is done in CreateEventPage");
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      // Convert from frontend format to database format
      const dbEventData: any = {};
      
      if (eventData.title) dbEventData.title = eventData.title;
      if (eventData.description) dbEventData.description = eventData.description;
      if (eventData.date) dbEventData.date = eventData.date;
      if (eventData.time) dbEventData.time = eventData.time;
      if (eventData.location) dbEventData.location = eventData.location;
      if (eventData.organizer) dbEventData.organizer = eventData.organizer;
      if (eventData.imageUrl) dbEventData.image_url = eventData.imageUrl;
      if (eventData.category) dbEventData.category = eventData.category;
      if (eventData.registrationRequired !== undefined) dbEventData.registration_required = eventData.registrationRequired;
      if (eventData.registrationLink !== undefined) dbEventData.registration_link = eventData.registrationLink;
      
      const { error } = await supabase
        .from('events')
        .update(dbEventData)
        .eq('id', id);
        
      if (error) {
        console.error("Error updating event:", error);
        toast.error("Failed to update event");
        return;
      }
      
      // Update local state for immediate UI update
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, ...eventData } : event
        )
      );
      
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
        return;
      }
      
      // Update local state for immediate UI update
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const getEventById = (id: string) => {
    return events.find((event) => event.id === id);
  };

  const refetchEvents = async () => {
    console.log("Refetching events...");
    return fetchEvents();
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        loading,
        refetchEvents
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
