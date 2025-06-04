
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, User, ArrowLeft } from "lucide-react";
import { useEvents } from "@/contexts/EventContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, deleteEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const event = getEventById(id || "");

  if (!event) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/events");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <Link to="/events" className="flex items-center text-college-secondary hover:text-college-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-college-secondary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-college-secondary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-college-secondary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <User className="h-5 w-5 mr-2 text-college-secondary" />
              <span>{event.organizer}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          {user?.role === "admin" && (
            <div className="flex gap-4 mb-8">
              <Link to={`/admin/events/edit/${event.id}`}>
                <Button variant="outline">Edit Event</Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Event</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the event.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Event Information</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="text-gray-800">{event.date}, {event.time}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="text-gray-800">{event.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Organizer</h3>
                <p className="text-gray-800">{event.organizer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="text-gray-800">{event.category}</p>
              </div>
            </div>
            
            {event.registrationRequired && (
              <div>
                <Button
                  className="w-full bg-college-accent hover:bg-college-accent/90"
                  asChild
                >
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Registration is required for this event
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
