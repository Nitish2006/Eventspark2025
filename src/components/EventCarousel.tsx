
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/contexts/EventContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventCarouselProps {
  events: Event[];
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Extract unique categories from events
  const categories = ["All", ...Array.from(new Set(events.map(event => event.category)))];
  
  // Filter events by selected category and search term
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
                         event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#4B5563] dark:text-gray-300">No upcoming events found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search events..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-[180px] flex-shrink-0">
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {filteredEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <EventCard event={event} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6">
            <CarouselPrevious 
              className="static bg-[#06B6D4] text-white hover:bg-[#06B6D4]/80 translate-y-0 dark:bg-[#06B6D4] dark:text-white"
            />
            <CarouselNext 
              className="static bg-[#06B6D4] text-white hover:bg-[#06B6D4]/80 translate-y-0 dark:bg-[#06B6D4] dark:text-white"
            />
          </div>
        </Carousel>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No events found for this category.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setActiveCategory("All");
              setSearchTerm("");
            }}
            className="text-[#06B6D4] mt-2"
          >
            View all events
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
