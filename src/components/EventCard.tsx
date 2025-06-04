
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/contexts/EventContext";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Calculate days until event
  const daysUntil = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const countdown = daysUntil();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#1E3A8A] bg-[#F9FAFB] dark:bg-gray-800 dark:border-gray-700">
      <div className="aspect-video w-full overflow-hidden relative group">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {countdown > 0 && (
          <div className="absolute top-3 right-3 bg-[#F97316] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            {countdown} {countdown === 1 ? 'day' : 'days'} left
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-[#F97316] mb-1">
              {event.category}
            </p>
            <h3 className="text-xl font-bold line-clamp-1 text-[#1E3A8A] dark:text-white">
              {event.title}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-[#4B5563] dark:text-gray-300 gap-2">
            <Calendar className="h-4 w-4 text-[#06B6D4]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-[#4B5563] dark:text-gray-300 gap-2">
            <Clock className="h-4 w-4 text-[#06B6D4]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-[#4B5563] dark:text-gray-300 gap-2">
            <MapPin className="h-4 w-4 text-[#06B6D4]" />
            <span>{event.location}</span>
          </div>
          <p className="text-sm text-[#4B5563] dark:text-gray-300 line-clamp-2 mt-2">
            {event.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Link to={`/events/${event.id}`}>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent text-[#4B5563] border-[#4B5563] hover:text-[#06B6D4] hover:border-[#06B6D4] dark:text-white dark:border-white dark:hover:text-[#06B6D4] dark:hover:border-[#06B6D4]"
          >
            View Details
          </Button>
        </Link>
        {event.registrationRequired && (
          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
            <Button 
              size="sm"
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            >
              Register Now
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
